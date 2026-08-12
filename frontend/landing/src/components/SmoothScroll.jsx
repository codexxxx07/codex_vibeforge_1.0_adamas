import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

const ANCHOR_OFFSET = -88;

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const isFirstMount = useRef(true);
  const { pathname } = useLocation();

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis = null;
    let rafId = null;

    const start = () => {
      if (lenis || reducedMotionQuery.matches) return;
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
        respectReducedMotion: true,
      });
      lenisRef.current = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const stop = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      lenisRef.current = null;
    };

    const onAnchorClick = (event) => {
      const lenisInstance = lenisRef.current;
      if (!lenisInstance) return;
      const anchor = event.target.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      if (href === "#") {
        event.preventDefault();
        lenisInstance.scrollTo(0);
        return;
      }
      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!target) return;
      event.preventDefault();
      lenisInstance.scrollTo(target, { offset: ANCHOR_OFFSET });
    };

    const onReducedMotionChange = (event) => {
      stop();
      if (!event.matches) start();
    };

    start();
    window.addEventListener("click", onAnchorClick);
    reducedMotionQuery.addEventListener?.("change", onReducedMotionChange);

    return () => {
      window.removeEventListener("click", onAnchorClick);
      reducedMotionQuery.removeEventListener?.("change", onReducedMotionChange);
      stop();
    };
  }, []);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      const hash = window.location.hash;
      if (hash && hash.length > 1 && lenisRef.current) {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          lenisRef.current.scrollTo(target, { offset: ANCHOR_OFFSET });
          return;
        }
      }
    }
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return children;
}
