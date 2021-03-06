import React, { useState, Fragment,useEffect } from "react";
import { nanoid } from "nanoid";
// import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import ReadOnlyTable from "./components/ReadOnlyTable";


const App = () => {
  const [contacts, setContacts] = useState(data);


  const [editFormData, setEditFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const [finalData, setfinalData] = useState([]);

  const [editContactId, setEditContactId] = useState(null);

  const [displayReadOnlyTable, setdisplayReadOnlyTable] = useState(false);

  

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };



  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;
    const finalcontact = {...editedContact};
    
    finalcontact.workfileaction= 'edited'
    
    const finalcontacts= [...finalData]
    

    finalcontacts.splice(index, 1);
    finalcontacts.push(finalcontact)
    setfinalData(finalcontacts)
    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);
    const deletedContact= {...contacts[index]};
    deletedContact.workfileaction='deleted'
    const finalcontacts= [...finalData]
    
    finalcontacts.push(deletedContact)
    setfinalData(finalcontacts)


    setContacts(newContacts);
  };

  const handlefinalSubmit = ()=> {
    setdisplayReadOnlyTable(true);
  }
//useEffect(()=> {finalData.map(contact=>console.log('final',contact))},[finalData])
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
     
      <button
          type="button"
          onClick={(event) => handlefinalSubmit()}
        >
          Submit 
        </button>
     {displayReadOnlyTable? <ReadOnlyTable contacts={finalData}/> : null }
     
    </div>
  );
};

export default App;
