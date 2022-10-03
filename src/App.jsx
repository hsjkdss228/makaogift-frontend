import { Route, Routes } from 'react-router-dom';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}
