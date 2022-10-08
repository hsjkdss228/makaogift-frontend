import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import useProductStore from '../hooks/useProductStore';

import Products from '../components/Products';

export default function ProductsPage() {
  const navigate = useNavigate();

  const productStore = useProductStore();

  const { products, pagesCount } = productStore;

  useEffect(() => {
    // TODO: 새로고침하면 1페이지로 돌아가는 게 아니라 자신이 있는 페이지를 다시 로드하도록 해야 함
    //  useLocalStorage를 사용해볼 수 있을 것 같다.

    productStore.fetchProducts(1);
  }, []);

  const navigateToProduct = (productId) => {
    navigate(`/products/${productId}`, {
      state: {
        productId,
      },
    });
  };

  const switchPage = (page) => {
    productStore.fetchProducts(page);
  };

  return (
    <Products
      products={products}
      pagesCount={pagesCount}
      onClickProduct={navigateToProduct}
      onClickPage={switchPage}
    />
  );
}
