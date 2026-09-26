import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const RESUME_PATH = '/resume/shreya-golatkar-resume.pdf';

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.documentElement.classList.add('splash-lock');
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.documentElement.classList.remove('splash-lock');
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="resume-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
        >
          <motion.div
            className="resume-panel"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="resume-panel-head">
              <span className="eyebrow">Resume</span>
              <div className="resume-panel-actions">
                <a className="arrow-link" href={RESUME_PATH} download data-testid="link-resume-download">Download</a>
                <button className="resume-close" onClick={onClose} aria-label="Close resume preview" data-testid="button-resume-close">×</button>
              </div>
            </div>
            <iframe
              src={RESUME_PATH}
              title="Shreya Golatkar's resume"
              className="resume-frame"
              data-testid="frame-resume"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}