//Add a account for new user

import React from "react";
import {Segment} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, InputNumber } from 'antd';



const NewAccount = ({ onAdd }) => {
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [ssn, setSsn] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [re_password, setRePassword] = useState('')
    const [balance, setInitialBalance] = useState('')
    const [dropdown, setDropdown] = useState("savings")

    function error(text) {
        Modal.error({
          title: text,
          
        });
      }

      useEffect(()=>{
        const token = localStorage.getItem("token")
        if(token)
        {
            console.log("success")
        }
        else{
            error("You do not have permission. Please login back.")
        }
    },[]);

    const validation = (ssn1, phone1, email1,bal1) =>  {
        //SSN Validation
        console.log(bal1)
        console.log(!parseInt(bal1))
        const numb = ssn1.match(/\d/g).join("")
        const len_num = numb.length
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const email_valid = re.test(String(email1).toLowerCase())
        const numb1 = phone1.match(/\d/g).join("")
        const len_num1 = numb1.length
        if(len_num1 != 10 || isNaN(phone1))   
        {
           error("Phone number Validation is wrong")
           return false
        }
        if(len_num != 9 || isNaN(ssn1) )
        {
            error("SSN Validation is wrong")
            return false
        }
        if( !email_valid)
        {
            error("Email Validation is wrong")
            return false
        }
        if(isNaN(bal1))
        {
            error("Balance Shouldn't have alphanumeric value")
            return false
        }
        return true;

    }

    const checkssn = (e) =>{

        setSsn(e.target.value)
    } 
    
    const handleOk = () => {
    setIsModalVisible(false);
    };

    const handleCancel = () => {
    setIsModalVisible(false);
    };

    const onSubmit = (e) => {
        e.preventDefault() 

        // Form Validation
        if(!fname) {
            alert("please enter first name")
        }
        else if(!lname) {
            alert("please enter last name")
        } 
        else if(!ssn) {
            alert("please enter ssn")
        }
        else if(!phone) {
            alert("please enter Mobile Number")
        }
        else if(!email) {
            alert("please enter Email")
        }
        else if(!password) {
            alert("please enter Password")
        }
        else if(!re_password) {
            alert("please re-enter  Password")
        }
        else if(password !== re_password) {
            alert("Passwords does not match")
        }
        else if(!balance) {
            alert("please enter opening balance")
        }
        else {
            const b = validation(ssn, phone, email, balance)
            if(b)
            {
            // sending form data for post request
            const user = {email:email, first_name:fname, last_name:lname, mobile:phone, password:password, ssn:ssn};
            const json_args = { accountType:dropdown, user, balance:balance };
            const token = localStorage.getItem("token")
            if(token)
            {
                axios.post(`http://localhost:8000/accounts/accounts/openAccount/`, json_args, {headers:{'Authorization': `token ${token}`}})
                .then(res => {
                    setIsModalVisible(true);
                    setFname("")
                    setLname("")
                    setSsn("")
                    setPhone("")
                    setEmail("")
                    setPassword("")
                    setRePassword("")
                    setInitialBalance("")
                    setDropdown("savings")
                })
                .catch(err => {
                    error("New Account Couldn't be created. Please check with Help Desk")
                    
                });
            }
            else{
                error("You do not have permission. Please login back.")
            }

        }
        else{
            console.log("Something is wrong in validation")
            
        }


            // Making post request to new account openning api
            // const new_acc_res = fetch ('http://localhost:8000/accounts/accounts/openAccount/',
            // {
            //   method: "POST",
            //   headers: {
            //     'Content-type': 'application/json'
            //   },
            //   body: JSON.stringify(json_args)
            // })

            // // setting form to empty state
            // setFname("")
            // setLname("")
            // setSsn("")
            // setPhone("")
            // setEmail("")
            // setPassword("")
            // setRePassword("")
            // setInitialBalance("")
            // setDropdown("savings")
        }

    }


    return (
        <div>
            <Segment className="container">

                <semantic_header><div className="form-head"><h1>Add New Account</h1></div></semantic_header>
                           
                    <form className='new-acc' onSubmit={onSubmit}>

                        <div className='form-control'>
                            <label>First Name</label>
                            <input
                            type="text"
                            placeholder='First Name'
                            value = {fname}
                            onChange={(e) => setFname(e.target.value)}
                            />
                            </div>

                        <div className='form-control'>
                            <label>Last Name</label>
                            <input
                            type="text"
                            placeholder='Last Name'
                            value = {lname}
                            onChange={(e) => setLname(e.target.value)}
                            />
                        </div>

                        <div className='form-control'>
                            <label>SSN</label>
                            <input
                            type="text"
                            placeholder='Enter SSN'
                            value = {ssn}
                            onChange={checkssn}
                            />
                        </div>

                        <div className='form-control'>
                            <label>Mobile Number</label>
                            <input
                            type="text"
                            placeholder='Enter Mobile Number'
                            value = {phone}
                            onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        <div className='form-control'>
                            <label>Email</label>
                            <input
                            type="email"
                            placeholder='Enter  Email'
                            value = {email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='form-control'>
                            <label>Password</label>
                            <input
                            type="password"
                            placeholder='Enter  Password'
                            value = {password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='form-control'>
                            <label>Re-Enter Password</label>
                            <input
                            type="password"
                            placeholder='Re-Enter  Password'
                            value = {re_password}
                            onChange={(e) => setRePassword(e.target.value)}
                            />
                        </div>

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
                            <select className="drop"
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

        <Modal title="Details Added" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Account created successfully..!!</p>
      </Modal>

      <Modal title="Details Added" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Account created successfully..!!</p>
      </Modal>
                
        </div>
    )
}

export default NewAccount
