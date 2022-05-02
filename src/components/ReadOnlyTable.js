import {React,Fragment} from "react";

const ReadOnlyTable = ({contacts}) => {
  return (
    <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>workfileaction</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                 <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>{contact.workfileaction}</td>
      
    </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
  );
};

export default ReadOnlyTable;