import { useEffect, useState } from "react";
import Alert from "./Alert";
import "./App.css";
import List from "./List";




const getLocalStorage=()=>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else {
    return [];
  }
}


function App() {
  // start from 4 hours and 18 mins
  //tomorrow begginig
  // for form value
  const [name, setName] = useState("");
  // for localstorage
  const [list, setList] = useState(getLocalStorage());
  //for updating
  const [isEditing, setIsEditing] = useState(false);
  //for edit id
  const [editId, setEditId] = useState(null);
  //for hover
  const [alert, setAlert] = useState({ show: false, msg: " ", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      //display alert
      // setAlert({show: true , msg:'please enter value' , type:'danger'})
      showAlert(true , 'danger' , 'please enter value')
    } else if (name && isEditing) {
      //deal with edit
      setList(list.map((item)=> {
        if(item.id === editId){
          return { ...item, title:name }
        }
        return item;
      }))
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true,'success', 'value changed')
    } else {
      //show alert
      showAlert(true,'success','item added to the list')
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false , type= '' , msg='')=>{
    setAlert({show:show , type, msg})
  }

  //handle clear all value
  const clearAll =()=> {
    showAlert(true , 'danger' , 'empty list')
    setList([]);
  }

  // remove individual item from the list 
  const removeItem = (id) => {
    showAlert(true, 'danger' , 'item removed');
    setList(list.filter((item)=> item.id !== id))
  }


  //edit item
  const editItem =(id)=>{
    const specification = list.find((item)=> item.id === id );
    setIsEditing(true);
    setEditId(id);
    setName(specification.title)
  }

  //localstorage
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])

  return (
    <div className="section-center">
      <form className="grocery-form" onClick={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e . g . eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem}></List>
          <button className="clear-btn" onClick={() => clearAll()}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
