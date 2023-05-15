import React from "react";
import AccountContainer from "./AccountContainer";

const AccountResultado = ({
  accounts,
  handleDeleteAccount,
  handleEditAccount,
  handleEditItem,
  handleUpdateItemName,
  handleUpdateItemValue
}) => {
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
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountResultado;
