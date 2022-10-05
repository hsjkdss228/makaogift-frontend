/* eslint-disable object-curly-newline */
/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import config from './config';

const { apiBaseUrl } = config;

const server = setupServer(
  rest.get(`${apiBaseUrl}/products`, async (request, response, context) => {
    const page = request.url.searchParams.get('page');

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

    if (page === '8') {
      return response(context.json({
        products: {
          content: [
            { id: 57, maker: '제조사명 57', name: '.', price: 100, description: '.' },
            { id: 58, maker: '제조사명 58', name: '.', price: 100, description: '.' },
            { id: 59, maker: '제조사명 59', name: '.', price: 100, description: '.' },
            { id: 60, maker: '제조사명 60', name: '.', price: 100, description: '.' },
            { id: 61, maker: '제조사명 61', name: '.', price: 100, description: '.' },
            { id: 62, maker: '제조사명 62', name: '.', price: 100, description: '.' },
            { id: 63, maker: '제조사명 63', name: '.', price: 100, description: '.' },
            { id: 64, maker: '제조사명 64', name: '.', price: 100, description: '.' },
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
    const { productId } = request.params;

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
);

export default server;
