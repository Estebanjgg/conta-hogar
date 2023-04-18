// pages/account-resultado.js
import React from "react";
import useAccounts from "../components/useAccounts";
import AccountResultado from "../components/AccountResult";

const AccountResultadoPage = () => {
  const [accounts, updateAccounts] = useAccounts();

  function handleDeleteAccount(index) {
    const newAccounts = [...accounts];
    newAccounts.splice(index, 1);
    updateAccounts(newAccounts);
  }

  function handleEditAccount(index) {
    const accountToEdit = accounts[index];
    const updatedAccountName = prompt("Edit account name", accountToEdit.name);
    if (updatedAccountName) {
      const newAccounts = [...accounts];
      newAccounts[index] = { ...accountToEdit, name: updatedAccountName };
      updateAccounts(newAccounts);
    }
  }

  function handleEditItem(accountId, itemIndex) {
    const accountIndex = accounts.findIndex((account) => account.id === accountId);
    if (accountIndex === -1) return;

    const accountToEdit = accounts[accountIndex];
    const itemToEdit = accountToEdit.items[itemIndex];
    const updatedItem = prompt("Edit item", JSON.stringify(itemToEdit));
    if (updatedItem) {
      const updatedItemObject = JSON.parse(updatedItem);
      const newItems = [...accountToEdit.items];
      newItems[itemIndex] = { ...itemToEdit, ...updatedItemObject };

      const newAccounts = [...accounts];
      newAccounts[accountIndex] = { ...accountToEdit, items: newItems };
      updateAccounts(newAccounts);
    }
  }

  return (
    <AccountResultado
      accounts={accounts}
      handleDeleteAccount={handleDeleteAccount}
      handleEditAccount={handleEditAccount}
      handleEditItem={handleEditItem}
    />
  );
};

export default AccountResultadoPage;
