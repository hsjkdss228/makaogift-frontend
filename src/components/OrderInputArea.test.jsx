import { fireEvent, render, screen } from '@testing-library/react';
import context from 'jest-plugin-context';
import OrderInputArea from './OrderInputArea';

describe('OrderInputArea', () => {
  function renderOrderInputArea({
    id, label, inputRequired, type, value, onChange, informationMessage,
  }) {
    render((
      <OrderInputArea
        id={id}
        label={label}
        inputRequired={inputRequired}
        type={type}
        value={value}
        onChange={(event) => onChange(event)}
        informationMessage={informationMessage}
      />
    ));
  }

  context('레이블(필수 입력), 입력창, 안내 메세지의 양식에 해당하는 데이터가 주어질 경우', () => {
    const onChange = jest.fn();

    context('입력창 입력이 필수사항인 경우', () => {
      const id = 'input-receiver';
      const label = '받는 분 성함';
      const inputRequired = true;
      const type = 'text';
      const value = '황인우';
      const informationMessage = '3-7자까지 한글만 사용 가능';

      it('주어진 데이터에 맞는 레이블, 입력창, 안내 메세지를 화면에 출력', () => {
        renderOrderInputArea({
          id, label, inputRequired, type, value, onChange, informationMessage,
        });

        screen.getByText(/받는 분 성함/);
        screen.getByText('*');
        expect(screen.getByLabelText('받는 분 성함*').value).toBe('황인우');
        screen.getByText(/3-7자까지 한글만 사용 가능/);
      });

      context('입력창의 내용을 변경할 경우', () => {
        it('입력창 내용 변경 시 호출되는 핸들러 함수 호출', () => {
          renderOrderInputArea({
            id, label, inputRequired, type, value, onChange, informationMessage,
          });

          fireEvent.change(screen.getByLabelText('받는 분 성함*'), {
            target: { value: '황인우님' },
          });
          expect(onChange).toBeCalled();
        });
      });
    });

    context('입력창 입력이 선택사항인 경우', () => {
      const id = 'input-message-to-send';
      const label = '받는 분께 보내는 메세지';
      const inputRequired = false;
      const type = 'text';
      const value = '안녕하십니까';
      const informationMessage = '100글자 이내로 입력해주세요';

      it('별표 기호가 생략된 상태의 레이블을 화면에 출력', () => {
        renderOrderInputArea({
          id, label, inputRequired, type, value, onChange, informationMessage,
        });

        screen.getByText(/받는 분께 보내는 메세지/);
        expect(screen.queryByText('*')).toBeNull();
      });
    });
  });
});
