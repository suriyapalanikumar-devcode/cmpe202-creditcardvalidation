import NewAccount1 from "./components/NewAccount1"
import Transfer1 from "./components/Transfer1"
import TransactionHistory1 from "./components/TransactionHistory1"
import { useState, useEffect } from "react";
import TransactionsTable from "./components/TransactionsTable"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RecurringPayments1 from "./components/RecurringPayments1"



function App() {

  //const [usersData, setUssersData] = useState([]);

  // const getAccNo = async () => {
  //   const res = await fetch("http://localhost:5001/userData");
  //   const data = await res.json();
  //   return data;
  // };

  const [usersData, setUsersData] = useState([]);
  const [paymentsData, setPaymentsData] = useState([]);

  //use effect madhe bracke madhe async lau shakat nahi mhnun const heun krto
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

//getting recurrin payments set up data to shw up
useEffect(() => {
  const getPaymentsData = async () => {
    const paymentsDataFromServer = await fetchPaymentsData();
    setPaymentsData(paymentsDataFromServer);
  };
  getPaymentsData();
}, []); 

//fetch users data
const fetchPaymentsData = async () => {
    const res = await fetch(" http://localhost:5004/setPayments");
    const data = await res.json();
    return data;
   };
  
  
// sending data for account to accont transfer
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

//sending data for setting up recurring payments
  
  const setUpPayments = async (payData) => {
    const res = await fetch('http://localhost:5004/setPayments',
      {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(payData)
      });
    
      const data = await res.json();
      setPaymentsData([...paymentsData, data]);
    
  }
//sending data for transacion history
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

  return (
    <div >
      <Router>
        
        <Switch>
          <div >
            <Route path="/transactionHistory" exact>
          <TransactionHistory1 onView={viewTransactions} getUserData={usersData}/>
            </Route>
            <Route path="/transfer" exact>
            <Transfer1 onTransfer={transfer} getUserData={usersData}/>
            </Route>
            <Route path="/transactionHistoryTable" exact>
            <TransactionsTable />
            </Route>
            <Route path="/recurringpayments" exact>
              
              <RecurringPayments1 onSetPayment={setUpPayments } getUserData={usersData} getPaymentsData={ paymentsData}/>
              </Route>
              </div>
            
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
