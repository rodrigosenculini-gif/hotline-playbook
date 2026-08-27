import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Navegador visual do fluxo de atendimento — feito do zero em blocos
// conectados (sem usar nenhuma imagem), a partir dos cenários do produto.
export default function FluxogramaModal({ product, onClose }) {
  const [abertoIdx, setAbertoIdx] = useState(null);
  const cenarios = product.playbook.cenarios;

  return (
    <motion.div
      className="playbook-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="fluxograma-sheet"
        style={{ '--accent': product.color, maxWidth: 720, overflowY: 'auto' }}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="playbook-close" onClick={onClose}>✕</button>
        <p className="eyebrow-pb">Fluxograma de atendimento</p>
        <h1>{product.icon} {product.name}</h1>
        <p className="subtitle-pb">Clique em cada etapa pra ver o que fazer</p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 28, gap: 4 }}>
          <div className="fluxo-node fluxo-node-start">Lead chega</div>
          <div className="fluxo-linha" />
          <div className="fluxo-node fluxo-node-start">Qual o cenário?</div>
          <div className="fluxo-linha" />

          <div className="fluxo-grid">
            {cenarios.map((c, i) => {
              const aberto = abertoIdx === i;
              return (
                <div key={i} className="fluxo-branch">
                  <div className="fluxo-conector-topo" />
                  <button
                    type="button"
                    className={`fluxo-node fluxo-node-cenario ${aberto ? 'aberto' : ''}`}
                    onClick={() => setAbertoIdx(aberto ? null : i)}
                  >
                    <span className="fluxo-node-num">{i + 1}</span>
                    {c.title}
                  </button>
                  <AnimatePresence>
                    {aberto && (
                      <motion.div
                        className="fluxo-detalhe"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p>{c.body}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
