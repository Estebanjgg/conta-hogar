// ItemForm.js

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AccountContainer from "./AccountContainer";
import useAccounts from "./useAccounts";

const ItemForm = () => {
  const [items, setItems] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [deduction, setDeduction] = useState(0);

  const [accounts, updateAccounts] = useAccounts();

  useEffect(() => {
    const itemsFromStorage = localStorage.getItem("items");
    if (itemsFromStorage) {
      setItems(JSON.parse(itemsFromStorage));
    }
  }, []);

  const totalValue = items.reduce(
    (total, item) => total + parseInt(item.value, 10),
    0
  );

  const totalAfterDeduction = totalValue - deduction;

  function handleDeductionChange(event) {
    setDeduction(parseInt(event.target.value, 10) || 0);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const newItem = {
      name: form.name.value,
      value: form.value.value,
      date: form.date.value,
      id: new Date().getTime(),
    };
    const newItems = [...items, newItem];
    localStorage.setItem("items", JSON.stringify(newItems));
    setItems(newItems);
    form.reset();
  }

  function handleDelete(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(newItems));
    setItems(newItems);
  }

  function handleEdit(index) {
    const itemToEdit = items[index];
    const updatedItem = prompt("Edit item", JSON.stringify(itemToEdit));
    if (updatedItem) {
      const updatedItemObject = JSON.parse(updatedItem);
      const newItems = [...items];
      newItems[index] = { ...itemToEdit, ...updatedItemObject };
      localStorage.setItem("items", JSON.stringify(newItems));
      setItems(newItems);
    }
  }

  function handleFinishAccount() {
    const newAccount = {
      name: accountName,
      items,
      totalValue: items.reduce(
        (total, item) => total + parseInt(item.value),
        0
      ),
      id: new Date().getTime(),
    };
    const newAccounts = [...accounts, newAccount];
    updateAccounts(newAccounts);
    setItems([]);
    setAccountName("");
  }

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
    const accountIndex = accounts.findIndex(
      (account) => account.id === accountId
    );
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
    <div className="container">
      <h2>Control de Gastos</h2>
      <div className="row">
      
      <br />
      <br />
        <div className="item-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Item name"
              className="name-input"
            />
            <input
              type="text"
              name="value"
              placeholder="Value"
              className="value-input"
            />
            <input type="date" name="date" className="date-input" />
            <button type="submit" className="add-button">
              Agregar Factura
            </button>
          </form>
          <ul>
            {items.map((item, index) => (
              <li key={item.id}>
                <div className="name">{item.name}</div>
                <div className="value">R$ {item.value}</div>
                <div className="date">{item.date}</div>
                <button onClick={() => handleEdit(index)} className="edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(index)} className="delete">
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="total-value">
            Total valor para Pagar: R$ {totalValue}
          </div>
          <input
            type="text"
            value={deduction}
            onChange={handleDeductionChange}
            placeholder="Deduction"
            className="deduction-input"
          />
          <div className="total-after-deduction">
            Total Despues de las Deduccion: R$ {totalAfterDeduction}
          </div>
          {items.length > 0 && (
            <>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Nombre Del Mes"
                className="account-name-input"
              />
              <button onClick={handleFinishAccount} className="finish-account">
                Crear Mes a Pagar
              </button>
            </>
          )}
        </div>
      </div>
      {accounts.length > 0 && (
        <div className="row">
          <div className="accounts-container">
            <div className="accounts">
              <Link
                href="/account-resultado"
                passHref
                legacyBehavior
                className="account-resultado-link"
              >
                Ver cuentas a pagar por mes
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ItemForm;