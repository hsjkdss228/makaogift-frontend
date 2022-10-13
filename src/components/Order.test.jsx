import { fireEvent, render, screen } from '@testing-library/react';

import context from 'jest-plugin-context';
import Order from './Order';

const changeReceiverInput = jest.fn();
const changeAddressInput = jest.fn();
const changeMessageInput = jest.fn();

jest.mock('../hooks/useOrderStore', () => () => ({
  changeReceiverInput,
  changeAddressInput,
  changeMessageInput,
}));

describe('Order', () => {
  function renderOrder({
    product, purchaseCount, purchaseCost,
    receiver, address, messageToSend, errors, onSubmit,
  }) {
    render((
      <Order
        product={product}
        purchaseCount={purchaseCount}
        purchaseCost={purchaseCost}
        receiver={receiver}
        address={address}
        messageToSend={messageToSend}
        errors={errors}
        onSubmit={onSubmit}
      />
    ));
  }

  context('특정 상품의 구매 희망 개수를 전달받은 경우', () => {
    const onSubmit = jest.fn();

    context('에러 메세지가 포함되지 않은 경우', () => {
      const product = {
        id: 1,
        maker: '롯데호텔',
        name: '시그니엘 서울 그랜드 디럭스 스위트 더블 2인 1박2일 숙박권',
        price: 1000000,
        description: '시그니엘 서울의 디럭스 스위트 룸은 일반 객실보다 더욱 넓고 쾌적한 공간을 제공하는 객실입니다.',
      };
      const purchaseCount = 2;
      const purchaseCost = product.price * purchaseCount;
      const receiver = '부모님';
      const address = '충남 금산군 금산읍 중도리 24 고려당한약원약업사';
      const messageToSend = '꼭 성공해서 모시고 싶습니다.';
      const errors = {};

      it('주어진 데이터에 맞는 선물하기 컴포넌트 구성요소들을 화면에 출력', () => {
        renderOrder({
          product,
          purchaseCount,
          purchaseCost,
          receiver,
          address,
          messageToSend,
          errors,
          onSubmit,
        });

        screen.getByText(/롯데호텔/);
        screen.getByText(/시그니엘 서울 그랜드 디럭스 스위트 더블 2인 1박2일 숙박권/);
        screen.getByText(/구매수량: 2/);
        screen.getByText(/총 상품금액: 2,000,000원/);

        expect(screen.getAllByText('*').length).toBe(2);
        screen.getByText(/받는 분 성함/);
        expect(screen.getByLabelText('받는 분 성함*').value).toBe('부모님');
        screen.getByText(/3-7자까지 한글만 사용 가능/);

        screen.getByText(/받는 분 주소/);
        expect(screen.getByLabelText('받는 분 주소*').value).toContain('고려당한약원약업사');

        screen.getByText(/받는 분께 보내는 메세지/);
        expect(screen.getByLabelText('받는 분께 보내는 메세지').value)
          .toContain('성공해서 모시고 싶습니다');
        screen.getByText(/100글자 이내로 입력해주세요/);

        screen.getByRole('button', { name: '선물하기' });
      });

      context('입력 필드를 수정하는 경우', () => {
        it('입력 필드 수정 핸들러 함수 호출', () => {
          renderOrder({
            product,
            purchaseCount,
            purchaseCost,
            receiver,
            address,
            messageToSend,
            errors,
            onSubmit,
          });

          fireEvent.change(screen.getByLabelText('받는 분 성함*'), {
            target: { value: '사랑하는 부모님' },
          });
          fireEvent.change(screen.getByLabelText('받는 분 주소*'), {
            target: { value: '충남 금산군 금산읍 상옥1길' },
          });
          fireEvent.change(screen.getByLabelText('받는 분께 보내는 메세지'), {
            target: { value: `${messageToSend} 사랑합니다.` },
          });
          expect(changeReceiverInput).toBeCalled();
          expect(changeAddressInput).toBeCalled();
          expect(changeMessageInput).toBeCalled();
        });
      });

      context('선물하기 버튼을 누르는 경우', () => {
        it('선물하기를 수행하는 이벤트 핸들러 함수 호출', () => {
          renderOrder({
            product,
            purchaseCount,
            purchaseCost,
            receiver,
            address,
            messageToSend,
            errors,
            onSubmit,
          });

          fireEvent.click(screen.getByRole('button', { name: '선물하기' }));
          expect(onSubmit).toBeCalled();
        });
      });
    });

    context('에러 메세지가 포함된 경우', () => {
      const product = {
        id: 1,
        maker: 'Universal Studio JAPAN',
        name: 'Universal Express Pass Premium + Studio Pass Package Set',
        price: 225000,
        description: '인기 어트랙션의 대기시간을 단축! 가장 효율적으로 파크를 전부 즐기자!',
      };
      const purchaseCount = 3;
      const purchaseCost = product.price * purchaseCount;
      const receiver = '일본여행가고싶다일본여행!!';
      const address = '';
      const messageToSend = '';
      const errors = {
        3001: '주소를 입력해주세요',
        3002: '3-7자까지 한글만 사용 가능합니다',
      };

      it('컴포넌트 구성요소들 중 안내 메세지를 에러 메세지로 대체해 화면에 출력', () => {
        renderOrder({
          product,
          purchaseCount,
          purchaseCost,
          receiver,
          address,
          messageToSend,
          errors,
          onSubmit,
        });

        screen.getByText(/3-7자까지 한글만 사용 가능합니다/);
        screen.getByText(/주소를 입력해주세요/);
        expect(screen.queryByText('3-7자까지 한글만 사용 가능')).toBeNull();
      });
    });
  });
});
