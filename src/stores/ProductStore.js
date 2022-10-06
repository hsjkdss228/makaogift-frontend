import Store from './Store';

import { apiService } from '../services/ApiService';
import { pagingService } from '../services/PagingService';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.products = [];
    this.pagesCount = 0;

    this.product = {};
    this.selectedCount = 1;
    this.totalCost = 0;
    this.canBuy = true;
  }

  async fetchProducts(page) {
    const { products, pageSize, totalProductsSize } = await apiService.fetchProducts(page);
    this.products = products;
    this.pagesCount = pagingService.calculatePageCount({
      pageSize, totalProductsSize,
    });
    this.publish();
  }

  async fetchProduct(id) {
    this.product = await apiService.fetchProduct(id);
    this.resetCountAndCost();
    this.publish();
  }

  resetCountAndCost() {
    this.selectedCount = 1;
    this.totalCost = this.product.price;
    this.canBuy = true;
  }

  addCountAndTotalCost() {
    this.selectedCount += 1;
    this.totalCost += this.product.price;
    this.canBuy = true;
    this.publish();
  }

  reduceCountAndTotalCost() {
    if (this.selectedCount === 1) {
      return;
    }
    this.selectedCount -= 1;
    this.totalCost -= this.product.price;
    this.canBuy = true;
    this.publish();
  }

  discontinuePurchase() {
    this.canBuy = false;
    this.publish();
  }
}

export const productStore = new ProductStore();
