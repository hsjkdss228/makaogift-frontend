import context from 'jest-plugin-context';

import OrderStore from './OrderStore';

describe('OrderStore', () => {
  const orderStore = new OrderStore();

  orderStore.initialize({
    product: {
      id: 1,
      maker: '한화이글스',
      name: '한화이글스 2023년 홈경기 시즌권',
      price: 500000,
      description: '국내 최강의 야구팀 한화이글스의 경기를 자유롭게 관람하세요!',
    },
    purchaseCount: 3,
    purchaseCost: 1500000,
  });

  context('상태를 초기화할 경우 (주문 페이지로 이동)', () => {
    it('정상적으로 상태가 초기화됨', () => {
      expect(orderStore.product.name).toBe('한화이글스 2023년 홈경기 시즌권');
      expect(orderStore.purchaseCount).toBe(3);
      expect(orderStore.purchaseCost).toBe(1500000);
    });
  });

  context('입력 필드의 내용을 수정할 경우', () => {
    it('입력 필드 상태를 정상적으로 수정하고 publish를 수행', () => {
      const spyPublish = jest.spyOn(orderStore, 'publish');

      orderStore.changeReceiverInput('치코리타');
      orderStore.changeAddressInput('연두마을 공박사 연구소');
      orderStore.changeMessageInput('너, 우리의 동료가 되라!');

      expect(orderStore.receiver).toBe('치코리타');
      expect(orderStore.address).toBe('연두마을 공박사 연구소');
      expect(orderStore.messageToSend).toBe('너, 우리의 동료가 되라!');
      expect(spyPublish).toBeCalled();
    });
  });

  context('백엔드 서버에 주문 내용 POST 요청 시', () => {
    context('정상적으로 입력 후 요청 시', () => {
      it('주문 내역을 생성해 주문 내역의 id를 반환', async () => {
        const orderId = await orderStore.order();

        expect(orderId).toBeTruthy();
        expect(orderStore.errorCodesAndMessages).toStrictEqual({});
      });
    });

    context('받는 분께 보내는 메세지를 입력하지 않고 요청 시에도', () => {
      it('주문 내역을 생성해 주문 내역의 id를 반환', async () => {
        orderStore.changeMessageInput('');

        const orderId = await orderStore.order();

        expect(orderId).toBeTruthy();
        expect(orderStore.errorCodesAndMessages).toStrictEqual({});
      });
    });

    context('받는 분 이름을 입력하지 않고 요청할 경우', () => {
      it('에러 코드와 메세지를 반환', async () => {
        orderStore.changeReceiverInput('');

        const orderId = await orderStore.order();

        expect(orderId).toBeFalsy();
        expect(orderStore.errorCodesAndMessages).toStrictEqual({
          1001: '성함을 입력해주세요',
        });
      });
    });

    context('받는 분 주소를 입력하지 않고 요청할 경우', () => {
      it('에러 코드와 메세지를 반환', async () => {
        orderStore.changeReceiverInput('치코리타');
        orderStore.changeAddressInput('');

        const orderId = await orderStore.order();

        expect(orderId).toBeFalsy();
        expect(orderStore.errorCodesAndMessages).toStrictEqual({
          1002: '주소를 입력해주세요',
        });
      });
    });

    context('받는 분 이름, 주소를 둘 다 입력하지 않고 요청할 경우', () => {
      it('에러 코드와 메세지를 반환', async () => {
        orderStore.changeReceiverInput('');
        orderStore.changeAddressInput('');

        const orderId = await orderStore.order();

        expect(orderId).toBeFalsy();
        expect(orderStore.errorCodesAndMessages).toStrictEqual({
          1001: '성함을 입력해주세요',
          1002: '주소를 입력해주세요',
        });
      });
    });

    context('받는 분 이름에 잘못된 입력을 주는 경우', () => {
      context('2자 이하', () => {
        it('올바른 이름을 입력해달라는 에러 코드와 메세지를 반환', async () => {
          orderStore.changeReceiverInput('치코');
          orderStore.changeAddressInput('연두마을 공박사 연구소');

          const orderId = await orderStore.order();

          expect(orderId).toBeFalsy();
          expect(orderStore.errorCodesAndMessages).toStrictEqual({
            1003: '3~7자까지 한글만 사용해주세요',
          });
        });
      });

      context('8자 이상', () => {
        it('올바른 이름을 입력해달라는 에러 코드와 메세지를 반환', async () => {
          orderStore.changeReceiverInput('치코리타치코리타치코리타');

          const orderId = await orderStore.order();

          expect(orderId).toBeFalsy();
          expect(orderStore.errorCodesAndMessages).toStrictEqual({
            1003: '3~7자까지 한글만 사용해주세요',
          });
        });
      });

      context('허용되지 않는 문자 포함', () => {
        it('올바른 이름을 입력해달라는 에러 코드와 메세지를 반환', async () => {
          orderStore.changeReceiverInput('치코12리타');

          const orderId = await orderStore.order();

          expect(orderId).toBeFalsy();
          expect(orderStore.errorCodesAndMessages).toStrictEqual({
            1003: '3~7자까지 한글만 사용해주세요',
          });
        });
      });
    });
  });
});
