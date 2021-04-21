//Add a account for new user

import React from "react";
import Navbar from "../components/Navbar";
import {Segment} from 'semantic-ui-react';
import { useState } from 'react';



const ExistingAccount = ({ onAdd }) => {
    
    
    
    const [email, setEmail] = useState('')
    

    const onSubmit = (e) => {
        e.preventDefault()

        // Form Validation
        if(!email) {
            alert("please enter Email")
        }
        else {
          // sending form data for post request
          const user = {email:email};
        

          // Making post request to new account openning api
          const new_acc_res = fetch ('http://localhost:5000/posts',
          {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
          })

          // setting form to empty state
        
          setEmail("")
          
      }
    }


    return (
        <div>
            
            <Segment className="container">

                <semantic_header><div className="form-head"><h1>Add Another Account</h1></div></semantic_header>
                           
                    <form className='new-acc' onSubmit={onSubmit}>

                        

                        <div className='form-control'>
                            <label>Email</label>
                            <input
                            type="email"
                            placeholder='Email'
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        

                        <input type='submit' value="Open Account" className='btn btn-block'/>

                    </form>
            </Segment>
                
        </div>
    )
}

export default ExistingAccount
