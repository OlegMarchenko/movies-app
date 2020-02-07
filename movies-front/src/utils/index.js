const TOKEN_KEY = "jwt";

/*Auth*/
export const getToken = (tokenKey = TOKEN_KEY) => {
    const local = localStorage.getItem(tokenKey);
    return local ? local : "";
};

export const setToken = (value, tokenKey = TOKEN_KEY) => localStorage.setItem(tokenKey, JSON.stringify(value));

export const clearToken = (tokenKey = TOKEN_KEY) => localStorage.removeItem(tokenKey);
