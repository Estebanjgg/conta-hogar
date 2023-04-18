// AccountContainer.js

import React from "react";

const AccountContainer = ({ account, onDelete, onEdit, onEditItem }) => {
  const handleEditItemInAccount = (itemIndex) => {
    onEditItem(account.id, itemIndex);
  };

  return (
    <div key={account.id} className="account">
      <h4>{account.name}</h4>
      <ul>
        {account.items.map((item, index) => (
          <li key={item.id}>
            <div className="name">{item.name}</div>
            <div className="value">R$ {item.value}</div>
            <div className="date">{item.date}</div>
            <button onClick={() => handleEditItemInAccount(index)} className="edit-item">
              Editar
            </button>
          </li>
        ))}
      </ul>
      <div className="total-value">Total Cuentas: R$ {account.totalValue}</div>
      <div className="total-after-deduction">
        Total after deduction: R$ {account.totalAfterDeduction}
      </div>
      <button onClick={onEdit} className="edit-account">
       Editar Cuenta
      </button>
      <button onClick={onDelete} className="delete-account">
       Eliminar Cuenta
      </button>
    </div>
  );
};

export default AccountContainer;
