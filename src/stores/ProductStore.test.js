import context from 'jest-plugin-context';

import ProductStore from './ProductStore';

jest.mock('../services/PagingService', () => ({
  pagingService: {
    calculatePageCount: ({ pageSize, totalProductsSize }) => {
      if (pageSize === 1 && totalProductsSize === 3) {
        return 1;
      }

      if (pageSize === 8 && totalProductsSize === 64) {
        return 8;
      }

      return 0;
    },
  },
}));

context('상품 목록 조회', () => {
  it('총 상품 개수 3개, 한 페이지에 8개의 상품 출력, 1번째 페이지 확인', async () => {
    const productStore = new ProductStore();

    await productStore.fetchProducts(1);

    expect(productStore.products.length).toBe(3);
    expect(productStore.products[0].name).toBe('객체지향의 사실과 오해');
    expect(productStore.products[1].name).toBe('The Pragmatic Programmer');
    expect(productStore.products[2].name).toBe('Test-Driven Development');
    expect(productStore.pagesCount).toBe(1);
  });

  it('총 상품 개수 64개, 한 페이지에 8개의 상품 출력, 8번째 페이지 확인', async () => {
    const productStore = new ProductStore();

    await productStore.fetchProducts(8);

    expect(productStore.products.length).toBe(8);
    expect(productStore.products[0].maker).toBe('제조사명 57');
    expect(productStore.products[1].maker).toBe('제조사명 58');
    expect(productStore.products[2].maker).toBe('제조사명 59');
    expect(productStore.products[3].maker).toBe('제조사명 60');
    expect(productStore.products[4].maker).toBe('제조사명 61');
    expect(productStore.products[5].maker).toBe('제조사명 62');
    expect(productStore.products[6].maker).toBe('제조사명 63');
    expect(productStore.products[7].maker).toBe('제조사명 64');
    expect(productStore.pagesCount).toBe(8);
  });
});

context('상품 상세 목록 조회', () => {
  it('특정 id에 해당하는 상품을 불러와 product에 저장', async () => {
    const productStore = new ProductStore();

    await productStore.fetchProduct(1);

    expect(productStore.product.id).toBe(1);
    expect(productStore.product.maker).toBe('TREK');
    expect(productStore.product.name).toBe('DOMANE AL 3');
    expect(productStore.product.price).toBe(1490000);
    expect(productStore.product.description).toBe('최고의 인듀어런스 자전거');
  });

  it('상품의 구매 희망 개수 및 가격 조정', async () => {
    const productStore = new ProductStore();

    await productStore.fetchProduct(1);

    expect(productStore.selectedCount).toBe(1);
    expect(productStore.totalCost).toBe(1490000);

    productStore.addCountAndTotalCost();
    expect(productStore.selectedCount).toBe(2);
    expect(productStore.totalCost).toBe(2980000);

    productStore.addCountAndTotalCost();
    productStore.addCountAndTotalCost();
    productStore.addCountAndTotalCost();
    expect(productStore.selectedCount).toBe(5);
    expect(productStore.totalCost).toBe(7450000);

    productStore.reduceCountAndTotalCost();
    productStore.reduceCountAndTotalCost();
    productStore.reduceCountAndTotalCost();
    productStore.reduceCountAndTotalCost();
    expect(productStore.selectedCount).toBe(1);
    expect(productStore.totalCost).toBe(1490000);

    productStore.addCountAndTotalCost();
    productStore.addCountAndTotalCost();
    productStore.resetCountAndCost();
    expect(productStore.selectedCount).toBe(1);
    expect(productStore.totalCost).toBe(1490000);
  });
});
