// import styled from "style-components";
import styled from "styled-components";
import { Link, NavLink, Route, Routes } from "react-router-dom";

const Container = styled.nav`
  display: flex;
  justify-content: center;
  justify-content: space-between;
  background-color: gray;
  height: 62px;
  padding: 10px;
  width: 800px;
  font-size: 1.5rem;
  ul {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    background-color: #6eb9f3;
  }
  .logo_container {
    text-decoration: none;
    font-weight: 700;
    font-size: 2.6rem;
  }
  .navigation_items {
    display: flex;
    gap: 40px;
    a {
      color: white;
      font-weight: 500;
      font-size: 1.6rem;
    }
  }
  /* a {
    margin: auto 0;
  } */
  .logo_container {
  }
  .hamburger {
    display: none;
    font-size: 20px;
    font-weight: 800;
    color: white;
  }
  @media (max-width: 768px) {
    .navigation_items {
    display: none;
  }
    .hamburger {
      display: flex;
      cursor: pointer;
    }
    .hamburger #closeHam {
      display: none;
    }
    .navigation-items {
      display: none;
      flex-direction: column;
      align-items: center;
      position: absolute;
      right: 0;
      top: 58px;
      background-color: rgb(73, 51, 153);
      width: 100%;
      height: calc(100vh - 58px);
      padding-top: 60px;
      gap: 10vh;
    }
  }
`;

function Navbar() {
  const clickHamburger = (open) => {
    alert ("click hamburger" + open )
    let openHam = document.querySelector("#openHam")
    let closeHam = document.querySelector("#closeHam")
    let navigationItems = document.querySelectorAll("#navigationItems")
    if(open){
      openHam.styled.display = "none";
      closeHam.styled.display = "block";
      navigationItems.styled.display = "block";
    }else {
      openHam.styled.display = "block";
      closeHam.styled.display = "none";
      navigationItems.styled.display="none"
    }
  }
  return (
    <>
      {/* <p>右側</p> */}
      {/* <p>左側</p> */}
      <Container>
        <nav>
          <Link to="/" className="logo_container">
            Home
          </Link>
          <ul className="navigation_items" id="navigation_items" >
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
          <div className="hamburger">
            <span id="openHam" onClick={() => clickHamburger}>&#9776;</span>
            <span id="closeHam" onClick={() => clickHamburger}>&#x2716;</span>
          </div>
        </nav>
      </Container>
    </>
  );
}

export default Navbar;
