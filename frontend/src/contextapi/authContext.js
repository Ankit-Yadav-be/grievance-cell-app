import { useState, useContext, createContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setauth] = useState("");
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedata = JSON.parse(data);
      setauth(parsedata);
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setauth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
