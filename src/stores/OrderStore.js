import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.product = {};
    this.selectedCount = 1;
    this.totalCost = 0;
    this.recipient = '';
    this.address = '';
    this.messageToSend = '';
  }

  initialize({ product, selectedCount, totalCost }) {
    this.product = product;
    this.selectedCount = selectedCount;
    this.totalCost = totalCost;
    this.publish();
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
