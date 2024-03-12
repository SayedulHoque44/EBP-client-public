import React, { createContext, useState } from "react";

//
export const PContextProvider = createContext(null);

const PContext = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState("");
  const [authReresh, setAuthReresh] = useState(true);
  const [loading, setLoading] = useState(true);

  // context value
  const value = {
    loggedUser,
    setLoggedUser,
    setLoading,
    loading,
    authReresh,
    setAuthReresh,
  };

  return (
    <PContextProvider.Provider value={value}>
      {children}
    </PContextProvider.Provider>
  );
};

export default PContext;
