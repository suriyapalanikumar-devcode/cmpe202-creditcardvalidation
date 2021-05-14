import React from 'react';
import "antd/dist/antd.css";
import {Grid, Segment} from 'semantic-ui-react';
import background from "../assets/login_bg.jpg";
import { Card, Col, Row, Form, Input, Button, Checkbox, Alert } from 'antd';
//import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useHistory, withRouter } from "react-router-dom";
import NavbarLogin from './NavbarLogin'
import Admin1 from "./Admin1";
import configData from "./config.json";



const onFinish = (values) => {
console.log('Success:', values);
};


const onFinishFailed = (errorInfo) => {
console.log('Failed:', errorInfo);
};

const val = ""

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            "username":'',
            "password":'',
            "router":'',
            'display': true
        }
    }


    handleSubmit = (event) =>{
        //let history = useHistory();
        axios.post(configData.HOST_URL + '/users/login', { "email":event["username"], "password":event["password"] })
            .then(res => {
                localStorage.setItem('token',res.data.access)
                if(res.data.authenticatedUser.role=="ADMIN")
                {
                    this.props.history.push("/admin")
                }
                else{
                    this.props.history.push("/customer")
                }

            })
            .catch(err => {
                this.setState({
                    "display":false
                })
                
            });
    }

    render(){
        return(
            <div >
            {localStorage.clear()}    
           <NavbarLogin/>
            <Segment className="containerLogin" style={{marginTop:"10%"}}>
            <Grid centered>
                <semantic_header><div className="form-head" style={{fontFamily:"Poppins"}}><h1>Login</h1></div></semantic_header>
                   
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish = {this.handleSubmit}
                            > 
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item >
                                <Button style={{backgroundColor:"black", borderRadius:"5px", display:"block", width:"100%", fontFamily:"Poppins", border:"none", marginTop:"4%"}} type="primary" htmlType="submit" >
                                Sign In
                                </Button>
                            </Form.Item>
                            <Form.Item style={{display:this.state.display?'none':'block'}}>
                                <Alert
                                message="Invalid Username or Password"
                                type="error"
                                showIcon
                                />
                            </Form.Item>
                            </Form>
                        
              </Grid>
              </Segment>
                
            </div>
        );
    }
}


export default withRouter(Login);