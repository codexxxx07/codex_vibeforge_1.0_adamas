export default function Modal({ open, onClose, title, message, type = 'info', showConfirm = false, onConfirm, confirmText = 'Confirm', cancelText = 'Cancel' }) {
  if (!open) return null

  const iconPaths = {
    success: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
    error: <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
  }

  const accentColors = {
    success: '#22C55E',
    error: '#EF4444',
    warning: '#F59E0B',
    info: 'var(--color-accent)',
  }

  const handleConfirm = () => {
    if (onConfirm) onConfirm()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)', animation: 'modalBackdropIn 0.2s ease' }} onClick={onClose} />
      <div
        className="relative w-full max-w-md glass-card p-6"
        style={{ animation: 'modalScaleIn 0.25s ease' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-lg transition-opacity hover:opacity-70" style={{ color: 'var(--color-text-muted)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: `color-mix(in srgb, ${accentColors[type]} 12%, transparent)` }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={accentColors[type]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {iconPaths[type]}
            </svg>
          </div>
          <h3 className="font-bold text-lg" style={{ color: 'var(--color-text-primary)' }}>{title}</h3>
        </div>

        <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)', paddingLeft: '52px' }}>{message}</p>

        <div className="flex items-center justify-end gap-2">
          {showConfirm && (
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ background: 'var(--color-accent-light)', color: 'var(--color-text-muted)' }}
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={showConfirm ? handleConfirm : onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ background: accentColors[type] }}
          >
            {showConfirm ? confirmText : 'OK'}
          </button>
        </div>
      </div>
    </div>
  )
}
