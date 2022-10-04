const context = describe;

// jest.mock('../services/ApiService', () => ({
//   apiService: {
//     fetchProducts: mockFetehProducts,
//   },
// }));

// describe('ProductStore', () => {
//   context('상품 목록 조회', () => {
//     it('상품이 존재하지 않는 경우', () => {
//       jest.mock('../services/ApiService', async () => ({
//         apiService: {
//           async fetchProducts() {
//             return [];
//           },
//         },
//       }));

//       const shopStore = new ProductStore();

//       shopStore.fetchProducts();

//       expect(shopStore.products).toStrictEqual([]);
//     });
//   });

context('상품 목록 조회', () => {
  it('상품이 8개 이하로 존재하는 경우', async () => {
    // jest.mock('../services/ApiService', () => ({
    //   apiService: {
    //     async fetchProducts() {
    //       return [
    //         { maker: '제조사 1', name: '상품 옵션명 1', price: 100 },
    //         { maker: '제조사 2', name: '상품 옵션명 2', price: 200 },
    //         { maker: '제조사 3', name: '상품 옵션명 3', price: 300 },
    //       ];
    //     },
    //   },
    // }));

    // const shopStore = new ProductStore();

    // await shopStore.fetchProducts();

    // expect(mockFetehProducts).toBeCalled();

    // expect(fetchedProducts[0].maker).toBe('제조사 1');
    // expect(fetchedProducts[0].name).toBe('상품 옵션명 1');
    // expect(fetchedProducts[0].price).toBe(100);
  });
});

// context('상품 목록 조회', () => {
//   it('상품이 9개 이상 존재하는 경우', () => {
//     const shopStore = new ProductStore();

//     shopStore.fetchProducts();

//     expect(shopStore.products[0].maker).toBe('제조사 1');
//     expect(shopStore.products[0].name).toBe('상품 옵션명 1');
//     expect(shopStore.products[0].price).toBe(100);
//   });
// });
// });
