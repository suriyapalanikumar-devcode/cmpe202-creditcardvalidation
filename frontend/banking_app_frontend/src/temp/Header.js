import React from 'react'
import { Button, Menu, Icon } from 'semantic-ui-react'
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <Menu>
            {/* <Menu.Item>XYZ BANK</Menu.Item> */}

            <Menu.Item position="">
                <Button as={Link} to="/AddAccount" primary inverted icon>
                    <Icon name="add"></Icon>
                    Add New Account
                </Button>
            </Menu.Item>

            <Menu.Item>
                <Button as={Link} to="/CloseAccount" color="red" inverted icon>
                    <Icon name="close icon"></Icon>
                    Close Account
                </Button>
            </Menu.Item>

            <Menu.Item>
                <Button as={Link} to="/ManualRefund" color="green" inverted icon>
                    <Icon name="angle double up icon"></Icon>
                    Manual Refund
                </Button>
            </Menu.Item>
        </Menu>
    )
}

export default Header