import React from "react";
import { useState } from "react";
import moment from "moment";
import TransactionsTable from "./TransactionsTable"
import { Grid, Segment } from "semantic-ui-react";

function TransactionHistory({ onView, getUserData }) {


  // React.state = {
  //   visible: true
  // };
  

  const [visible, setVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [transactionType, setTransactionType] = useState("Credit");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  let isFromGreaterThanTo = false;
  if (fromDate && toDate) {
    isFromGreaterThanTo = fromDate > toDate;
  }
  
  const onSubmit = (e) => {
    e.preventDefault();

    
    if (isFromGreaterThanTo) {
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
      setTransactionType("Credit");
      setFromDate("");
      setToDate("");
    
    }
  };

  let minDate = moment().subtract({ years: 1.5 });
  let today = moment();

  
  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
          <semantic_header>
            <h1>View Transaction History</h1>
          </semantic_header>

          <Segment>
            <form className="transHistory" onSubmit={onSubmit}>
              <div className="form-control form-control-check">
                <label>Select Account Number</label>
                <select
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)} required >
                <option > -- select an option -- </option>
                  {getUserData.map((user) => (
                    <option value={user.accountnumber}>
                      {user.accountnumber}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control form-control-check">
                <label>Select Transaction Type</label>
                <select
                  value={transactionType}
                  onChange={(e) => setTransactionType(e.target.value)}
                >
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </select>
              </div>

              <div className="form-control form-control-check">
                <label>From Date</label>
                <input
                  type="date"
                  name="fDate"
                  value={fromDate}
                  min={minDate.format("YYYY-MM-DD")}
                  max={today.format("YYYY-MM-DD")}
                  onChange={(e) => setFromDate(e.target.value)}
                  required
                ></input>
              </div>

              <div className="form-control form-control-check">
                <label>To Date</label>
                <input
                  type="date"
                  name="tDate"
                  min={minDate.format("YYYY-MM-DD")}
                  max={today.format("YYYY-MM-DD")}
                  onChange={(e) => setToDate(e.target.value)}
                  required
                ></input>
              </div>

              <input type="submit" value="View" className="btn btn-block" />
            </form>
            <br/>
            {visible ? <TransactionsTable /> : null}
          </Segment>
        </Grid.Column>
      </Grid>
      {isFromGreaterThanTo && (<div>
      {alert("To Date must be greater than From Date")}
      </div>)}
    </div>
  );
}

export default TransactionHistory;