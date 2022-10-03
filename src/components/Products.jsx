import { Link } from 'react-router-dom';

import useShopStore from '../hooks/useShopStore';

export default function Products() {
  const shopStore = useShopStore();

  const { products } = shopStore;

  return (
    <article>
      <section>
        <p>평범한 선물은 주기도 민망하다구요?</p>
        <p>작정하고 준비한</p>
        <p>마카오톡 선물하기 아이템</p>
        <p>마카오톡 선물하기에서만 볼 수 있는 특별템 기획전</p>
      </section>
      {/* TODO: 링크는 Button의 Navigate를 이용하게 할 것임
          추후 Navigate를 이용하는 구조로 바꾸고, 테스트에서도 Navigate를
          실행했는지 검증하게 해야 함
        */}
      <p>인기선물을 한 자리에 모았어요</p>
      <nav>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}`}
                state={{ productId: product.id }}
              >
                <p>{product.maker}</p>
                <p>{product.name}</p>
                <p>
                  {product.price}
                  원
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
