import styled from 'styled-components';
import numberFormat from '../utils/numberFormat';
import PrimaryButton from './ui/PrimaryButton';

const Container = styled.article`
  height: ${(props) => props.theme.pageSize.height};
`;

const ProductSection = styled.div`
  color: #444444;
  margin-block: 5em auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5em;
`;

const ProductImage = styled.img`
  height: 30em;
  width: 30em;
  border: 1px dotted #999999;
`;

const ProductDescription = styled.section`
  height: 30em;
  width: 30em;
  display: grid;
  grid-template-rows: 1fr 0.6fr 2.5fr 0.7fr 1fr;
`;

const Name = styled.p`
  font-size: 1.5em;
  height: 2.2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: 1.15em;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.span`
  display: inline-block;
  font-size: 2em;
  font-weight: bold;
`;

const Details = styled.dl`
  display: flex;
  flex-direction: column;

  div {
    padding-block: 1.1em;
    border-top: 1px solid #D9D9D9;
    display: grid;
    grid-template-columns: 2fr 5fr;
    align-items: center;
  }

  div:nth-child(2) {
    padding-block: 1em;
  }

  div:last-child {
    border-bottom: 1px solid #D9D9D9;
    dd {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      line-height: 1.15em;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  dt {
    color: #666666;
  }

  dd {
    font-size: 1.1em;
  }
`;

const CountButtonArea = styled.p`
  padding: .3em .15em .15em;
  display: inline;
  border: 1px solid #D9D9D9;
  border-radius: .4em;

  button {
    font-size: 1.1em;
    border: none;
    background: none;
  }

  button:first-child {
    font-size: 1.3em;
  }

  span {
    margin-inline: .8em;
  }
`;

const TotalCost = styled.p`
  padding-block: 1.5em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: .5em;
`;

export default function Product({
  product, selectedCount, totalCost, canBuy,
  onClickAdd, onClickReduce, onClickBuy,
}) {
  const handleClickAdd = () => {
    onClickAdd();
  };

  const handleClickReduce = () => {
    onClickReduce();
  };

  const handleClickBuy = () => {
    onClickBuy();
  };

  return (
    <Container>
      <ProductSection>
        <ProductImage
          src=""
          alt="상품 이미지"
        />
        <ProductDescription>
          <Name>{product.name}</Name>
          <Price>
            {numberFormat(product.price)}
            원
          </Price>
          <Details>
            <div>
              <dt>제조사</dt>
              <dd>{product.maker}</dd>
            </div>
            <div>
              <dt>구매수량</dt>
              <dd>
                <CountButtonArea>
                  <button
                    type="button"
                    onClick={handleClickReduce}
                    disabled={selectedCount < 2}
                  >
                    -
                  </button>
                  <span>
                    {selectedCount}
                  </span>
                  <button
                    type="button"
                    onClick={handleClickAdd}
                  >
                    +
                  </button>
                </CountButtonArea>
              </dd>
            </div>
            <div>
              <dt>상품설명</dt>
              <dd>{product.description}</dd>
            </div>
          </Details>
          <TotalCost>
            총 상품금액:
            {' '}
            <Price>
              {numberFormat(totalCost)}
              원
            </Price>
          </TotalCost>
          <PrimaryButton
            type="button"
            name="present-button"
            onClick={handleClickBuy}
          >
            선물하기
          </PrimaryButton>
        </ProductDescription>
      </ProductSection>
      {!canBuy ? (
        <p>잔액이 부족하여 선물하기가 불가합니다.</p>
      ) : null}
    </Container>
  );
}
