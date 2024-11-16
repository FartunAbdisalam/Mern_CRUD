import React from "react";
// import App from "../App";

const Read = ({ data, edit, deleteOp }) => {
  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => edit(user)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteOp(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
