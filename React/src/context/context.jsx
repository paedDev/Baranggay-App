import { createContext, useEffect, useState } from "react";


export const GlobalContext = createContext({
  toggleTheme: () => { },
  token: null,
  user: null,
  theme: 'light',
  setUser: () => { },
  setToken: () => { },

});

export default function GlobalState({ children }) {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('light'));
  const [token, _setToken] = useState();
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState(null);

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  };
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <GlobalContext.Provider value={{ theme, toggleTheme, user, token, loading, setLoading, setUser, setToken }}>
      {children}
    </GlobalContext.Provider>
  );
}