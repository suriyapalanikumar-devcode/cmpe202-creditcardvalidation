import React from "react";
import { Grid, Segment} from 'semantic-ui-react';
import { useState } from 'react';
import Button from './Button';



const NewAccount = ({ onAdd }) => {
    
    
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [ssn, setSsn] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [re_password, setRePassword] = useState('')
    const [balance, setInitialBalance] = useState('')
    const [dropdown, setDropdown] = useState("savings")

    const onSubmit = (e) => {
        e.preventDefault()

        if(!fname) {
            alert("please add first name")
        }

        const user = {email:email, firstName:fname, lastName:lname, mobile:phone, password:password, rePassword:re_password, ssn:ssn};

        onAdd({ accountType:dropdown, user, balance:balance })

        setFname("")
        setLname("")
        setSsn("")
        setPhone("")
        setEmail("")
        setPassword("")
        setRePassword("")
        setInitialBalance("")
        setDropdown("savings")
    }


    return (
        <div>
           
            <Grid centered>

                <Grid.Column style={{ maxWidth : 550, marginTop: 20}}> 

                    <semantic_header><h1>Add New Account</h1></semantic_header>

                        <Segment>


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
                                    placeholder='Enter Your SSN'
                                    value = {ssn}
                                    onChange={(e) => setSsn(e.target.value)}
                                    />
                                </div>

                                <div className='form-control'>
                                    <label>Mobile Number</label>
                                    <input
                                    type="text"
                                    placeholder='EnterYour Mobile Number'
                                    value = {phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className='form-control'>
                                    <label>Email</label>
                                    <input
                                    type="email"
                                    placeholder='Enter Your Email'
                                    value = {email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className='form-control'>
                                    <label>Password</label>
                                    <input
                                    type="password"
                                    placeholder='Enter Your Password'
                                    value = {password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className='form-control'>
                                    <label>Re-Enter Password</label>
                                    <input
                                    type="password"
                                    placeholder='Re-Enter Your Password'
                                    value = {re_password}
                                    onChange={(e) => setRePassword(e.target.value)}
                                    />
                                </div>

                                <div className='form-control'>
                                    <label>Initial Balance</label>
                                    <input
                                    type="balance"
                                    placeholder='Enter Initial Balance'
                                    value = {balance}
                                    onChange={(e) => setInitialBalance(e.target.value)}
                                    />
                                </div>

                                <div className='form-control form-control-check'>

                                    <label>Select Account Type</label>
                                    <select
                                    value = {dropdown}
                                    onChange={(e) => setDropdown(e.target.value)} 
                                    >
                                    <option value = "savings">Savings</option>
                                    <option value = "checking">Checking</option>
                                    </select>

                                </div>

                                <input type='submit' value="Submit" className='btn btn-block'/>

                            </form>
                        </Segment>

                </Grid.Column>

            </Grid>
                
        </div>
    )
}

export default NewAccount
