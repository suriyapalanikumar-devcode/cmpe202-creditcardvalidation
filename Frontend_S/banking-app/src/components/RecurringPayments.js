import React from 'react'
import { useState } from 'react';
import moment from "moment";
import { Grid, Segment} from 'semantic-ui-react';    
import ExistingPayments from './ExistingPayments';

function RecurringPayments({onSetPayment, getUserData, getPaymentsData}) {

  
    const [fromAccountNumber, setFromAccountNumber] = useState("")
    const [payeeName, setPayeeName] = useState("")
    const [amount, setAmount] = useState("")
    const [paymentTitle, setPaymentTitle] = useState("")
    const [paymentDate, setPaymentDate] = useState("")
    const [frequency, setFrequency] = useState("")


    
  let maxDate = moment().add({ years: .5 });
  let today = moment();
  
    const onSubmit = (e) => {
      e.preventDefault()

      if (!paymentTitle) {
        alert("Please enter payment title")
      }
      else if (!fromAccountNumber) {
        alert("Please enter From Account")
      }
      else if (!payeeName) {
        alert("Please enter Payee Name")
      }
      else if (!amount) {
        alert("Please enter Amount")
      }
      else if (!frequency) {
        alert("Please enter Frequency of Payment")
      }
      else if (!paymentDate) {
        alert("Please enter Payment Date")
      } else {
        

      
     
        onSetPayment({ fromAccountNumber: fromAccountNumber, payeeName: payeeName, paymentTitle: paymentTitle, paymentDate: paymentDate, amount: amount, frequency: frequency })

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
      <Grid centered>

        <Grid.Column style={{ maxWidth : 550, marginTop: 20}}> 

          <semantic_header><h1>Set Recurring Payment</h1></semantic_header>

            <Segment>
            <form className='transfer' onSubmit={onSubmit}>
            <div className='form-control'>
            <label>Payment Title</label>
            <input
            type="text"
            placeholder='Title'
            value = {paymentTitle}
            onChange={(e) => setPaymentTitle(e.target.value)}/>
              </div>
              
                <div className='form-control' style={{ marginTop: -15}}>
                  <div style={ {display:"inline-block", margin:"10px"}}>
                    <label style={{ marginLeft: -10}}>From Account </label>
                    <select className="drop" style={{ marginLeft: -5 }} 
                      value = {fromAccountNumber}
                      onChange={(e) => setFromAccountNumber(e.target.value)} >
                      <option > -- select an option -- </option>
                      {getUserData.map((user) => (
                        
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
                  onChange={(e) => setPayeeName(e.target.value)}/>
              </div>
                <div className='form-control' style={{ marginTop: -10}}>
                  <label>Amount</label>
                  <input
                  type="number"
                  placeholder='Amount'
                  value = {amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"/>
              </div>
              <div className='form-control' style={{ marginTop: -13}}>
                  <div style={ {display:"inline-block", margin:"10px"}}>
                  <label style={{ marginLeft: -10 }}>Payment Frequency</label>
                  <select className="drop" style={{ marginLeft: -5 }} 
                      value = {frequency}
                      onChange={(e) => setFrequency(e.target.value)} >
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
                ></input>
              </div>
                
                <input type='submit' value="Set Payment" className='btn btn-block'/>
              </form>
            </Segment>

        </Grid.Column>

      </Grid>


      {getPaymentsData.length > 0 ? (
        <div className="form-control">
          <br></br>
          <semantic_header><h1 style={{ paddingLeft: "50px" }} >Future Payments</h1></semantic_header>
          <ExistingPayments getPaymentsData={getPaymentsData} />
          </div>  
      ) : (
          <div >
            <br></br>
            
            <semantic_header><h1 style={{ paddingLeft: "50px" }} >No Payments set up</h1></semantic_header>
            
            <br></br>sdff
            fsfsf
            ffs
            <br></br>sdff
            fsfsf
            ffs
            <br></br>sdff
            fsfsf
            ffs
            <br></br>sdff
            fsfsf
            ffs
        </div>    
      )}
      
    </div>
  )
}

export default RecurringPayments
