// src/app/persistSession.js
const KEY = 'sdhm-session';

export const loadSessionState = () => {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
};

export const saveSessionState = (state) => {
  try {
    const trimmed = {
      auth: state.auth,
      cart: state.cart,
      products: {
        reserved: state.products.reserved,
        purchased: state.products.purchased,
      },
    };
    sessionStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
};
