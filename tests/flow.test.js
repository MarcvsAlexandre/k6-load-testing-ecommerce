import http from 'k6/http';
import { check, sleep, group } from 'k6';

// Configurações do teste
export const options = {
  vus: 500, // usuários simultâneos
  duration: '3000s', // tempo total de execução
};

const BASE_URL = 'http://localhost:3000';

export default function () {
  let token;

  group('1️⃣ Login do usuário', () => {
    const res = http.post(`${BASE_URL}/auth`, JSON.stringify({
      user: 'm',
      pass: '123',
    }), {
      headers: { 'Content-Type': 'application/json' },
      tags: { endpoint: 'auth' }
    });

    check(res, {
      'status é 200': (r) => r.status === 200,
      'token recebido': (r) => JSON.parse(r.body).token !== undefined,
    });

    token = JSON.parse(res.body).token;
    sleep(1); // simula tempo de leitura
  });

  group('2️⃣ Buscar produto', () => {
    const res = http.get(`${BASE_URL}/product/abc123`, {
      tags: { endpoint: 'product' }
    });
    check(res, {
      'produto retornado': (r) => r.status === 200 && r.body.includes('Fone Bluetooth'),
    });
    sleep(1);
  });

  group('3️⃣ Adicionar ao carrinho', () => {
    const res = http.post(`${BASE_URL}/cart/add`, JSON.stringify({
      productId: 'abc123',
    }), {
      headers: { 'Content-Type': 'application/json' },
      tags: { endpoint: 'cart_add' }
    });

    check(res, {
      'adicionado com sucesso': (r) => r.status === 200,
    });
    sleep(1);
  });

  group('4️⃣ Tracking de evento', () => {
const res = http.post(`${BASE_URL}/track`, JSON.stringify({
  event: 'add_to_cart',
  product: 'abc123',
}), {
  headers: { 'Content-Type': 'application/json' },
  tags: { endpoint: 'track' }
});

    check(res, {
      'tracking OK': (r) => r.status === 200,
    });
    sleep(1);
  });

  group('5️⃣ Ver carrinho', () => {
    const res = http.get(`${BASE_URL}/cart`, {
      tags: { endpoint: 'cart_view' }
    });

    check(res, {
      'carrinho retornado': (r) => r.status === 200 && r.body.includes('abc123'),
    });
    sleep(1);
  });
}
