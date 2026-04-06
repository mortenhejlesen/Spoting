import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, onClose, title, children, fullScreen = false }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Sheet / Modal panel */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 bg-bg-elevated rounded-t-2xl ${
              fullScreen ? 'inset-0 rounded-none' : 'bottom-0 left-0 right-0 max-h-[90vh]'
            } overflow-y-auto`}
            style={{ maxWidth: '480px', margin: '0 auto' }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-bg-elevated flex items-center justify-between px-4 py-4 border-b border-white/5">
              {title && (
                <h2 className="text-lg font-bold text-text-primary">{title}</h2>
              )}
              <button
                onClick={onClose}
                className="ml-auto p-1 text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
