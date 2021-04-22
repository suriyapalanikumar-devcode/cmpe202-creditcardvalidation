import React from "react";
import { useState } from "react";
import moment from "moment";
import TransactionsTable from "./TransactionsTable"
import { Grid, Segment } from "semantic-ui-react";
import Navbar from "./Navbar"
function TransactionHistory({ onView, getUserData }) {

  const [visible, setVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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
      onView({
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
    <Navbar />  
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
                  {getUserData.map((user) => (
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
