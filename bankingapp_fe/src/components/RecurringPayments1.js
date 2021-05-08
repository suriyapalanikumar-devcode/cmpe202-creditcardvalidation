import React from 'react'
import { useState, useEffect } from 'react';
import moment from "moment";
import { Grid, Segment} from 'semantic-ui-react';    
import ExistingPayments from './ExistingPayments';
import Navbar1 from "./Navbar1"
function RecurringPayments1() {

  
    const [fromAccountNumber, setFromAccountNumber] = useState("")
    const [payeeName, setPayeeName] = useState("")
    const [amount, setAmount] = useState("")
    const [paymentTitle, setPaymentTitle] = useState("")
    const [paymentDate, setPaymentDate] = useState("")
    const [frequency, setFrequency] = useState("")

    const [usersData, setUsersData] = useState([]);
    const [paymentsData, setPaymentsData] = useState([]);
  
    
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

    
  let maxDate = moment().add({ years: .5 });
  let today = moment();
  
    const onSubmit = (e) => {
      e.preventDefault()

      if (!fromAccountNumber) {
        alert("Please select From Account")
      }
      else if (!frequency) {
        alert("Please enter Frequency of Payment")
      }
      else if (!paymentDate) {
        alert("Please enter Payment Date")
      } else {
        

      
     
        setUpPayments({ fromAccountNumber: fromAccountNumber, payeeName: payeeName, paymentTitle: paymentTitle, paymentDate: paymentDate, amount: amount, frequency: frequency })

        setFromAccountNumber("")
        setPayeeName("")
        setAmount("")
        setPaymentTitle("")
        setPaymentDate("")
        setFrequency("")
      }
      
      
  }
  
  //const filterData = getUserData.filter(user => user.accountnumber !== toAccountNumber);

  return (
    <div>
    <Navbar1 />  
      <Segment className="container" style={{border:"none"}} >
        <Grid centered>
          <semantic_header><div className="form-head"><h1>Set Recurring Payment</h1></div></semantic_header>

            
            <form className='transfer' onSubmit={onSubmit}>
                <div className='form-control'>
            <label>Payment Title</label>
            <input
                type="text"
                placeholder='Title'
                value={paymentTitle}
                onChange={(e) => setPaymentTitle(e.target.value)} style={{border:"none"}} required/>
              </div>
              
                <div className='form-control' style={{ marginTop: -15}}>
                  <div style={ {display:"inline-block", margin:"10px"}}>
                    <label style={{ marginLeft: -10}}>From Account </label>
                    <select className="drop" style={{ marginLeft: -5 }} 
                      value = {fromAccountNumber}
                      onChange={(e) => setFromAccountNumber(e.target.value)} style={{border:"none"}} required>
                      <option > -- select an option -- </option>
                      {usersData.map((user) => (
                        
                      <option value={user.accountnumber}>{user.accountnumber}</option>
                    
                      )
                      )
                      }
                    </select>
      
                </div>
                </div>
                <div className='form-control' style={{ marginTop: -10}}>
                  <label>Payee name</label>
                  <input 
                  type="text"
                  placeholder='Payee name'
                  value = {payeeName}
                onChange={(e) => setPayeeName(e.target.value)}
                style={{border:"none"}} required/>
              </div>
                <div className='form-control' style={{ marginTop: -10}}>
                  <label>Amount</label>
                  <input
                  type="number"
                  placeholder='Amount'
                  value = {amount}
                  onChange={(e) => setAmount(e.target.value)}
                min="1"
                style={{border:"none"}} required/>
              </div>
                <div className='form-control' style={{ marginTop: -13}}>
                  <div style={ {display:"inline-block", margin:"10px"}}>
                  <label style={{ marginLeft: -10 }}>Payment Frequency</label>
                  <select className="drop" style={{ marginLeft: -5 }} 
                      value = {frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  style={{border:"none"}}>
                      <option disabled selected> -- select an option -- </option>
                      <option value="One Time">One time</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
      
                </div>
                </div>
                <div className="form-control" style={{ marginTop: -12}}>
                <label>Start on</label>
                <input
                  type="date"
                  name="pDate"
                  value={paymentDate}
                  min={today.format("YYYY-MM-DD")}
                  max={maxDate.format("YYYY-MM-DD")}
                  onChange={(e) => setPaymentDate(e.target.value)}
                required
                style={{border:"none"}}
                ></input>
              </div>
                
                <input type='submit' value="Set Payment" className='btn btn-block' style={{border:"none"}}/>
              </form>
           </Grid>
        </Segment>


      {paymentsData.length > 0 ? (
        <div className="form-control">
          <br></br>
          <semantic_header><h1 style={{ marginLeft:"43%"}}>Future Payments</h1></semantic_header>
          <ExistingPayments getPaymentsData={paymentsData} />
          </div>  
      ) : (
          <div >
            <br></br>
            
            <semantic_header><h1 style={{ paddingLeft: "50px" }} >No Payments set up</h1></semantic_header>
            
            
        </div>    
      )}
      
    </div>
  )
}

export default RecurringPayments1
