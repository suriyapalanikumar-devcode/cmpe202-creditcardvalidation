import React from "react";
import Navbar from "../components/Navbar";
import {Segment} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// import React, { useEffect } from "react";

const ClosingAccount = ({ onClosingAccount }) => {

    const [acc_id, setAccId] = useState('')

    useEffect(()=>{
        const email_temp = [];
        const token = localStorage.getItem("token")
        fetch ('http://localhost:8000/accounts/accounts/accid_fetch',
            {
              method: "get",
              headers: {
                'Authorization': `token ${token}`
              },
              
            })
        .then(res => {
            console.log(res)
        })                   
        .catch(err => {
        console.log(err)        
        });
    },[]);

    const onSubmit = (e) => {
        e.preventDefault()

        // Form Validation
        if(!acc_id) {
            alert("please enter Account Id")
        }
        else {
            // sending form data for post request
            const json_args = { account:acc_id };

            // Making post request to closing account api
            const close_acc_res = fetch ('http://localhost:5000/posts',
            {
              method: "POST",
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(json_args)
            })                        

            // setting form to empty
            setAccId("")
        }

    }

    return (    
        <div>
            <Navbar />
            <Segment className="container">

                <semantic_header><div className="form-head"><h1>Close Account</h1></div></semantic_header>
                           
                    <form className='closing-account' onSubmit={onSubmit}>

                        <div className='form-control'>
                            <label>Account Id</label>
                            <input
                            type="text"
                            placeholder='Enter Account Id'
                            value = {acc_id}
                            onChange={(e) => setAccId(e.target.value)}
                            />
                        </div>

                        <input type='submit' value="Close Account" className='btn btn-block'/>

                    </form>
            </Segment>
                
        </div>
    )
}

export default ClosingAccount