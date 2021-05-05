import React from 'react'
import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Bars} from "./NavbarElements"


const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavLink to="/admin">
          <h1 style={{fontSize:"2em", color:'#15cdfc'}}>Bank</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/AddingAccount" activeStyle>
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
