function parNumero(target, numbers) {
    for (let i = 0; i < numbers.length; i++) {
      for (let j = i + 1; j < numbers.length; j++) {
        if (numbers[i] + numbers[j] === target) {
          return [numbers[i], numbers[j]];
        }
      }
    }
    return []; // Retorna um array vazio se nenhum par for encontrado
}

module.exports = parNumero;
