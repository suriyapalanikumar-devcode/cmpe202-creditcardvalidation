import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'


export const Nav = styled.nav`
background: #000000;
height: 80px;
display:flex;
justify-content: space-between;
padding:0.5rem calc((1--vw-1000px)/2);
z-index:10;
`

export const NavLink = styled(Link)`
color:#ffffff;
display:flex;
align-items:center;
text-decoration:none;
padding:0 1rem;
height:100%auto;
cursor:pointer;

&.active{
  color:#15cdfc
  }

`
;