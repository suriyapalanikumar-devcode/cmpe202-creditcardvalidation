// page that dynamically display two different forms for new and existing customers.

import React, {useState} from 'react'
import NewAccount from './NewAccount'
import ExistingUserAccount from './ExistingUserAccount'
import Navbar from './Navbar'
import Button from './Button'
import axios from 'axios';

function AddingAccount() {

  const [newCust, setNewCust] = useState(true)
  const [uniqueusers, setUniqueUsers] = useState([])
  const fun = ()=>
  {
    const email = [];
    setNewCust(!newCust)
  }

  return (
    <div>
        <div >
            <Navbar />
                </div>
                    <div style={{marginLeft:"73%", marginBottom:"2%"}}>
                    <Button
                        text={newCust ? 'Existing Customer' : 'New Customer'}
                        onClick={ fun}/>
                    </div>
                <div>
                <div>
                    { newCust ? <NewAccount /> : <ExistingUserAccount />}
                </div>
        </div>   
    </div>
  )
}

export default AddingAccount