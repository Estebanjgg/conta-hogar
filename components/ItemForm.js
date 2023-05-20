import React, { useState, useEffect } from "react";
import Link from "next/link";
import AccountContainer from "./AccountContainer";
import useAccounts from "./useAccounts";
import EditItemModal from './EditItemModal';
import { createClient } from '@supabase/supabase-js';

import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const supabaseUrl = 'https://elxmjeqalbxqfittzsnh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVseG1qZXFhbGJ4cWZpdHR6c25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM4NjY5MTEsImV4cCI6MTk5OTQ0MjkxMX0.V9-SZvpJPbpsrWckyO930vu4iRS27DuwNwOWnApK4Sg';
const supabase = createClient(supabaseUrl, supabaseKey);

const ItemForm = () => {
  const [items, setItems] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [deduction, setDeduction] = useState(0);
  const [accounts, updateAccounts] = useAccounts();
  const [showModal, setShowModal] = useState(false);
  const [itemToEditIndex, setItemToEditIndex] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await supabase.from('items').select('*');
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const totalValue = items?.reduce(
    (total, item) => total + parseInt(item.value, 10),
    0
  ) || 0;
  
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
    };
    setItems((prevItems) => {
      if (Array.isArray(prevItems)) {
        return [...prevItems, newItem];
      } else {
        return [newItem];
      }
    });
    

    supabase.from('items').insert(newItem)
      .then(() => {
        console.log("Item inserted into the database.");
      })
      .catch((error) => {
        console.error("Error inserting item:", error);
      });

    form.reset();
  }

  function handleDelete(index) {
    const itemToDelete = items[index];
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemToDelete.id));

    supabase.from('items').delete().match({ id: itemToDelete.id })
      .then(() => {
        console.log("Item deleted from the database.");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  function handleEdit(index) {
    setItemToEditIndex(index);
    setShowModal(true);
  }

  function handleModalSave(updatedItem) {
    const newItems = [...items];
    newItems[itemToEditIndex] = { ...items[itemToEditIndex], ...updatedItem };
    setItems(newItems);
    setShowModal(false);

    supabase.from('items').update(updatedItem).match({ id: updatedItem.id })
      .then(() => {
        console.log("Item updated in the database.");
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  }

  function handleModalClose() {
    setShowModal(false);
  }

  function handleFinishAccount() {
    const newAccount = {
      name: accountName,
      items,
      totalValue: items.reduce((total, item) => total + parseInt(item.value, 10), 0),
    };
    const newAccounts = [...accounts, newAccount];
    updateAccounts(newAccounts);
    setItems([]);
    setAccountName("");

    supabase.from('accounts').insert(newAccount)
      .then(() => {
        console.log("Account inserted into the database.");
      })
      .catch((error) => {
        console.error("Error inserting account:", error);
      });
  }

  function handleDeleteAccount(index) {
    const accountToDelete = accounts[index];
    updateAccounts((prevAccounts) =>
      prevAccounts.filter((account) => account.id !== accountToDelete.id)
    );

    supabase.from('accounts').delete().match({ id: accountToDelete.id })
      .then(() => {
        console.log("Account deleted from the database.");
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  }

  function handleEditAccount(index) {
    const accountToEdit = accounts[index];
    const updatedAccountName = prompt("Edit account name", accountToEdit.name);
    if (updatedAccountName) {
      const newAccounts = [...accounts];
      newAccounts[index] = { ...accountToEdit, name: updatedAccountName };
      updateAccounts(newAccounts);

      supabase.from('accounts').update({ name: updatedAccountName }).match({ id: accountToEdit.id })
        .then(() => {
          console.log("Account updated in the database.");
        })
        .catch((error) => {
          console.error("Error updating account:", error);
        });
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

      supabase.from('accounts').update({ items: newItems }).match({ id: accountToEdit.id })
        .then(() => {
          console.log("Item updated in the database.");
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    }
  }

  return (
    <>
      <NavBar />  
      <div className="container">
        <h2>Control de Gastos Para el Hogar</h2>
        <div className="row">
          <br />
          <br />
          <EditItemModal
  show={showModal}
  item={items?.[itemToEditIndex] || {}}
  onSave={handleModalSave}
  onClose={handleModalClose}
/>

          <div className="item-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nombre del producto🍉🍊💡🚰"
                className="name-input"
              />
              <input
                type="text"
                name="value"
                placeholder="Valor Monetario(Opcional)🫡"
                className=" "
              />
              <button type="submit" className="add-button">
                Agregar Item
              </button>
            </form>
            <ul>
  {items?.map((item, index) => (
    <li key={item.id}>
      <div className="name">{item.name}</div>
      <div className="value">R$ {item.value}</div>
      <button onClick={() => handleEdit(index)} className="edit">
        Editar Item
      </button>
      <button onClick={() => handleDelete(index)} className="delete">
        Borrar Item
      </button>
    </li>
  ))}
</ul>

            <div className="total-value">
              Total De la Suma De los Item 💵: R$ {totalValue}
            </div>
            <input
              type="text"
              value={deduction}
              onChange={handleDeductionChange}
              placeholder="Deduction"
              className="deduction-input"
            />
            <div className="total-after-deduction">
              Total suma mas Resta 💵: R$ {totalAfterDeduction}
            </div>
            {items?.length > 0 && (
  <>
    <br />
    <br />
    <input
      type="text"
      value={accountName}
      onChange={(e) => setAccountName(e.target.value)}
      placeholder="Nombre Opcional 🫡"
      className="account-name-input"
    />
    <button onClick={handleFinishAccount} className="finish-account">
      Crear Lista de Item
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
                  👉 Ir para los item Creados 👈
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ItemForm;
