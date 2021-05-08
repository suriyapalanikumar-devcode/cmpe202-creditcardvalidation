import logo from './logo.svg';
// import './App.css';
// import React from 'react';
import SiderDemo from "./components/applayout";
// import Login from "./components/login";
// import Admin from "./components/admin";
// import Customer from "./components/customer";
// import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom" 
import routes from "./routes";
import Login1 from "./components/Login1";

import Admin1 from "./components/Admin1";
import Customer from "./components/Customer";
import Transfer1 from "./components/Transfer1"
import TransactionHistory1 from "./components/TransactionHistory1"

import TransactionsTable from "./components/TransactionsTable"

import RecurringPayments1 from "./components/RecurringPayments1"


class App extends React.Component {
  render() {
     return (
        <div>
            <Router>
              <Switch>
              {routes.map((route, index) => (
               <Route
                 key={index}
                 path={route.path}
                 exact
                 render={(props) => <route.component {...props} />}
               >
               </Route>
             ))}
             <Route path="/transactionHistory" exact>
             <TransactionHistory1 />
                </Route>
                <Route path="/transfer" exact>
                <Transfer1 />
                </Route>
                <Route path="/transactionHistoryTable" exact>
                <TransactionsTable />
                </Route>
                <Route path="/recurringpayments" exact>
                  
                  <RecurringPayments1 />
                </Route>
                  <Route exact path="/">
                     <Login1/>
                  </Route>
                  <Route path="/admin">
                     <Admin1 />
                  </Route>
                  <Route path="/customer">
                     <Customer />
                  </Route>
               </Switch>
            </Router>
        </div>
     );
  }
}

export default App;
