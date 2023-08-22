import React from "react"
import styled from "styled-components"
import logo from "../assets/mercari.svg"

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: red;
	p {
		color: red;
	}
	img {
		width: 100px;
	}
`

const Button = styled.button`
  	background: transparent;
	width: 300px;
	height: 200px;
	border-radius: 3px;
   border: 2px solid #BF4F74;
   color: #BF4F74;
   margin: 0 1em;
   padding: 0.25em 1em;
`;

const Styled = () => {
	return (
		<Container>
			<p>ここが階層を持ってる</p>
			<img src={logo} alt="" />
			<Button> 押して！</Button>
		</Container>
      
    );
};

export default Styled