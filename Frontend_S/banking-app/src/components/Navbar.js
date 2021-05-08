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
          <NavLink to="/transfer" activeStyle>
            Transfer Money
          </NavLink>
          
          <NavLink to="/recurringpayments" activeStyle>
            Set Recurring Payments
          </NavLink>
          <NavLink to="/transactionHistory" activeStyle>
            Tranaction History
          </NavLink>
          
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/logout"> Logout</NavBtnLink>
        </NavBtn>
      </Nav>
    </div>
  )
}

export default Navbar
