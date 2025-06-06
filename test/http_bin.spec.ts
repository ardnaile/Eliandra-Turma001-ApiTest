import pactum from 'pactum';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';
import data from '../data/data.json';

describe('Echo validation', () => {
  const p = pactum;
  const rep = SimpleReporter; // setar o reporter para preencher o relatório
  const baseUrl = 'https://httpbin.org'; // url da api

  p.request.setDefaultTimeout(30000); // tempo de espera de resposta do teste

  beforeAll(() => p.reporter.add(rep)); // precisar dar o add e o end para escrever o relatório
  afterAll(() => p.reporter.end());

  describe('Verifying endpoints using POST method', () => {
    it('Should return the same data as the json sent', async () => {
      // async e await pq vai esperar resposta da api
      await p
        .spec() // "vou fazer uma requisição"
        .post(`${baseUrl}/anything`)
        .withJson(data.sucesso) // json corpo da requisição
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          json: {
            id: 1,
            status: 'SUCCESS'
          },
          method: 'POST'
        });
    });

    it('Should not return the same data as the form sent', async () => {
      await p
        .spec()
        .post(`${baseUrl}/anything`)
        .withForm({
          id: '1',
          status: 'FAIL'
        })
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          form: {
            id: '1',
            status: 'FAIL'
          },
          method: 'POST'
        });
    });
  });

  describe('Verifying endpoints using GET method', () => {
    it('Should return only the default data', async () => {
      await p
        .spec()
        .get(`${baseUrl}/anything`)
        .expectStatus(StatusCodes.OK)
        .expectJsonLike({
          args: {},
          method: 'GET'
        });
    });
  });

  describe('Verifying status code from endpoints', () => {
    it('Should be a bad request', async () => {
      await p
        .spec()
        .get(`${baseUrl}/status/400`)
        .expectStatus(StatusCodes.BAD_REQUEST);
    });

    it('Should be a not found', async () => {
      await p.spec().get(`${baseUrl}/status/200`).expectStatus(StatusCodes.OK);
    });
  });

  describe('Verifying status code from endpoints using another scope', () => {
    it('Should be a teapot', async () => {
      await p
        .spec()
        .get(`${baseUrl}/status/418`)
        .expectStatus(StatusCodes.IM_A_TEAPOT)
        .expectBodyContains('teapot');
    });
  });
});
