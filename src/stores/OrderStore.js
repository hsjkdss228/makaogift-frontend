import Store from './Store';

import { apiService } from '../services/ApiService';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.product = {};
    this.purchaseCount = 1;
    this.purchaseCost = 0;
    this.receiver = '';
    this.address = '';
    this.messageToSend = '';

    this.errorCodesAndMessages = {};
  }

  initialize({ product, purchaseCount, purchaseCost }) {
    this.product = product;
    this.purchaseCount = purchaseCount;
    this.purchaseCost = purchaseCost;
    this.receiver = '';
    this.address = '';
    this.messageToSend = '';
    this.errorCodesAndMessages = {};
    this.publish();
  }

  async order() {
    try {
      const orderId = await apiService.order({
        productId: this.product.id,
        purchaseCount: this.purchaseCount,
        purchaseCost: this.purchaseCost,
        receiver: this.receiver,
        address: this.address,
        messageToSend: this.messageToSend,
      });
      return orderId;
    } catch (error) {
      const { errorCodesAndMessages } = error.response.data;
      this.errorCodesAndMessages = errorCodesAndMessages;
      this.publish();
      return '';
    }
  }

  changeReceiverInput(receiver) {
    this.receiver = receiver;
    this.publish();
  }

  changeAddressInput(address) {
    this.address = address;
    this.publish();
  }

  changeMessageInput(message) {
    this.messageToSend = message;
    this.publish();
  }
}

export const orderStore = new OrderStore();
