/* eslint-disable class-methods-use-this */

// TODO: 로직 개선 필요

export default class PagingService {
  calculatePageCount({ pageSize, totalPageSize }) {
    return Math.ceil(totalPageSize / pageSize);
  }
}

export const pagingService = new PagingService();
