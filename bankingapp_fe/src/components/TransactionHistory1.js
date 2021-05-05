import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
import TransactionsTable from "./TransactionsTable"
import { Grid, Segment } from "semantic-ui-react";
import Navbar1 from "./Navbar1"
function TransactionHistory() {

  const [usersData, setUsersData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
  
  const viewTransactions = async (viewTransactionsData) => {
    const res = await fetch('http://localhost:5002/viewTransactionsData',
      {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(viewTransactionsData)
      })
  }


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
      viewTransactions({
        accNo: accountNumber,
        transType: transactionType,
        fromDate: fromDate,
        toDate: toDate,
      });
      setVisible(true)
      setAccountNumber("");
      setTransactionType("");
      setFromDate("");
      setToDate("");    
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
               
            <label>Select Account Number</label>
                <select  className="drop" style={{ marginLeft: "1%" }}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)} required >
                <option > -- select an option -- </option>
                  {usersData.map((user) => (
                    <option value={user.accountnumber}>
                      {user.accountnumber}
                    </option>
                  ))}
                </select>

       
            
            
        <div style={ {display:"inline-block", marginLeft:"150px"}}>
                
                
                <label style={{ marginLeft: -10 }}>Select Transaction Type</label>
                <select  className="drop"
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                <option > -- select an option -- </option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                  <option value="Cheque_deposit">Cheque Deposit</option>
                </select>

       </div>
            
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
              
              </div>

              <div className="form-control">
                <label>To Date</label>
                <input style={{padding:"17px"}}
                  type="date"
                  name="tDate"
                  min={minDate.format("YYYY-MM-DD")}
                  max={today.format("YYYY-MM-DD")}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                ></input>
              </div>

              <input type="submit" value="View" className="btn btn-block" style={{ marginTop: "8%" }} />
          </form>
          </Grid>
            <br/>
            
      </Segment>
      <div style={{marginLeft:"30%"}}>
          {visible ? <TransactionsTable /> : null}
          </div>
      {isFromGreaterThanTo && (<div>
      {alert("To Date must be greater than From Date")}
      </div>)}
    </div>
  );
}

export default TransactionHistory;
