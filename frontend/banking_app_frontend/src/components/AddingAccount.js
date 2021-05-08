import React, {useState} from 'react'
import NewAccount from './NewAccount'
import Navbar from './Navbar'
import ExistingAccount from './ExistingAccount'
import Button from './Button'

function AddingAccount() {

  const [newCust, setNewCust] = useState(true)
  const fun = ()=>
    setNewCust(!newCust)

  return (
    <div>
    <div >
      <Navbar />
      </div>
    <div style={{marginLeft:"73%", marginBottom:"-5.74%"}}>
      <Button
        text={newCust ? 'Existing Customer' : 'New Customer'}
        onClick={ fun}/>
      </div>
      <div>
      { newCust ? <NewAccount /> : <ExistingAccount />}
      </div>   
      </div>
  )
}

export default AddingAccount
