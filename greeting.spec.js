const greet = require('./greeting');
const { sum } = require('./mathOperations');

describe("Saudação", () => {
  test('sucesso ao saudar um usuário pelo nome', () => {
    expect(greet("João")).toBe("Olá João, seja bem-vindo ao curso de Desenvolvimento Web");
  });

  test('erro quando o nome é um número', () => {
    expect(() => greet(123)).toThrow("nome deve ser uma string");
  });

  test('exceção quando o nome é vazio', () => {
    expect(() => greet("")).toThrow("nome não pode ser vazio");
  });

  test('sucesso mesmo quando o nome tem espaços em branco', () => {
    // Se você deseja que esse teste passe, considere ajustar a implementação de `greet` para tratar espaços em branco
    expect(greet(" João ")).toBe("Olá  João , seja bem-vindo ao curso de Desenvolvimento Web");
  });

  describe("Operações Matemáticas", () => {
    test('a soma de 1 + 2 deve ser igual a 3', () => {
      expect(sum(1, 2)).toBe(3);
    });
  
    test('a soma de -1 + 1 deve ser igual a 0', () => {
      expect(sum(-1, 1)).toBe(0);
    });
  
    test('a soma de 1.5 + 2.5 deve ser igual a 4', () => {
      expect(sum(1.5, 2.5)).toBe(4);
    });

    test('a soma de 1 + 2 deve ser igual a 5 (falha intencional)', () => {
      expect(sum(1, 2)).toBe(5); // Isso irá falhar, pois 1 + 2 não é igual a 5
    });
  });
});
