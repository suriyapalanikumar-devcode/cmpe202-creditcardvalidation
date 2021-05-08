import React from 'react'

import Navbar1 from "./Navbar1"
import { Grid, Segment} from 'semantic-ui-react';    
import { useState, useEffect } from "react";
function Transfer1() {

    const [usersData, setUsersData] = useState([]);
    const [fromAccountNumber, setFromAccountNumber] = useState("")
    const [toAccountNumber, setToAccountNumber] = useState("")
    const [amount, setAmount] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
      const getUserData = async () => {
        const uDataFromServer = await fetchUsersData();
        setUsersData(uDataFromServer);
      };
      getUserData();
    }, []); 
  
    //fetch users data
    const fetchUsersData = async () => {
        const res = await fetch("http://localhost:5001/userData");
        const data = await res.json();
        return data;
       };
    
       const transfer = async (transData) => {
        const res = await fetch('http://localhost:5005/transferDetails',
          {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(transData)
          })
      }
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!fromAccountNumber) {
      alert("Please enter From Account")
    } else if (!toAccountNumber) {
      
      alert("Please enter To Account")
        
    } else {

      
     
      transfer({ fromAccountNumber: fromAccountNumber, toAccountNumber: toAccountNumber, amount: amount, message: message })

      setFromAccountNumber("")
      setToAccountNumber("")
      setAmount("")
      setMessage("")
      
    }
    
  }
  
  const filterData = usersData.filter(user => user.accountnumber !== toAccountNumber);

  return (
    <div>
      <Navbar1 />
      
      <Segment className="container">
        <Grid centered>

        

          <semantic_header><div className="form-head"><h1>Transfer Money</h1></div></semantic_header>

           
              <form className='transfer' onSubmit={onSubmit}>
                <div className='form-control '>
               
                <label  >From Account </label>
                <select className="drop" style={{ marginLeft: "1%" }} 
                  value = {fromAccountNumber}
                  onChange={(e) => setFromAccountNumber(e.target.value)} required>
                  <option > -- select an option -- </option>
                  {filterData.map((user) => (
                    
                  <option value={user.accountnumber}>{user.accountnumber}</option>
                   ))}
                </select>
  
           
                
                
            <div style={ {display:"inline-block", marginLeft:"150px"}}>
            <label style={{ marginLeft: -10}}>To Account </label>
            <select className="drop" style={{ marginLeft: -5 }} 
              value = {toAccountNumber}
              onChange={(e) => setToAccountNumber(e.target.value)} required>
              <option > -- select an option -- </option>
              {usersData.filter(user=> user.accountnumber!== fromAccountNumber).map((user) => (
                
              <option value={user.accountnumber}>{user.accountnumber}</option>
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

       
      
    </div>
  )
}

export default Transfer1
