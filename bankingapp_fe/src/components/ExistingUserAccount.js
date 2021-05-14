//Add a account for existing user

import React, { useEffect } from "react";
import {Segment} from 'semantic-ui-react';
import { useState } from 'react';
import { Select } from 'antd';
import axios from 'axios';
import configData from "./config.json";
import { Modal, Button } from 'antd';

const { Option } = Select;

const NewAccount = ({ onAdd }) => {


    function error(text) {
        Modal.error({
          title: 'This is an error message',
          content:text,
        });
    }

    const validation = (bal1) =>  {
        if(isNaN(bal1))
        {
            error("Balance Shouldn't have alphanumeric value")
            return false
        }
        return true;

    }
    
    const [email, setEmail] = useState('Please enter EmailID')
    const [balance, setInitialBalance] = useState('')
    const [dropdown, setDropdown] = useState("savings")
    const [uniqueUsers, setUniqueUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(()=>{
        const email_temp = [];
        const token = localStorage.getItem("token")
        axios.get(configData.HOST_URL + '/users/users', {headers:{'Authorization': `token ${token}`}})
        .then(res => {
            console.log(res)
            res.data.users.forEach(element => {
            email_temp.push(element["email"])
            });  
            setUniqueUsers(email_temp);
        })
        .catch(err => {
            error("User Details couldn't be fetched. Please check with help Desk")     
        });
    },[]);

    const onChange_ddown = (value) => {
        //console.log(`selected ${value}`);
        setEmail(value)
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
            const b = validation( balance)
            if(b)
            {
            const user = {email:email, first_name:null, last_name:null, mobile:null, password:null, ssn:null};
            const json_args = { accountType:dropdown, user:user, balance:balance };
            const token = localStorage.getItem("token")
            // Making post request to new account openning api
            axios.post(configData.HOST_URL + '/accounts/accounts/openAccount/', json_args, {headers:{'Authorization': `token ${token}`}})
            .then(res => {
                setIsModalVisible(true);
                // setting form to empty state
                setEmail("Please Enter EmailID")
                setInitialBalance("")
                setDropdown("savings")
                //onChange_ddown(uniqueUsers[0])
            })
            .catch(err => {
                error("Account couldn't be created. Please check with help Desk")
                
            });
            }
            else{
                console.log("Something wrong")
            }


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
                            value = {email}
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
            <Modal title="Accounts added" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Additional account created successfully!!</p>
      </Modal>
                
        </div>
    )
}

export default NewAccount
