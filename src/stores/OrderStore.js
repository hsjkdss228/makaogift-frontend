import Store from './Store';

import { apiService } from '../services/ApiService';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.product = {};
    this.purchaseCount = 1;
    this.purchaseCost = 0;
    this.recipient = '';
    this.address = '';
    this.messageToSend = '';

    this.errorCodesAndMessages = {};
  }

  initialize({ product, purchaseCount, purchaseCost }) {
    this.product = product;
    this.purchaseCount = purchaseCount;
    this.purchaseCost = purchaseCost;
    this.recipient = '';
    this.address = '';
    this.messageToSend = '';
    this.publish();
  }

  async order() {
    try {
      const orderId = await apiService.order({
        productId: this.product.id,
        purchaseCount: this.purchaseCount,
        purchaseCost: this.purchaseCost,
        recipient: this.recipient,
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

  changeRecipientInput(recipient) {
    this.recipient = recipient;
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
