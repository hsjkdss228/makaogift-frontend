/* eslint-disable class-methods-use-this */

export default class PagingService {
  calculatePageCount({ pageSize, totalProductsSize }) {
    return Math.ceil(totalProductsSize / pageSize);
  }
}

export const pagingService = new PagingService();
