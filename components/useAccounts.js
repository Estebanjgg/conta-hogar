// useAccounts.js

import { useState, useEffect } from "react";

const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const accountsFromStorage = localStorage.getItem("accounts");
    if (accountsFromStorage) {
      setAccounts(JSON.parse(accountsFromStorage));
    }
  }, []);

  const updateAccounts = (newAccounts) => {
    localStorage.setItem("accounts", JSON.stringify(newAccounts));
    setAccounts(newAccounts);
  };

  return [accounts, updateAccounts];
};

export default useAccounts;
