import pactum from 'pactum';
import { SimpleReporter } from '../simple-reporter';

describe('Fake Store API', () => {
  const p = pactum;
  const rep = SimpleReporter;
  const baseUrl = 'https://fakestoreapi.com';

  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  describe('Products', () => {
    it('Retornar todos os produtos disponíveis', async () => {
      await p.spec().get(`${baseUrl}/products`).expectStatus(200);
    });
  });

  describe('Products', () => {
    it('Criar novo produto', async () => {
      await p.spec()
      .post(`${baseUrl}/products`)
      .withJson({
        "id": 0,
        "title": "string",
        "price": 0.1,
        "description": "string",
        "category": "string",
        "image": "http://example.com"
      })
      .expectStatus(200);
    });
  });

  describe('Products', () => {
    it('Criar novo produto sem corpo de requisição', async () => {
      await p.spec()
      .post(`${baseUrl}/products`)
      .expectStatus(400);
    });
  });

  describe('Products', () => {
    it('Retornar um produto pelo id', async () => {
      await p.spec().get(`${baseUrl}/products/0`).expectStatus(200);
    });
  });

  describe('Products', () => {
    it('Retornar um produto pelo id com string', async () => {
      await p.spec().get(`${baseUrl}/products/abc`).expectStatus(400);
    });
  });

  describe('Products', () => {
    it('Atualiza um produto pelo id', async () => {
      await p
      .spec()
      .put(`${baseUrl}/products/0`)
      .withJson({
        "id": 0,
        "title": "novo titulo",
        "price": 0.1,
        "description": "nova descricao",
        "category": "string",
        "image": "http://example.com"
        })
      .expectStatus(200);
    });
  });

  describe('Products', () => {
    it('Deletar um produto pelo id', async () => {
      await p
      .spec()
      .delete(`${baseUrl}/products/0`)
      .expectStatus(200);
    });
  });

  describe('Carts', () => {
    it('Retornar todos os carrinhos dispoíveis', async () => {
      await p.spec().get(`${baseUrl}/carts`).expectStatus(200);
    });
  });

  describe('Carts', () => {
    it('Criar novo carrinho', async () => {
      await p.spec()
      .post(`${baseUrl}/carts`)
      .withJson({
        "id": 0,
        "userId": 0,
        "products": [
          {
            "id": 0,
            "title": "string",
            "price": 0.1,
            "description": "string",
            "category": "string",
            "image": "http://example.com"
          }
        ]
      })
      .expectStatus(200);
    });
  });

  describe('Carts', () => {
    it('Retornar um carrinho pelo id', async () => {
      await p.spec().get(`${baseUrl}/carts/1`).expectStatus(200);
    });
  });

  describe('Carts', () => {
    it('Atualiza um carrinho pelo id', async () => {
      await p
      .spec()
      .put(`${baseUrl}/carts/2`)
      .withJson({
        "id": 0,
        "userId": 0,
        "products": [
          {
            "id": 0,
            "title": "novo titulo",
            "price": 0.1,
            "description": "string",
            "category": "string",
            "image": "http://example.com"
          }
        ]
      })
      .expectStatus(200);
    });
  });

  describe('Carts', () => {
    it('Deletar um carrinho pelo id', async () => {
      await p
      .spec()
      .delete(`${baseUrl}/carts/0`)
      .expectStatus(200);
    });
  });

  describe('Carts', () => {
    it('Deletar um carrinho inexistente pelo id', async () => {
      await p
      .spec()
      .delete(`${baseUrl}/carts/908797`)
      .expectStatus(400);
    });
  });
});
