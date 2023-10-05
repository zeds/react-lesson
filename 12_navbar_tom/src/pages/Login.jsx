import React from "react";
import styled from "styled-components";

const Container = styled.div`
	max-width: 800px;
	background: white;
	margin: 50px auto;
`;

const Login = () => {
	return (
		<Container>
			Login
			<p>email</p>
			<p>password</p>
		</Container>
	);
};

export default Login;
