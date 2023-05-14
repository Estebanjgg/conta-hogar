import React from "react";

const AccountContainer = ({
  account,
  onDelete,
  onEdit,
  onEditItem,
  onUpdateItemName,
  onUpdateItemValue,
}) => {
  const handleEditItemInAccount = (itemIndex, checked) => {
    onEditItem(account.id, itemIndex, checked);
  };

  const handleToggleChecked = (itemIndex) => {
    const item = account.items[itemIndex];
    handleEditItemInAccount(itemIndex, !item.checked);
  };

  const handleUpdateName = (itemIndex) => {
    const item = account.items[itemIndex];
    const updatedName = prompt("Enter the updated name", item.name);
    if (updatedName) {
      onUpdateItemName(account.id, itemIndex, updatedName);
    }
  };

  const handleUpdateValue = (itemIndex) => {
    const item = account.items[itemIndex];
    const updatedValue = prompt("Enter the updated value", item.value);
    if (updatedValue) {
      onUpdateItemValue(account.id, itemIndex, updatedValue);
    }
  };

  return (
    <div key={account.id} className="account">
      <h4>{account.name}</h4>
      <ul>
        {account.items.map((item, index) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.checked || false}
              onChange={() => handleToggleChecked(index)}
              className="checkbox-input"
            />
            <div className="name">{item.name}</div>
            <div className="value">{item.value}</div>
            {/* ... */}
            <button
              onClick={() => handleUpdateName(index)}
              className="edit-item"
            >
              Editar Nombre
            </button>
            <button
              onClick={() => handleUpdateValue(index)}
              className="edit-item"
            >
              Editar Valor
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
