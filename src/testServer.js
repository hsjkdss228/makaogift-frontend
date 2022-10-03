/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const server = setupServer(
  rest.get(`${apiBaseUrl}/products`, async (request, response, context) => (
    response(context.json({
      products: [
        {
          id: 1, maker: '제조사 1', name: '상품 옵션명 1', price: 100,
        },
        {
          id: 2, maker: '제조사 2', name: '상품 옵션명 2', price: 200,
        },
        {
          id: 3, maker: '제조사 3', name: '상품 옵션명 3', price: 300,
        },
      ],
    }))
  )),
);

export default server;
