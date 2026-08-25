import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';

export default function Home({ onProductClick }) {
  return (
    <div className="home">
      <header className="home-header">
        <div className="home-eyebrow">HOTLINE · PLAYBOOKS DE VENDA</div>
        <h1>Escolha um produto</h1>
        <p>Clique em um card para ver o playbook completo ou dicas rápidas de atendimento.</p>
      </header>

      <div className="product-grid">
        {PRODUCTS.map((p, i) => (
          <motion.button
            key={p.id}
            className="product-card"
            style={{ '--accent': p.color }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => onProductClick(p.id, e)}
          >
            <span className="product-icon">{p.icon}</span>
            <span className="product-name">{p.name}</span>
            <span className="product-tagline">{p.tagline}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
