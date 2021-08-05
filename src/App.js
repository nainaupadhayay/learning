import React  from 'react'
import logo from './logo.svg';
import './App.css';
import './table.php';
import Greet from './Greet';
// import Students from './Students';
import qs from "qs";  
import styled from 'styled-components'
import axios from "axios";
import { Button, FormLabel, Table } from 'react-bootstrap';
import { Formik } from 'formik';

 


// const alert = (name) => {
//   console.log('hi ' + name)
// }

const Header = styled.p`
background-color: ${props => props.col};
`
const Yes = styled.div`
color: ${props => props.new};`
//81653660705//

const CreateForm = ({initialValue,submitData }) => 
<Formik
initialValues={initialValue}
onSubmit={submitData}
render ={({handleChange, handleSubmit }) => (
  <>
   <FormLabel>Email</FormLabel>
   <input key="email" onChange={handleChange} key="email" name="email"/>
   
   <FormLabel>Name</FormLabel>
   <input key="name" onChange={handleChange} key="name" name="name"/>
   
   <FormLabel>Age</FormLabel>
   <input key="age" onChange={handleChange} key="age" name="age"/>

   <Button onClick={handleSubmit}>Submit</Button>
 </>
)}
/>

const EditForm = ({initialValue,updateData }) => 
<Formik
initialValues={initialValue}
onSubmit={updateData}
render ={({handleChange, handleSubmit, values }) => (
  <>
  <input name="id" value={values.id} type="hidden"/>
   <FormLabel>Email</FormLabel>
   <input key="email" onChange={handleChange} key="email" name="email" value={values.email}/>
   
   <FormLabel>Name</FormLabel>
   <input key="name" onChange={handleChange} key="name" name="name" value={values.name}/>
   
   <FormLabel>Age</FormLabel>
   <input key="age" onChange={handleChange} key="age" name="age" value={values.age}/>

   <Button onClick={handleSubmit}>Update</Button>
 </>
)}
/>
const App = () => {
  let [apiData, setApiData] = React.useState()
  let initialValue = {email:"", name: "", age: "", id: ""}
  const [editForm, setEditForm] = React.useState()
  let [success, setSuccess] = React.useState(false)
  let [message, setMessage] = React.useState("")
  let [isDeleted, setIsDeleted] = React.useState(false)
  let [isAdded, setIsAdded] = React.useState(false)
  let [isUpdated, setIsUpdated] = React.useState(false)

  React.useEffect(() => {
    axios.get('http://localhost/learning/')
    .then(({data}) => {
      // console.log(data);
      setApiData(data)}
      )
    .catch((err) => console.log(err))
  },[isDeleted, isAdded, isUpdated])


  const submitData = (values) => {
    setIsAdded(false)
    axios.post("http://localhost/learning/saveData.php", qs.stringify(values))
    .then(({data}) => {
      setMessage(data.message)
      setSuccess(true)
      setIsAdded(true)
    })
    .catch((err) => console.log(err))
  }

  const deleteRow =(id) => {
    setIsDeleted(false)
    axios.get(`http://localhost/learning/deleteData.php?id=${id}`).then(({data}) => {
      setMessage(data.message)
      setIsDeleted(true)
  })
  .catch((err) => console.log(err))
  }

  
  const updateData =(row) => {
    console.log(row)
    setIsUpdated(false)
    axios.post("http://localhost/learning/editData.php", qs.stringify(row)).then(({data}) => {
      setMessage(data.message)
      setIsUpdated(true)
      setEditForm()
  })
  .catch((err) => console.log(err))
  }

  return (
    <div className="container">
      {!editForm && <CreateForm initialValue={initialValue} submitData={submitData}/>}
      
      {editForm && <EditForm initialValue={editForm} updateData={updateData}/>}
      
      {success && <p>{message}</p>}
      
      <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>id</th>
              <th>email</th>
              <th>Name</th>
              <th>age</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
          {apiData && apiData.map((row, index) => 
            <tr key={`row-${index}`}>
              <td>{row.id}</td>    
              <td>{row.email}</td>
              <td>{row.name}</td>
              <td>{row.age}</td>
              <td><button onClick = {() => {console.log(row);setEditForm(row)}}>edit</button><button onClick = {() => deleteRow(row.id)}>delete</button></td>
            </tr>
            )}
          </tbody>
        </Table>
      

      {/* <Hooks /> */}
    </div>
  );
}
// function Hooks () {
export const Hooks = () => {
   
  const [count, setCount] = React.useState(0);
   
  React.useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log("LOOK, ITS WORKING");
  });
  return(
    <div>
    <p>you clicked on this {count} times</p>
    <Button variant="success" onClick={()=> setCount(count + 1)}>click me</Button>
   
    </div> 
  
  );
}

export default App;
// export default Hooks;
