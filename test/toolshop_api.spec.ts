import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';
import { faker } from '@faker-js/faker';

describe('Toolshop API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://api.practicesoftwaretesting.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  // describe('BRAND', () => {
  //   it('criar nova marca', async () => {
  //     await p
  //       .spec()
  //       .post(`${baseUrl}/brands`)
  //       .withJson({
  //         name: 'lalala',
  //         slug: 'lalala'
  //       })
  //       .expectStatus(201);
  //   });
  // });
  describe('BRAND', () => {
    it('retornar todas as marcas', async () => {
      await p.spec().get(`${baseUrl}/brands`).expectStatus(StatusCodes.OK);
    });
  });

  // describe('BRAND', () => {
  //   it('retornar marca específica', async () => {
  //     await p
  //       .spec()
  //       .get(`${baseUrl}/brands/01JRXTX3J3D9G3XS0T3KNBGV0E`)
  //       .expectStatus(StatusCodes.OK);
  //   });
  // });
});
