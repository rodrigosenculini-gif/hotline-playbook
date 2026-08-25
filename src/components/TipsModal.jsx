import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TipsModal({ product, onClose }) {
  const [openTip, setOpenTip] = useState(null);

  return (
    <motion.div
      className="tips-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className="tips-sheet"
        style={{ '--accent': product.color }}
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <button className="playbook-close" onClick={onClose}>✕</button>
        <div className="tips-header">
          <span className="tips-icon">{product.icon}</span>
          <div>
            <div className="tips-eyebrow">DICAS DE ATENDIMENTO</div>
            <h2>{product.name}</h2>
          </div>
        </div>

        <div className="tips-grid">
          {product.tips.map((tip, i) => (
            <motion.button
              key={i}
              className="tip-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              onClick={() => setOpenTip(i)}
            >
              <span className="tip-num">{i + 1}</span>
              <span className="tip-title">{tip.title}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {openTip !== null && (
          <motion.div
            className="tip-popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setOpenTip(null)}
          >
            <motion.div
              className="tip-popup"
              style={{ '--accent': product.color }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.22 }}
            >
              <div className="tip-popup-num">{openTip + 1}</div>
              <h3>{product.tips[openTip].title}</h3>
              <p>{product.tips[openTip].body}</p>
              <button className="block-next" onClick={() => setOpenTip(null)}>Entendi →</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
