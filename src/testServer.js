/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const server = setupServer(
  rest.get(`${apiBaseUrl}/products`, async (request, response, context) => {
    const page = await request.url.searchParams.get('page');

    if (page === '1') {
      return response(context.json({
        products: {
          content: [
            {
              id: 1,
              maker: '위키북스',
              name: '객체지향의 사실과 오해',
              price: 100,
              description: '역할, 책임, 협력 과정에서 본 객체지향',
            },
            {
              id: 2,
              maker: '인사이트',
              name: 'The Pragmatic Programmer',
              price: 200,
              description: '20주년 기념판',
            },
            {
              id: 3,
              maker: '인사이트',
              name: 'Test-Driven Development',
              price: 300,
              description: 'By Example',
            },
          ],
          pageable: {
            pageSize: 1,
          },
        },
        totalProductsSize: 3,
      }));
    }

    if (page === '5') {
      return response(context.json({
        products: {
          content: [
            { id: 33, maker: '제조사명 33', name: '.', price: 100, description: '.' },
            { id: 34, maker: '제조사명 34', name: '.', price: 100, description: '.' },
            { id: 35, maker: '제조사명 35', name: '.', price: 100, description: '.' },
            { id: 36, maker: '제조사명 36', name: '.', price: 100, description: '.' },
            { id: 37, maker: '제조사명 37', name: '.', price: 100, description: '.' },
            { id: 38, maker: '제조사명 38', name: '.', price: 100, description: '.' },
            { id: 39, maker: '제조사명 39', name: '.', price: 100, description: '.' },
            { id: 40, maker: '제조사명 40', name: '.', price: 100, description: '.' },
          ],
          pageable: {
            pageSize: 8,
          },
        },
        totalProductsSize: 64,
      }));
    }

    return response(context.status(400));
  }),

  rest.get(`${apiBaseUrl}/products/:productId`, async (request, response, context) => {
    const { productId } = await request.params;

    if (productId === '1') {
      return response(context.json({
        id: 1,
        maker: 'TREK',
        name: 'DOMANE AL 3',
        price: 1490000,
        description: '최고의 인듀어런스 자전거',
      }));
    }

    return response(context.status(400));
  }),

  // TODO: request에서 필요한 것 꺼내쓰는 방법 (header라던가, json이라던가) 정리

  rest.post(`${apiBaseUrl}/order`, async (request, response, context) => {
    const { receiver, address } = await request.json();

    if (!receiver && !address) {
      return response(
        context.status(400),
        context.json({
          errorCodesAndMessages: {
            1001: '성함을 입력해주세요',
            1002: '주소를 입력해주세요',
          },
        }),
      );
    }

    if (!receiver) {
      return response(
        context.status(400),
        context.json({
          errorCodesAndMessages: {
            1001: '성함을 입력해주세요',
          },
        }),
      );
    }

    if (!address) {
      return response(
        context.status(400),
        context.json({
          errorCodesAndMessages: {
            1002: '주소를 입력해주세요',
          },
        }),
      );
    }

    if (receiver === '치코'
    || receiver === '치코리타치코리타치코리타'
    || receiver === '치코12리타') {
      return response(
        context.status(400),
        context.json({
          errorCodesAndMessages: {
            1003: '3~7자까지 한글만 사용해주세요',
          },
        }),
      );
    }

    const accessToken = await request.headers.get('Authorization')
      .substring('Bearer '.length);

    if (accessToken) {
      return response(
        context.status(200),
        context.json({
          orderId: 1,
        }),
      );
    }

    if (!accessToken) {
      return response(
        context.status(400),
      );
    }

    return response(
      context.status(400),
    );
  }),
);

export default server;
