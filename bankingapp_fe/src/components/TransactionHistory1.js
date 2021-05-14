import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import configData from "./config.json";
import TransactionsTable from "./TransactionsTable"
import { Grid, Segment } from "semantic-ui-react";
import {Modal} from 'antd';
import Navbar1 from "./Navbar1"
import { FaSortAmountDown } from "react-icons/fa";
function TransactionHistory1() {

  const [usersData, setUsersData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [respData, setRespData]=useState([]);

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
    const getUserData = async () => {
      const uDataFromServer = await fetchUsersData();
      setUsersData(uDataFromServer);
    };
    getUserData();
  }
  else{
    error("You do not have permission. Please login back.")
  }

  }, []); 
  const token = localStorage.getItem("token")
  //fetch users data
  const fetchUsersData = async () => {
    const res = await fetch(configData.HOST_URL + '/accounts/accounts/get/', { headers: { 'Authorization': `token ${token}` } });
      const data = await res.json();
      return data;
  };
  
  // const viewTransactions = async (viewTransactionsData) => {
  //   const res = await fetch(`http://localhost:8000/transactions/transactions/search/`, 
  //     {
  //       method: "POST",
  //       headers: {
  //         'Content-type': 'application/json',
  //         'Authorization': `token ${token}`
  //       },
  //       body: JSON.stringify(viewTransactionsData)
  //     })
  //     console.log(res.json)
  // }
  


  let isFromGreaterThanTo = false;
  if (fromDate && toDate) {
    isFromGreaterThanTo = fromDate > toDate;
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!accountNumber) {
      alert("Please enter Account Number")
    }
   else if (isFromGreaterThanTo) {
      setFromDate("");
      setToDate("");
      alert("To Date must be greater than From Date")
    } else {
      const viewTransactions={
        accountNumber: Number(accountNumber),
        txnType: transactionType,
        fromDate: fromDate,
        toDate: toDate,
      };
    
      const token = localStorage.getItem("token")
      axios.post(configData.HOST_URL + '/transactions/transactions/search/', viewTransactions, { headers: { 'Authorization': `token ${token}` } })
        .then(res => {
          setRespData(res.data)
       
          setVisible(true)
      setAccountNumber("");
      setTransactionType("");
      setFromDate("");
      setToDate("");  
      
        })       
    }
  };

  let minDate = moment().subtract({ years: 1.5 });
  let today = moment();

  return (
    <div>
    <Navbar1 />  
    <Segment className="container">
      <Grid centered>
       
          <semantic_header><div className="form-head"><h1>View Transaction History</h1></div></semantic_header>

          
            <form className="transHistory" onSubmit={onSubmit}>
              
            <div className='form-control'>
               
            <label style={{ marginLeft: "1%" }}>Select Account Number</label>
                <select  className="drop" style={{ marginLeft: "1%" }}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)} required >
                <option > -- select an option -- </option>
                  {usersData.map((user) => (
                    <option value={user.accountNumber}>
                      {user.accountNumber}
                    </option>
                  ))}
                </select>

       </div>
            
            
       <div className='form-control'>
                
                
                <label style={{ marginLeft: "1%" }}>Select Transaction Type</label>
                <select  className="drop"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)} style={{ marginLeft: "1%" }}
                >
                  <option > -- select an option -- </option>
                  <option value="">All</option>
                  <option value="CR">Credit</option>
                  <option value="DR">Debit</option>
                  <option value="CH">Cheque Deposits</option>
                  <option value="FE">Fees</option>
                  <option value="RF">Refunds</option>
                </select>

       </div>
            
        
            

              <div className="form-control">
                <label>From Date</label>
                <input style={{padding:"17px"}}
                  type="date"
                  name="fDate"
                  value={fromDate}
                  min={minDate.format("YYYY-MM-DD")}
                  max={today.format("YYYY-MM-DD")}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
              ></input>
              {console.log(fromDate)}
              
              </div>

              <div className="form-control">
                <label>To Date</label>
                <input style={{padding:"17px"}}
                  type="date"
                name="tDate"
                value={toDate}
                  min={minDate.format("YYYY-MM-DD")}
                  max={today.format("YYYY-MM-DD")}
                  onChange={(e) => setToDate(e.target.value)}
                  required
              ></input>
              {console.log(toDate)}
              </div>

              <input type="submit" value="View" className="btn btn-block" style={{ marginTop: "8%" }} />
          </form>
          </Grid>
            <br/>
            
      </Segment>
      <div className="containertranstable">
        {visible ? <TransactionsTable respData={respData}/> : null}
          </div>
      {isFromGreaterThanTo && (<div>
      {alert("To Date must be greater than From Date")}
      </div>)}
    </div>
  );
}

export default TransactionHistory1;
