/* eslint-disable class-methods-use-this */

export default class PagingService {
  calculatePageCount({ pageSize, totalPageSize }) {
    return Math.ceil(totalPageSize / pageSize);
  }
}

export const pagingService = new PagingService();
