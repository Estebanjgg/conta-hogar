// EditItemModal.js
import React, { useState} from "react"


const EditItemModal = ({ show, item, onSave, onClose }) => {
  const [updatedItem, setUpdatedItem] = useState(item);

  const handleChange = (e) => {
    setUpdatedItem({ ...updatedItem, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(updatedItem);
  };

  return (
    show && (
      <div className="modal">
        <div className="modal-content">
          <span className="modal-close" onClick={onClose}>&times;</span>
          <h4>Editar ítem</h4>
          <form>
            <input
              type="text"
              name="name"
              value={updatedItem.name}
              onChange={handleChange}
              placeholder="Nombre del ítem"
            />
            <input
              type="text"
              name="value"
              value={updatedItem.value}
              onChange={handleChange}
              placeholder="Valor"
            />
          </form>
          <div className="modal-actions">
            <button onClick={handleSave} className="save-button">
              Guardar
            </button>
            <button onClick={onClose} className="close-button">
              Cerrar
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditItemModal;
