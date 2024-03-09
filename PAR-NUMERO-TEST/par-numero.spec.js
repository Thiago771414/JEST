const parNumero = require('./par-numero');

describe('parNumero', () => {
   test('deve retornar o primeiro par de números que somados são iguais ao target', () => {
     expect(parNumero(5, [1, 2, 3, 4, 5])).toEqual([1, 4]);
   });
      
  test('deve retornar um array vazio se nenhum par for encontrado', () => {
    expect(parNumero(10, [1, 2, 3, 4, 5])).toEqual([]);
  });

  test('deve funcionar com números negativos', () => {
    expect(parNumero(-3, [-5, -4, -3, -2, -1])).toEqual([-2, -1]);
  });

  test('deve retornar o primeiro par encontrado mesmo se houver múltiplas possibilidades', () => {
    expect(parNumero(8, [1, 3, 5, 2, 5, 4, 3])).toEqual([3, 5]);
  });

  test('deve retornar um array vazio se a lista de números for vazia', () => {
    expect(parNumero(5, [])).toEqual([]);
  });

  test('deve funcionar com números zero', () => {
    expect(parNumero(0, [-1, 0, 1, 2])).toEqual([-1, 1]);
  });
});
