import { apiService } from '../services/ApiService';

export default class ProductStore {
  constructor() {
    this.products = [];
    this.product = {};

    this.selectedCount = 1;
    this.totalCost = 0;

    this.listeners = new Set();
  }

  async fetchProducts() {
    this.products = await apiService.fetchProducts();
    this.publish();
  }

  async fetchProduct(id) {
    this.product = await apiService.fetchProduct(id);
    this.totalCount = 1;
    this.totalCost = this.product.price;
    this.publish();
  }

  resetCountAndCost() {
    this.selectedCount = 1;
    this.totalCost = this.product.price;
  }

  addCountAndTotalCost() {
    this.selectedCount += 1;
    this.totalCost += this.product.price;
    this.publish();
  }

  reduceCountAndTotalCost() {
    if (this.selectedCount === 1) {
      return;
    }
    this.selectedCount -= 1;
    this.totalCost -= this.product.price;
    this.publish();
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  unsubscribe(listener) {
    this.listeners.delete(listener);
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }
}

export const productStore = new ProductStore();
