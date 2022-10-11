import { Route, Routes } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import { useEffect } from 'react';

import { apiService } from './services/ApiService';

import Header from './components/Header';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';

import useUserStore from './hooks/useUserStore';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const userStore = useUserStore();

  const fetchUserAmount = async () => {
    await userStore.fetchUserAmount();
  };

  useEffect(() => {
    apiService.setAccessToken(accessToken);
    if (accessToken) {
      fetchUserAmount();
    }
  }, [accessToken]);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
      </Routes>
    </div>
  );
}
