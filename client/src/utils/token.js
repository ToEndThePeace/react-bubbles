const tokenName = "webToken123";
export const getToken = () => {
  return localStorage.getItem(tokenName);
}

export const setToken = (value) => {
  localStorage.setItem(tokenName, JSON.stringify(value))
}