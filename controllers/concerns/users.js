function idGenerator() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  const randomChar = (charSet) => {
    const index = Math.floor(Math.random() * charSet.length);
    return charSet[index];
  };

  let id = '';
  for (let i = 0; i < 4; i++) {
    id += randomChar(letters);
    id += randomChar(numbers);
    id += randomChar(symbols);
  }

  return id;
}

module.exports = { idGenerator }