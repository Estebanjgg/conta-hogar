import React, { useState, useEffect } from "react";

const ItemForm = () => {
  const [items, setItems] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [deduction, setDeduction] = useState(0);

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
      name: accountName, // Agregar el nombre de la cuenta
      items,
      totalValue: items.reduce(
        (total, item) => total + parseInt(item.value),
        0
      ),
      id: new Date().getTime(),
    };
    const newAccounts = [...accounts, newAccount];
    localStorage.setItem("accounts", JSON.stringify(newAccounts));
    setAccounts(newAccounts);
    setItems([]);
    setAccountName(""); // Limpiar el nombre de la cuenta al terminar
  }

  function handleDeleteAccount(index) {
    const newAccounts = [...accounts];
    newAccounts.splice(index, 1);
    localStorage.setItem("accounts", JSON.stringify(newAccounts));
    setAccounts(newAccounts);
  }

  return (
    <div className="item-form-container">
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
            Add item
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
        <div className="total-value">Total value: R$ {totalValue}</div>
        <input
          type="text"
          value={deduction}
          onChange={handleDeductionChange}
          placeholder="Deduction"
          className="deduction-input"
        />
        <div className="total-after-deduction">
          Total after deduction: R$ {totalAfterDeduction}
        </div>
        {items.length > 0 && (
          <>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Account name"
              className="account-name-input"
            />
            <button onClick={handleFinishAccount} className="finish-account">
              Finish account
            </button>
          </>
        )}
        {accounts.length > 0 && (
          <div className="accounts">
            <h3>Accounts</h3>
            {accounts.map((account, index) => (
              <div key={account.id} className="account">
                <h4>{account.name}</h4>
                <ul>
                  {account.items.map((item) => (
                    <li key={item.id}>
                      <div className="name">{item.name}</div>
                      <div className="value">R$ {item.value}</div>
                      <div className="date">{item.date}</div>
                    </li>
                  ))}
                </ul>
                <div className="total-value">
                  Total value: R$ {account.totalValue}
                </div>
                <button
                  onClick={() => handleDeleteAccount(index)}
                  className="delete-account"
                >
                  Delete account
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemForm;