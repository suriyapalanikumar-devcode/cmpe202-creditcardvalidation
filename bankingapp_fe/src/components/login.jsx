import React from 'react';
import "antd/dist/antd.css";
import background from "../assets/login_bg.jpg";
import { Card, Col, Row, Form, Input, Button, Checkbox } from 'antd';
//import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from 'axios';

const set_background = {
    backgroundImage: `url(${background})`,
    height : "95vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


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
            "router":''
        }
    }

    handleSubmit = (event) =>{
        
        axios.post(`http://localhost:8000/api/auth/login`, { "email":event["username"], "password":event["password"] })
            .then(res => {
                localStorage.setItem('token',res.data.access)
                console.log(localStorage.getItem('token'))
        })
    }




    render(){
        return(
            <div style={set_background}>
                <div style={{height:"90vh"}}>
                    <Row gutter={16} >
                        <Col span={8}></Col>
                        <Col span={8}>
                        <Card title="Log In" bordered={false} style={{marginTop:"25vh"}}> 
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
                                <Button type="primary" htmlType="submit" >
                                Sign In
                                </Button>
                            </Form.Item>
                            </Form>
                        
                        </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


export default Login;