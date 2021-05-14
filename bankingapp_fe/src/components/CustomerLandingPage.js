import React from 'react'
import axios from "axios";
import { Grid, Segment} from 'semantic-ui-react';    
import { useState, useEffect } from "react";
import {Modal} from 'antd';
function CustomerLandingPage() {

    const [usersData, setUsersData] = useState([]);
    const [accountNumber, setAccountNumber] = useState("")

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
    else
    {
      error("You do not have permission. Please login back.")
    }
    
    
  }, [])
  
  const getData = async () => {
    try {
      
      const token = localStorage.getItem("token")
      const result = await axios.get(`http://localhost:8000/accounts/accounts/get/`, { headers: { 'Authorization': `token ${token}` } })
      console.log("result", result)
      setUsersData(result.data)
  } catch (error) {
      console.log(error)
    }
  }
   
  var first = usersData[0]
  
  return (
    <div>
      
      <Segment className="containerlandingcust">
        <Grid centered>


          <semantic_header><div className="form-head"><h1>Welcome{` ${first && first.user.first_name}`}
           </h1></div></semantic_header>

           


          {usersData.length > 1 ? (
            <div className='form-control '>
               
                <h2 style={{ marginBottom: "1%"}} >Select Account </h2>
                <select className="drop" style={{ marginLeft: "-3%" , marginBottom: "5%",marginTop:"-2%", fontSize:"1rem"}} 
                  value = {accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)} required>
                  <option > -- select account number -- </option>
                  {usersData.map((user) => (
                
                    <option value={user.accountNumber}>{user.accountNumber}</option>

                   ))}
              </select>

              <h2>Account Type</h2>
              {usersData.filter(user=> user.accountNumber == accountNumber).map((user) => (
                <h3 style={{marginTop:"-2%"}}>{user.accountType}</h3>
                 ))}

              <h2>Available Balance</h2>
                    {usersData.filter(user=> user.accountNumber == accountNumber).map((user) => (
                      <h3 style={{marginTop:"-2%"}}>${user.balance}</h3>
                       ))}
  
           
            </div>
          ) : (
              <div className='form-control'>
                <br></br>
              <h2>Account Number</h2>
              <h3 style={{marginTop:"-2%"}}>{` ${first && first.accountNumber}`}</h3>
                <h2 style={{marginTop:"4%"}}>Available Balance</h2>
                <h3 style={{marginTop:"-2%"}}>${` ${first && first.balance}`}</h3>
                   
            
          </div>  
          )}

          </Grid>
        </Segment>

       
      
    </div>
  )
}

export default CustomerLandingPage
