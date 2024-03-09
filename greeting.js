const greet = (name) => {
    if (typeof name !== 'string') {
      throw new Error("nome deve ser uma string");
    }
    if (name.trim() === '') {
      throw new Error("nome não pode ser vazio");
    }
    return `Olá ${name}, seja bem-vindo ao curso de Desenvolvimento Web`;
  };
  
  module.exports = greet;
  