import React from 'react'
import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Bars} from "./NavbarElements"


const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavLink to="/">
          <h1>Bank</h1>        
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/AddAccount" activeStyle>
            Add New Account
          </NavLink>
          
          <NavLink to="/CloseAccount" activeStyle>
            Close Account
          </NavLink>
          <NavLink to="/ManualRefund" activeStyle>
            Manual Refund
          </NavLink>
          
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/"> Logout</NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  )
}

export default Navbar
