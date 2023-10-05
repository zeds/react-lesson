import { Link, NavLink } from "react-router-dom";
import React from "react";
import styled from "styled-components";

const Container = styled.nav`
	width: 100%;
	height: 64px;
	background: gray;
	padding: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 1.5rem;
	font-weight: bold;

	ul {
		display: flex;
		align-items: center;
		gap: 10px;
		li {
			color: white;
		}
	}
`;

const Navbar = () => {
	return (
		<Container>
			<Link to="/" className="title">
				ROUTER
			</Link>
			<ul>
				<li>
					<NavLink to="/about">About</NavLink>
				</li>
				<li>
					<NavLink to="/login">ログイン</NavLink>
				</li>
				<li>
					<NavLink to="/register">会員登録</NavLink>
				</li>
			</ul>{" "}
		</Container>
	);
};

export default Navbar;
