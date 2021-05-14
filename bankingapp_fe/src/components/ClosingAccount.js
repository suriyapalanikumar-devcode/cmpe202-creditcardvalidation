import React from "react";
import Navbar from "../components/Navbar";
import {Segment} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import configData from "./config.json";
// import React, { useEffect } from "react";
import { Select } from 'antd';
import { Modal, Button } from 'antd';

const { Option } = Select;

const ClosingAccount = ({ onClosingAccount }) => {

    const [acc_id, setAccId] = useState('Please enter account number')
    const [aid, setaid] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleOk = () => {
        setIsModalVisible(false);
    };

    function error(text) {
        Modal.error({
          title: text,
         // content:text,
        });
    }

    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const del_user = () =>{
        const token = localStorage.getItem("token")
        if(token)
        {   
            fetch (configData.HOST_URL + '/accounts/accounts/accid/',
            {
              method: "post",
              headers: {
                'Authorization': `token ${token}`
              },
              
            })
        .then(res => res.json())
        .then(data=>{
            setaid(data)
        }
        )                   
        .catch(err => {
            error("AccountID couldn't be fetched. Please check with help Desk")
        });
    }
    else{
        error("You do not have permission. Please login back.")
    }
    }

    useEffect(()=>{
        const email_temp = [];

        const token = localStorage.getItem("token")
        if(token)
        {
        del_user()
        }
        else{
            error("You do not have permission. Please login back.")
        }
    },[]);

    const onChange_ddown = (value) => {
        setAccId(value)
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
        if(!acc_id) {
            alert("please enter Account Id")
        }
        else {
            // sending form data for post request
            const json_args = { account:acc_id };
            const token = localStorage.getItem("token")
            axios.post(configData.HOST_URL + `/accounts/accounts/${acc_id}/closeAccount/`, json_args, {headers:{'Authorization': `token ${token}`}})
            .then(res => {
                setIsModalVisible(true);       
                del_user()
                setAccId("Please enter account number")
                //setInitialBalance("")
                //onChange_ddown(aid[0])
            })
            .catch(err => {
                error("Account couldn't be closed. Please check with help Desk")
                
            });
            // Making post request to closing account api
                    


        }

    }

    return (    
        <div>
            <Navbar />
            <Segment className="container">

                <semantic_header><div className="form-head"><h1>Close Account</h1></div></semantic_header>
                           
                    <form className='closing-account' onSubmit={onSubmit}>

                        <div className='form-control'>
                            <label>Account ID</label>
                            <Select
                            showSearch
                            style={{ width: 550 }}
                            placeholder="Enter Account ID to delete"
                            optionFilterProp="children"
                            onChange={onChange_ddown}
                            value={acc_id}
                        >
                            {/* <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option> */}
                        <Option value="jack" disabled>Enter AccountID to Delete</Option>
                        {aid.map((option) => (
                               <Option value={option} key={option}>{option}</Option>
                        ))}
                        </Select>
                        </div>

                        <input type='submit' value="Close Account" className='btn btn-block'/>

                    </form>
            </Segment>

            <Modal title="Accounts closed" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Account has been closed successfully!!</p>
      </Modal>
                
        </div>
    )
}

export default ClosingAccount