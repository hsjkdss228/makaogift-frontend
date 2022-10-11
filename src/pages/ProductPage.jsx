import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useLocalStorage } from 'usehooks-ts';

import useProductStore from '../hooks/useProductStore';
import useUserStore from '../hooks/useUserStore';

import Product from '../components/Product';

export default function ProductPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const location = useLocation();

  const productId = location.state !== null
    ? location.state.productId
    : Number(location.pathname.split('/')[2]);

  const productStore = useProductStore();

  useEffect(() => {
    productStore.fetchProduct(productId);
    productStore.resetCountAndCost();
  }, []);

  const {
    product, selectedCount, totalCost, canBuy,
  } = productStore;

  const userStore = useUserStore();
  const { amount } = userStore;

  const navigate = useNavigate();

  const handleClickAdd = () => {
    productStore.addCountAndTotalCost();
  };

  const handleClickReduce = () => {
    productStore.reduceCountAndTotalCost();
  };

  const handleClickBuy = () => {
    if (!accessToken) {
      navigate('/login');
    }

    if (amount < totalCost) {
      productStore.discontinuePurchase();
      return;
    }

    if (accessToken) {
      navigate('/order', {
        state: {
          product,
          selectedCount,
          totalCost,
        },
      });
    }
  };

  return (
    <Product
      product={product}
      selectedCount={selectedCount}
      totalCost={totalCost}
      canBuy={canBuy}
      onClickAdd={handleClickAdd}
      onClickReduce={handleClickReduce}
      onClickBuy={handleClickBuy}
    />
  );
}
