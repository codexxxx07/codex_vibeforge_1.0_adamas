import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Portals are self-contained dashboards with their own internal scroll
// containers, so the viewport-driven fade effect stays off of them.
const PORTAL_ROUTES = [
  "/student",
  "/mentor",
  "/admin",
  "/student-portal",
  "/mentor-portal",
  "/admin-panel",
];

// Blocks that receive the fade. They are picked up by structure only, so no
// component JSX needs to change. `:has()` excludes page wrappers that only
// group glass-cards, which keeps cards from being double-faded with their row.
const TARGET_SELECTORS = [
  "section.min-h-screen .relative.z-10.max-w-4xl.mx-auto > *",
  'section[id="features"] > .max-w-6xl.mx-auto > .text-center',
  'section[id="portals"] > .max-w-6xl.mx-auto > .text-center',
  ".glass-card",
  ".stats-row",
  "footer .max-w-6xl.mx-auto",
  "main .max-w-4xl.mx-auto > :not(:has(.glass-card))",
];

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_QUERY = "(max-width: 767px)";

// Scroll-driven fades must react to scroll every frame, so opacity and the
// `translate` property are excluded from CSS transitions. Everything else
// keeps its original (hover) transitions.
const TRANSITION_OVERRIDE =
  "all 0.3s ease, opacity 0s linear, translate 0s linear";

// How far from the viewport edges the fade completes, as a fraction of the
// viewport height. Mobile uses shorter bands and a smaller drift.
const FADE_IN_FRACTION = 0.25;
const FADE_OUT_FRACTION = 0.15;
const FADE_IN_FRACTION_MOBILE = 0.22;
const FADE_OUT_FRACTION_MOBILE = 0.12;
const DRIFT_PX = 20;
const DRIFT_PX_MOBILE = 10;

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const smoothstep = (value) => value * value * (3 - 2 * value);

// Reads a scroll-constant position for every collected block and, each frame,
// derives opacity + a tiny vertical drift from where the block sits inside the
// viewport. Reversing the scroll simply recomputes from the current position,
// so the fade is fully reversible. Cleanup resets every touched style.
function initFade(isDisposed) {
  const targets = [];
  const offsets = new WeakMap(); // last applied translateY per element
  const applied = new WeakMap(); // last applied [opacity, translate]
  const mobileQuery = window.matchMedia(MOBILE_QUERY);
  let mobile = mobileQuery.matches;
  let rafId = null;
  let resizeTimer = null;

  const resetEl = (el) => {
    offsets.delete(el);
    applied.delete(el);
    el.style.opacity = "";
    el.style.translate = "";
    el.style.transition = "";
  };

  const recalc = () => {
    for (const target of targets) {
      const rect = target.el.getBoundingClientRect();
      const offset = offsets.get(target.el) || 0;
      target.top = rect.top + window.scrollY - offset;
      target.height = rect.height;
    }
  };

  const collect = () => {
    targets.forEach((target) => resetEl(target.el));
    targets.length = 0;
    const seen = new Set();
    for (const selector of TARGET_SELECTORS) {
      let elements;
      try {
        elements = document.querySelectorAll(selector);
      } catch {
        continue; // selector not supported here; skip it, keep the rest
      }
      elements.forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        el.style.transition = TRANSITION_OVERRIDE;
        targets.push({ el, top: 0, height: 0 });
      });
    }
    recalc();
  };

  const apply = () => {
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight || 800;
    const docHeight =
      document.documentElement.scrollHeight ||
      document.body.scrollHeight ||
      viewportHeight;
    const maxScroll = Math.max(0, docHeight - viewportHeight);
    const scrollY = window.scrollY || window.pageYOffset || 0;

    const fadeInSpan =
      viewportHeight * (mobile ? FADE_IN_FRACTION_MOBILE : FADE_IN_FRACTION);
    const fadeOutSpan =
      viewportHeight * (mobile ? FADE_OUT_FRACTION_MOBILE : FADE_OUT_FRACTION);
    const driftMax = mobile ? DRIFT_PX_MOBILE : DRIFT_PX;
    const halfViewport = viewportHeight / 2;

    for (const target of targets) {
      const center = target.top - scrollY + target.height / 2;

      // Fade in as the block enters from the bottom. If the block can never
      // reach the "settled" zone (it sits in the final screenful), it is fully
      // visible once the user reaches the bottom of the page.
      const centerAtMaxScroll = target.top + target.height / 2 - maxScroll;
      const settlePoint = Math.max(
        viewportHeight - fadeInSpan,
        centerAtMaxScroll
      );
      const fadeInDenominator = viewportHeight - settlePoint;
      const fadeIn =
        fadeInDenominator > 1
          ? (viewportHeight - center) / fadeInDenominator
          : center <= viewportHeight
            ? 1
            : 0;

      // Fade out as the block leaves through the top. Blocks that start inside
      // the fade band (near the top on page load) stay fully visible.
      const centerAtScrollZero = target.top + target.height / 2;
      const fadeOutDenominator = Math.min(fadeOutSpan, centerAtScrollZero);
      const fadeOut = fadeOutDenominator > 1 ? center / fadeOutDenominator : 1;

      let opacity = clamp01(Math.min(fadeIn, fadeOut));
      opacity = smoothstep(opacity);

      const driftDirection = center >= halfViewport ? 1 : -1;
      const drift = driftDirection * (1 - opacity) * driftMax;

      const wantOpacity =
        opacity >= 0.999
          ? ""
          : opacity <= 0.001
            ? "0"
            : String(Math.round(opacity * 1000) / 1000);
      const wantTranslate =
        Math.abs(drift) < 0.01
          ? ""
          : `0 ${String(Math.round(drift * 100) / 100)}px`;

      const previous = applied.get(target.el);
      if (
        !previous ||
        previous[0] !== wantOpacity ||
        previous[1] !== wantTranslate
      ) {
        target.el.style.opacity = wantOpacity;
        target.el.style.translate = wantTranslate;
        applied.set(target.el, [wantOpacity, wantTranslate]);
      }
      offsets.set(target.el, Math.abs(drift) < 0.01 ? 0 : drift);
    }
  };

  const loop = () => {
    apply();
    rafId = requestAnimationFrame(loop);
  };

  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      mobile = mobileQuery.matches;
      recalc();
    }, 150);
  };

  const onLoad = () => recalc();

  collect();
  apply();
  rafId = requestAnimationFrame(loop);

  window.addEventListener("resize", onResize);
  window.addEventListener("load", onLoad);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready
      .then(() => {
        if (!isDisposed()) recalc();
      })
      .catch(() => {});
  }

  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    clearTimeout(resizeTimer);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("load", onLoad);
    targets.forEach((target) => resetEl(target.el));
  };
}

export default function ScrollFade({ children }) {
  const { pathname } = useLocation();
  const disposedRef = useRef(false);

  useLayoutEffect(() => {
    if (PORTAL_ROUTES.includes(pathname)) return undefined;

    disposedRef.current = false;
    const motionQuery = window.matchMedia(MOTION_QUERY);
    let teardown = null;

    const stop = () => {
      if (teardown) {
        teardown();
        teardown = null;
      }
    };

    const start = () => {
      if (disposedRef.current || motionQuery.matches) return;
      stop();
      teardown = initFade(() => disposedRef.current);
    };

    const onMotionChange = (event) => {
      if (event.matches) stop();
      else start();
    };

    if (!motionQuery.matches) start();
    motionQuery.addEventListener?.("change", onMotionChange);

    return () => {
      disposedRef.current = true;
      motionQuery.removeEventListener?.("change", onMotionChange);
      stop();
    };
  }, [pathname]);

  return children;
}
