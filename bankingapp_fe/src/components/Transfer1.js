import React from 'react'
import axios from "axios";
import { Modal} from 'antd';
import Navbar1 from "./Navbar1"
import { Grid, Segment} from 'semantic-ui-react';    
import { useState, useEffect } from "react";
import configData from "./config.json";
function Transfer1() {

    const [usersData, setUsersData] = useState([]);
    const [fromAccountNumber, setFromAccountNumber] = useState("")
    const [toAccountNumber, setToAccountNumber] = useState("")
    const [amount, setAmount] = useState("")
    const [message, setMessage] = useState("")
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    function error(text) {
      Modal.error({
        title: text,
       // content:text,
      });
  }
  

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token)
    {
      getData();
    }
    else{
      error("You do not have permission. Please login back.")
    }

    
  }, [])
  
  const getData = async () => {
    try {
      
      // const result = await axios.get(configData.HOST_URL + "/accounts/accounts/get")
      const token = localStorage.getItem("token")
      const result = await axios.get(configData.HOST_URL + '/accounts/accounts/get/', { headers: { 'Authorization': `token ${token}` } })
      console.log(result)
      setUsersData(()=>result.data)
  } catch (error) {
      console.log(error)
    }
  }
  
  
    //fetch users data
    // const fetchUsersData = async () => {
      
    //     const res = await fetch("http://localhost:8080/accounts/accounts/get");
    //     const data = await res.json();
    //     return data;
    //    };
    
      //  const transfer = async (transData) => {
      //   const res = await fetch('http://localhost:5005/transferDetails',
      //     {
      //       method: "POST",
      //       headers: {
      //         'Content-type': 'application/json'
      //       },
      //       body: JSON.stringify(transData)
      //     })
      // }
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!fromAccountNumber) {
      alert("Please enter From Account")
    } else if (!toAccountNumber) {
      
      alert("Please enter To Account")
        
    } else {

      
      const transfer = { fromAccount: fromAccountNumber, toAccount: toAccountNumber, amount: amount, txnDesc: message }
      const token = localStorage.getItem("token")
      axios.post(configData.HOST_URL + '/transactions/transactions/transfer/', transfer, { headers: { 'Authorization': `token ${token}` } })
        .then(res => {
        
          setFromAccountNumber("")
          setToAccountNumber("")
          setAmount("")
          setMessage("")
      
        })
       
    }
    
  }
  
 // const filterData = usersData.filter(user => user.accountNumber !== toAccountNumber);

  return (
    <div>
      <Navbar1 />
      
      <Segment className="container">
        <Grid centered>


          <semantic_header><div className="form-head"><h1>Transfer Money</h1></div></semantic_header>

           
              <form className='transfer' onSubmit={onSubmit}>
                <div className='form-control '>
               
                <label  >From Account </label>
                <select className="drop" style={{ marginLeft: "1%"}} 
                  value = {fromAccountNumber}
                  onChange={(e) => setFromAccountNumber(e.target.value)} required>
                  <option > -- select an option -- </option>
                  {usersData.filter(user=> user.accountNumber!= toAccountNumber).map((user) => (
                
                    <option value={user.accountNumber}>{user.accountNumber}</option>
                   ))}
                </select>
  
                <div className='form-control '>
            <label >To Account </label>
            <select className="drop" style={{ marginLeft: "1%" }} 
              value = {toAccountNumber}
              onChange={(e) => setToAccountNumber(e.target.value)} required>
              <option > -- select an option -- </option>
              {usersData.filter(user=> user.accountNumber!= fromAccountNumber).map((user) => (
                
              <option value={user.accountNumber}>{user.accountNumber}</option>
               ))}
            </select>
            </div>
           
                
            </div>
            
                <div className='form-control'>
                  <label>Amount</label>
                  <input
                  type="number"
                  placeholder='Amount'
                  value = {amount}
                  onChange={(e) => setAmount(e.target.value)} min="1" required/>
                </div>
        
                <div className='form-control'>
                  <label>Message</label>
                  <input
                  type="text"
                  placeholder='Message'
                  value = {message}
                  onChange={(e) => setMessage(e.target.value)}/>
            </div>
            
                <input type='submit' value="Transfer" className='btn btn-block'/>
            </form>
          </Grid>
        </Segment>

        <Modal title="Money Transferred" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Money Transferred successfully!!</p>
      </Modal>
      
    </div>
  )
}

export default Transfer1
