// import { MdClose } from "react-icons/md";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import FormData from "./Components/FormData";
import Read from "./Components/Read";

axios.defaults.baseURL = "http://localhost:8080";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    if (data.data.success) {
      fetchData();
      setAddSection(false);
      alert(data.data.message);
    }
  };
  //read data from DB
  const fetchData = async () => {
    const thisData = await axios.get("/");
    // console.log(thisData);
    if (thisData.data.success) {
      setDataList(thisData.data.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  // console.log(dataList);

  const deleteRecord = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      fetchData();
      alert(data.data.message);
    }
  };
  //update code:
  const updateRecord = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      fetchData();
      alert(data.data.message);
      setEditSection(false);
    }
  };
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleEdit = (user) => {
    // const info = setFormDataEdit(user);
    setFormDataEdit(user);
    setEditSection(true);
  };

  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>
        Add
      </button>
      {addSection && (
        <FormData
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleClose={() => setAddSection(false)}
          rest={formData}
        />
      )}
      {editSection && (
        <FormData
          handleSubmit={updateRecord}
          handleOnChange={handleEditOnChange}
          handleClose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}
      <Read data={dataList} edit={handleEdit} deleteOp={deleteRecord} />
    </div>
  );
}

export default App;
