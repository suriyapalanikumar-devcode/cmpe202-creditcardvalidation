import React from "react";
import Navbar from "../components/Navbar";
import {Segment} from 'semantic-ui-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'antd';
import { Select } from 'antd';

const { Option } = Select;

const ManualRefund = ({ onManTransfer }) => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [acc_id, setAccId] = useState('Please Enter Account Number')
    const [amt, setAmt] = useState('')
    const [dropdown, setDropdown] = useState('check')
    const [aid, setaid] = useState([])

    function error(text) {
        Modal.error({
          title: text,
         // content:text,
        });
    }

    const validation = (bal1) =>  {
        if(isNaN(bal1))
        {
            error("Amount Shouldn't have alphanumeric value")
            return false
        }
        return true;

    }

    const handleOk = () => {
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const del_user = () =>{
        const token = localStorage.getItem("token")
        if(token)
        {
            fetch ('http://localhost:8000/accounts/accounts/accid/',
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
        console.log(err)        
        });
        }
        else{
            error("You do not have permission. Please login back.")
        }

    }

    useEffect(()=>{
        const email_temp = [];
        const token = localStorage.getItem("token")
        del_user()
        
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
        else if(!amt) {
            alert("please enter a valid amount")
        }
        else {
            const b = validation(amt)
            if(b)
            {
            // sending form data for post request
            const json_args = { txnType:dropdown, txnDesc:"manual refund",amount:amt, account:acc_id };
            const token = localStorage.getItem("token")
            if(token)
            {
            // Making post request to manual transfer api
            axios.post(`http://localhost:8000/transactions/transactions/add/`, json_args, {headers:{'Authorization': `token ${token}`}})
            .then(res => {
                setIsModalVisible(true);
                // setting form to empty
                setAccId("Please enter Account Number")
                setAmt("")
                setDropdown("check")
            })
            .catch(err => {
                error("Insufficient Funds")
            })
            }
            else{
                error("You do not have permission. Please login back.")
            }

        }
        else{
            console.log("something wrong")
        }

        }

    }


    return (
        <div>
            <Navbar />
            <Segment className="container">

                <semantic_header><div className="form-head"><h1>Manual Refund</h1></div></semantic_header>
                           
                    <form className='mal-refund' onSubmit={onSubmit}>

                        <div className='form-control'>
                            <label>Account ID</label>
                            {/* <input
                            type="text"
                            placeholder='Enter Account Id'
                            value = {acc_id}
                            onChange={(e) => setAccId(e.target.value)}
                            /> */}
                        <Select
                            showSearch
                            style={{ width: 550 }}
                            placeholder="Enter Account ID to refund"
                            optionFilterProp="children"
                            onChange={onChange_ddown}
                            value = {acc_id}
                        >
                            {/* <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="tom">Tom</Option> */}
                        <Option value="jack" disabled>Enter AccountID to refund</Option>
                        {aid.map((option) => (
                               <Option value={option} key={option}>{option}</Option>
                        ))}
                        </Select>
                        </div>

                        <div className='form-control'>
                            <label>Amount</label>
                            <input
                            type="text"
                            placeholder='Enter Amount'
                            value = {amt}
                            onChange={(e) => setAmt(e.target.value)}
                            />
    
                        </div>

                        <div className='form-control form-control-check'>

                            <label>Select Transaction Type</label>
                            <select className="drop"
                            value = {dropdown}
                            onChange={(e) => setDropdown(e.target.value)} 
                            >
                            <option value = "check">Check</option>
                            <option value = "refund">Refund</option>
                            <option value = "fee">Fee</option>
                            </select>

                        </div>

                        <input type='submit' value="Refund" className='btn btn-block'/>

                    </form>
            </Segment>
            <Modal title="Transaction Initiated" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <p>Manual Refund has been processed successfully</p>
      </Modal>
                
        </div>
    )
}

export default ManualRefund