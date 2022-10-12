import context from 'jest-plugin-context';

import ProductStore from './ProductStore';

jest.mock('../services/PagingService', () => ({
  pagingService: {
    calculatePageCount: ({ pageSize, totalPageSize }) => {
      if (pageSize === 1 && totalPageSize === 3) {
        return 1;
      }

      if (pageSize === 8 && totalPageSize === 64) {
        return 8;
      }

      return 0;
    },
  },
}));

describe('상품 목록 조회', () => {
  const productStore = new ProductStore();

  context('한번에 8개의 상품을 출력하고, 총 상품 개수가 3개인 상태에서 1번째 페이지를 확인하는 경우', () => {
    it('3개의 상품을 출력', async () => {
      await productStore.fetchProducts(1);
      productStore.setCurrentPage(1);

      expect(productStore.products.length).toBe(3);
      expect(productStore.products[0].name).toBe('객체지향의 사실과 오해');
      expect(productStore.products[1].name).toBe('The Pragmatic Programmer');
      expect(productStore.products[2].name).toBe('Test-Driven Development');
      expect(productStore.pagesCount).toBe(1);
      expect(productStore.currentPage).toBe(1);
    });
  });

  context('한번에 8개의 상품을 출력하고, 총 상품 개수가 64개인 상태에서 5번째 페이지를 확인하는 경우', () => {
    it('8개의 상품을 출력', async () => {
      await productStore.fetchProducts(5);
      productStore.setCurrentPage(5);

      expect(productStore.products.length).toBe(8);
      expect(productStore.products[0].maker).toBe('제조사명 33');
      expect(productStore.products[1].maker).toBe('제조사명 34');
      expect(productStore.products[2].maker).toBe('제조사명 35');
      expect(productStore.products[3].maker).toBe('제조사명 36');
      expect(productStore.products[4].maker).toBe('제조사명 37');
      expect(productStore.products[5].maker).toBe('제조사명 38');
      expect(productStore.products[6].maker).toBe('제조사명 39');
      expect(productStore.products[7].maker).toBe('제조사명 40');
      expect(productStore.pagesCount).toBe(8);
      expect(productStore.currentPage).toBe(5);
    });
  });
});

describe('상품 상세 목록 조회', () => {
  const productStore = new ProductStore();

  context('특정 id에 해당하는 상품을 불러올 경우', () => {
    const mockResetCountAndCost = jest.spyOn(productStore, 'resetCountAndCost');

    it('product 상태에 데이터를 저장', async () => {
      await productStore.fetchProduct(1);

      expect(mockResetCountAndCost).toBeCalled();
      expect(productStore.product.id).toBe(1);
      expect(productStore.product.maker).toBe('TREK');
      expect(productStore.product.name).toBe('DOMANE AL 3');
      expect(productStore.product.price).toBe(1490000);
      expect(productStore.product.description).toBe('최고의 인듀어런스 자전거');
    });
  });

  context('상품의 구매 희망 개수를 조정하는 경우', () => {
    context('상품의 구매 희망 개수를 증가시키는 경우', () => {
      it('상품의 구매 희망 개수 및 총 가격 증가', async () => {
        await productStore.fetchProduct(1);

        expect(productStore.selectedCount).toBe(1);
        expect(productStore.totalCost).toBe(1490000);

        productStore.addCountAndTotalCost();
        expect(productStore.selectedCount).toBe(2);
        expect(productStore.totalCost).toBe(2980000);
      });
    });

    context('상품의 구매 희망 개수를 감소시키는 경우', () => {
      it('상품의 구매 희망 개수 및 총 가격 감소', async () => {
        await productStore.fetchProduct(1);

        productStore.selectedCount = 2;
        productStore.totalCost = productStore.product.price * productStore.selectedCount;

        productStore.reduceCountAndTotalCost();
        expect(productStore.selectedCount).toBe(1);
        expect(productStore.totalCost).toBe(1490000);
      });
    });

    context('상품 구매 불가 메세지 출력 상태 활성화 함수가 호출되는 경우', () => {
      it('상품 구매 불가 메세지 출력 상태 변경', async () => {
        await productStore.fetchProduct(1);
        expect(productStore.canBuy).toBeTruthy();
        productStore.discontinuePurchase();
        expect(productStore.canBuy).toBeFalsy();
      });
    });
  });
});
