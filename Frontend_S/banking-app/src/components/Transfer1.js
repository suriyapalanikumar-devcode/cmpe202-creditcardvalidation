import React from 'react'
import { useState } from 'react';
import Navbar from "./Navbar"
import { Grid, Segment} from 'semantic-ui-react';    

function Transfer1({onTransfer, getUserData}) {

  
    const [fromAccountNumber, setFromAccountNumber] = useState("")
    const [toAccountNumber, setToAccountNumber] = useState("")
    const [amount, setAmount] = useState("")
    const [message, setMessage] = useState("")


    
    
  
  const onSubmit = (e) => {
    e.preventDefault()

    if (!fromAccountNumber) {
      alert("Please enter From Account")
    } else if (!toAccountNumber) {
      
      alert("Please enter To Account")
        
    } else if(!amount){
      alert("Please enter Amount")
    } else {

      
     
      onTransfer({ fromAccountNumber: fromAccountNumber, toAccountNumber: toAccountNumber, amount: amount, message: message })

      setFromAccountNumber("")
      setToAccountNumber("")
      setAmount("")
      setMessage("")
      
      
    }
  }
  
  const filterData = getUserData.filter(user => user.accountnumber !== toAccountNumber);

  return (
    <div>
    <Navbar />  
      <Segment className="container">
        <Grid centered>

        

          <semantic_header><div className="form-head"><h1>Transfer Money</h1></div></semantic_header>

           
              <form className='transfer' onSubmit={onSubmit}>
                <div className='form-control '>
               
                <label  >From Account </label>
                <select className="drop" style={{ marginLeft: "1%" }} 
                  value = {fromAccountNumber}
                  onChange={(e) => setFromAccountNumber(e.target.value)} >
                  <option > -- select an option -- </option>
                  {filterData.map((user) => (
                    
                  <option value={user.accountnumber}>{user.accountnumber}</option>
                   ))}
                </select>
  
           
                
                
            <div style={ {display:"inline-block", marginLeft:"150px"}}>
            <label style={{ marginLeft: -10}}>To Account </label>
            <select className="drop" style={{ marginLeft: -5 }} 
              value = {toAccountNumber}
              onChange={(e) => setToAccountNumber(e.target.value)} >
              <option > -- select an option -- </option>
              {getUserData.filter(user=> user.accountnumber!== fromAccountNumber).map((user) => (
                
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
                  onChange={(e) => setAmount(e.target.value)} min="1"/>
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
