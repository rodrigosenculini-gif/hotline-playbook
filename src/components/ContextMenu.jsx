import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ContextMenu({ x, y, product, onSelect, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Mantém o menu dentro da tela
  const style = {
    left: Math.min(x, window.innerWidth - 240),
    top: Math.min(y, window.innerHeight - 140),
    '--accent': product.color,
  };

  return (
    <motion.div
      ref={ref}
      className="context-menu"
      style={style}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.15 }}
    >
      <div className="context-menu-title">{product.icon} {product.name}</div>
      <button className="context-menu-item" onClick={() => onSelect('info')}>
        📘 Informações
        <span>Playbook completo</span>
      </button>
      <button className="context-menu-item" onClick={() => onSelect('tips')}>
        💡 Dicas
        <span>Dicas rápidas de atendimento</span>
      </button>
      {product.fluxogramaInterativo && (
        <button className="context-menu-item" onClick={() => onSelect('fluxo')}>
          🗺️ Fluxograma
          <span>Navegue pelo fluxo de atendimento</span>
        </button>
      )}
    </motion.div>
  );
}
