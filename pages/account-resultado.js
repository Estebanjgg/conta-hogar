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
    if (!accountToEdit) {
      console.error("No account found for index:", index);
      return;
    }
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
    const updatedItemObject = { ...itemToEdit, checked: !itemToEdit.checked };

    const newItems = [...accountToEdit.items];
    newItems[itemIndex] = updatedItemObject;

    const newAccounts = [...accounts];
    newAccounts[accountIndex] = { ...accountToEdit, items: newItems };
    updateAccounts(newAccounts);
  }


  function handleUpdateItemName(accountId, itemIndex, newName) {
    const accountIndex = accounts.findIndex((account) => account.id === accountId);
    if (accountIndex === -1) return;

    const accountToEdit = accounts[accountIndex];
    const itemToEdit = accountToEdit.items[itemIndex];
    const updatedItemObject = { ...itemToEdit, name: newName };

    const newItems = [...accountToEdit.items];
    newItems[itemIndex] = updatedItemObject;

    const newAccounts = [...accounts];
    newAccounts[accountIndex] = { ...accountToEdit, items: newItems };
    updateAccounts(newAccounts);
  }

  function handleUpdateItemValue(accountId, itemIndex, newValue) {
    const accountIndex = accounts.findIndex((account) => account.id === accountId);
    if (accountIndex === -1) return;

    const accountToEdit = accounts[accountIndex];
    const itemToEdit = accountToEdit.items[itemIndex];
    const updatedItemObject = { ...itemToEdit, value: newValue };

    const newItems = [...accountToEdit.items];
    newItems[itemIndex] = updatedItemObject;

    const newAccounts = [...accounts];
    newAccounts[accountIndex] = { ...accountToEdit, items: newItems };
    updateAccounts(newAccounts);
  }

  return (
    <AccountResultado
      accounts={accounts}
      handleDeleteAccount={handleDeleteAccount}
      handleEditAccount={handleEditAccount}
      handleEditItem={(accountId, itemIndex) =>
        handleEditItem(accountId, itemIndex)
      }
      handleUpdateItemName={(accountId, itemIndex, newName) =>
        handleUpdateItemName(accountId, itemIndex, newName)
      }
      handleUpdateItemValue={(accountId, itemIndex, newValue) =>
        handleUpdateItemValue(accountId, itemIndex, newValue)
      }
    />
  );
};

export default AccountResultadoPage;