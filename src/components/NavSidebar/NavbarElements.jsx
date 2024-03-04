import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
  
export const Nav = styled.nav`
  background: white;
  height: 100vh;
  display: block;
  padding: 1.25rem 0.75rem;
  z-index: 12;
  border-right: 1px solid #eaedf1;
  /* Third Nav */
  /* justify-content: flex-start; */
  @media screen and (max-width: 768px){
    padding: 1rem 0.5rem;
    border-right: none;
  }
 
`;
  
export const NavLink = styled(Link)`
  color: white;
  display: flex;
  gap: 8px;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  width: 180px;
  padding: 12px 20px;
  height: 45px;
  border-radius: 10px;
  background: #1a98ecbd;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  margin-bottom: 10px;
  &.active {
    box-shadow: inset 1px 2px 5px #5b5b5b;
    transform: translateY(1px);
    background: #3399FF;
    color: black;
    // background: #3399FF;
    // box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
  
  &:hover {
    transition: all 0.5s ease-in-out;
    color: black;
    transform: scale(1.03);
    // transition-duration: 1s;
    // background: #3591cfbd;
  }
  
  @media screen and (max-width: 885px){
    padding: 12px 17px;
    width: 165px;
    font-size: 15px;
  }
  @media screen and (max-width: 768px){
    padding: 9px 17px;
    width: 50px;
  }
  @media screen and (max-width: 639px){
    padding: 2px 8px;
    width: 30px;
    height: 32px;
  }
  
`;
  
export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  // @media screen and (max-width: 768px) {
  //   display: block;
  //   position: absolute;
  //   top: 0;
  //   right: 0;
  //   transform: translate(-100%, 75%);
  //   font-size: 1.8rem;
  //   cursor: pointer;
  // }
`;
  
export const NavMenu = styled.div`
  display: block;
  align-items: center;
//   margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
  
export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: block;
  }
`;
  
export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
`;
