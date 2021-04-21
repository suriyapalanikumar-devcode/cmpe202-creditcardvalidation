import React from "react";
import Navbar from "../components/Navbar";
import {Segment} from 'semantic-ui-react';
import { useState } from 'react';

const ManualRefund = ({ onManTransfer }) => {

    const [acc_id, setAccId] = useState('')
    const [amt, setAmt] = useState('')
    const [dropdown, setDropdown] = useState('check')

    const onSubmit = (e) => {
        e.preventDefault()

        // Form Validation
        if(!acc_id) {
            alert("please enter Account Id")
        }
        else if(!amt) {
            alert("please enter a valid ammount")
        }
        else {
            // sending form data for post request
            const json_args = { txn_type:dropdown, amt:amt, account:acc_id };
            
            // Making post request to manual transfer api
            const man_trans_res = fetch ('http://localhost:5000/posts',
            {
              method: "POST",
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(json_args)
            })

            // setting form to empty
            setAccId("")
            setAmt("")
            setDropdown("check")
        }

    }


    return (
        <div>
            <Navbar />
            <Segment className="container">

                <semantic_header><div className="form-head"><h1>Manual Refund</h1></div></semantic_header>
                           
                    <form className='mal-refund' onSubmit={onSubmit}>

                        <div className='form-control'>
                            <label>Account Id</label>
                            <input
                            type="text"
                            placeholder='Enter Account Id'
                            value = {acc_id}
                            onChange={(e) => setAccId(e.target.value)}
                            />
                        </div>

                        <div className='form-control'>
                            <label>Ammount</label>
                            <input
                            type="text"
                            placeholder='Enter Ammount'
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
                
        </div>
    )
}

export default ManualRefund