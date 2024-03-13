function gerarChavePixAleatoria() {
  const caracteres = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let chavePix = '';

  for (let i = 0; i < 20; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    chavePix += caracteres.charAt(indiceAleatorio);
  }

  return chavePix;
}

const chavePixAleatoria = gerarChavePixAleatoria();
console.log(chavePixAleatoria);
