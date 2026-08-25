import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import ContextMenu from './components/ContextMenu';
import PlaybookView from './components/PlaybookView';
import TipsModal from './components/TipsModal';
import { getProduct } from './data/products';

export default function App() {
  const [menu, setMenu] = useState(null); // { productId, x, y }
  const [view, setView] = useState(null); // { productId, mode: 'info' | 'tips' }

  // Permite abrir direto num produto/modo via URL, ex:
  // ?product=clt&mode=info  ou  ?product=refin&mode=tips
  // Usado para embutir este site (via iframe) em outras telas, como o
  // dashboard das vendedoras, sem precisar clicar de novo na Home.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    const mode = params.get('mode');
    if (productId && (mode === 'info' || mode === 'tips') && getProduct(productId)) {
      setView({ productId, mode });
    }
  }, []);

  function handleProductClick(productId, e) {
    setMenu({ productId, x: e.clientX, y: e.clientY });
  }

  function handleSelect(mode) {
    setView({ productId: menu.productId, mode });
    setMenu(null);
  }

  const activeProduct = view ? getProduct(view.productId) : null;
  const menuProduct = menu ? getProduct(menu.productId) : null;

  return (
    <div className="app-root">
      <Home onProductClick={handleProductClick} />

      <AnimatePresence>
        {menu && <ContextMenu x={menu.x} y={menu.y} product={menuProduct} onSelect={handleSelect} onClose={() => setMenu(null)} />}
      </AnimatePresence>

      <AnimatePresence>
        {view?.mode === 'info' && <PlaybookView product={activeProduct} onClose={() => setView(null)} />}
        {view?.mode === 'tips' && <TipsModal product={activeProduct} onClose={() => setView(null)} />}
      </AnimatePresence>
    </div>
  );
}
