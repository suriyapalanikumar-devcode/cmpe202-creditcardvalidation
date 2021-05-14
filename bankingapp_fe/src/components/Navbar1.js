import React from 'react'
import {Nav, NavLink, NavMenu, NavBtn, NavBtnLink, Bars} from "./NavbarElements"


const Navbar = () => {
  return (
    <div>
      <Nav>
        <NavLink to="/customer">
          <h1 style={{fontSize:"2em", color:'#15cdfc'}}>Bank</h1>        
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
            Transactions History
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
