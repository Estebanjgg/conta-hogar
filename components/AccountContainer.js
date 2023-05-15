import React, { useState, useEffect } from "react";

import SimpleCalculator from "./SimpleCalculator";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AccountContainer = ({
  account,
  onDelete,
  onEdit,
  onEditItem,
  onUpdateItemName,
  onUpdateItemValue,
  onUpdateItems, // Cambie esta línea
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentItemIndex, setCurrentItemIndex] = useState(null);
  const [editedItem, setEditedItem] = useState({ name: "", value: "" });
  const [totalValue, setTotalValue] = useState(0);
  const [totalAfterDeduction, setTotalAfterDeduction] = useState(0);
  const [newItem, setNewItem] = useState({ name: "", value: "" });

  function handleAddItem() {
    const newItemObject = {
      ...newItem,
      id: new Date().getTime(),
    };
    const updatedItems = [...account.items, newItemObject];
    onUpdateItems(account.id, updatedItems);
    setNewItem({ name: "", value: "" });
  }
  useEffect(() => {
    let sum = 0;
    for (const item of account.items) {
      sum += parseFloat(item.value);
    }
    setTotalValue(sum);
    setTotalAfterDeduction(sum - account.deduction);
  }, [account.items, account.deduction]);

  const handleEditItemInAccount = (itemIndex, checked) => {
    onEditItem(account.id, itemIndex, checked);
  };

  const handleToggleChecked = (itemIndex) => {
    const item = account.items[itemIndex];
    handleEditItemInAccount(itemIndex, !item.checked);
  };

  const handleOpenModal = (itemIndex) => {
    const item = account.items[itemIndex];
    setEditedItem({ name: item.name, value: item.value });
    setCurrentItemIndex(itemIndex);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentItemIndex(null);
  };

  const handleSaveChanges = () => {
    onUpdateItemName(account.id, currentItemIndex, editedItem.name);
    onUpdateItemValue(account.id, currentItemIndex, editedItem.value);
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    setEditedItem({ ...editedItem, [e.target.name]: e.target.value });
  };

  const handleDeleteAccount = (itemIndex) => {
    onDelete(account.id, itemIndex);
  };

  const handleAddNewItem = () => {
    const newItemObject = {
      id: new Date().getTime(),
      name: newItem.name,
      value: newItem.value,
      checked: false,
    };
    const updatedItems = [...account.items, newItemObject];
    onUpdateItems(account.id, updatedItems); // Cambie esta línea
    setNewItem({ name: "", value: "" });
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

            <button
              onClick={() => handleOpenModal(index)}
              className="edit-item"
            >
              Editar
            </button>   
          </li>
        ))}
      </ul>
      <br />
      <br />
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="newItemName">
          <Form.Label>Escribe tu nuevo item para agregar a la lista(Opcional)</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="newItemValue">
          <Form.Label>Valor del ítem</Form.Label>
          <Form.Control
            type="text"
            name="value"
            value={newItem.value}
            onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
          />
        </Form.Group>
        <br />
        <Button variant="primary" onClick={handleAddItem}>
          Agregar ítem
        </Button>
      </Form>

      <div className="total-value">Total Valor : R$ {totalValue}</div>

      <button onClick={onEdit} className="edit-account">
        Editar Cuenta
      </button>
      <button onClick={handleDeleteAccount} className="delete-account">
        Eliminar Cuenta
      </button>
      <br />
      <br /><br />
      <SimpleCalculator />

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Nombre y Valor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedItem.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="editValue">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                name="value"
                value={editedItem.value}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountContainer;
