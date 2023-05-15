import React from "react";
import AccountContainer from "./AccountContainer";

const AccountResultado = ({
  accounts,
  handleDeleteAccount,
  handleEditAccount,
  handleEditItem,
  handleUpdateItemName,
  handleUpdateItemValue,
  handleUpdateAccount,
}) => {
  
  function onUpdateItems(accountId, items) {
    const accountIndex = accounts.findIndex(
      (account) => account.id === accountId
    );
    if (accountIndex === -1) return;
  
    const newAccounts = [...accounts];
    newAccounts[accountIndex] = { ...accounts[accountIndex], items: items };
    handleUpdateAccount(newAccounts);
  }
  

  return (
    <div className="container">
      <div className="row">
        <div className="accounts-container">
          <div className="accounts">
            <h2 className="h2acount">Control De Cuentas 😁</h2>
            <br />
            {accounts.map((account, index) => (
              <AccountContainer
                key={account.id}
                account={account}
                onDelete={() => handleDeleteAccount(index)}
                onEdit={() => handleEditAccount(index)}
                onEditItem={handleEditItem}
                onUpdateItemName={(accountId, itemIndex) =>
                  handleUpdateItemName(accountId, itemIndex)
                }
                onUpdateItemValue={handleUpdateItemValue}
                onUpdateItems={onUpdateItems}    // Cambie esta línea
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountResultado;
