//Add a account for existing user

import React, { useEffect } from "react";
import {Segment} from 'semantic-ui-react';
import { useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const NewAccount = ({ onAdd }) => {


    
    const [email, setEmail] = useState('')
    const [balance, setInitialBalance] = useState('')
    const [dropdown, setDropdown] = useState("savings")
    const [uniqueUsers, setUniqueUsers] = useState([]);


    useEffect(()=>{
        const email_temp = [];
        const token = localStorage.getItem("token")
        axios.get(`http://localhost:8000/users/users`, {headers:{'Authorization': `token ${token}`}})
        .then(res => {
            res.data.users.forEach(element => {
            email_temp.push(element["email"])
            });  
            setUniqueUsers(email_temp);
        })
        .catch(err => {
        console.log(err)        
        });
    },[]);

    const onChange_ddown = (value) => {
        console.log(`selected ${value}`);
      }
      
    const onBlur = (value) => {
        console.log('blur');
      }
      
    const onFocus = (value) => {
        console.log('focus');
      }
      


    const onSubmit = (e) => {
        e.preventDefault()

        // Form Validation
        if(!email) {
            alert("please enter Email")
        }
        else if(!balance) {
            alert("please enter opening balance")
        }
        else {
            // sending form data for post request
            const user = {email:email, firstName:"", lastName:"", mobile:"", password:"", ssn:""};
            const json_args = { accountType:dropdown, user, balance:balance };

            // Making post request to new account openning api
            const new_acc_res = fetch ('http://localhost:5000/posts',
            {
              method: "POST",
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(json_args)
            })

            // setting form to empty state
            setEmail("")
            setInitialBalance("")
            setDropdown("savings")
        }

    }


    return (
        <div>
            <Segment className="container">

                <semantic_header><div className="form-head"><h1>Add New Account</h1></div></semantic_header>
                           
                    <form className='new-acc' onSubmit={onSubmit}>
                    <label>Email</label>
                    <br/>
                        <Select
                            showSearch
                            style={{ width: 550 }}
                            placeholder="Enter customer's Email"
                            optionFilterProp="children"
                            onChange={onChange_ddown}
                        >
                            {/* <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option> */}
                        {uniqueUsers.map((option) => (
                               <Option value={option} key={option}>{option}</Option>
                        ))}
                        </Select>

                        {/* <div className='form-control'>
                            <label>Email</label>
                            <input
                            type="email"
                            placeholder='Enter Your Email'
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div> */}

                        <div className='form-control'>
                            <label>Initial Balance</label>
                            <input
                            type="text"
                            placeholder='Enter Initial Balance'
                            value = {balance}
                            onChange={(e) => setInitialBalance(e.target.value)}
                            />
                        </div>

                        <div className='form-control form-control-check'>

                            <label><h4>Select Account Type</h4></label>
                            <select
                            value = {dropdown}
                            onChange={(e) => setDropdown(e.target.value)} 
                            >
                            <option value = "savings">Savings</option>
                            <option value = "checking">Checking</option>
                            </select>

                        </div>

                        <input type='submit' value="Open Account" className='btn btn-block'/>

                    </form>
            </Segment>
                
        </div>
    )
}

export default NewAccount
