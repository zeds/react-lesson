import { DISPLAY_MD } from "../GlobalStyle";
import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const ShowBurger = styled.div`
	display: none;
	z-index: 1;
	position: fixed;
	right: 0;
	width: 50px;
	height: 50px;
	font-size: 6rem;
	font-weight: 800;
	color: white;
	align-items: center;
	@media (max-width: ${DISPLAY_MD}) {
		display: flex;
		cursor: pointer;
	}
`;

const MenuBackground = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.6);
	color: white;
	div {
		z-index: 1;
		position: absolute;
		right: 0;
		top: 10px;
		width: 50px;
		height: 50px;
		font-size: 4rem;
		&:hover {
			cursor: pointer;
		}
	}
`;

const NavigationHeader = styled.header`
	position: fixed;
	display: flex;
	background: green;
	width: 100%;
	height: 62px;
	padding: 0 15px;
	justify-content: center;
	align-items: center;

	.menu {
		position: absolute;
		display: block;
		top: 62px;
		width: 400px;
		height: 100px;
		animation-name: animationBox;
		animation-duration: 0.5s;
		animation-fill-mode: forwards;
		ul {
			display: flex;
			background: green;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			li {
				margin: 10px 0;
				a {
					font-size: 3rem;
					padding: 10px;
					&:hover {
						background: white;
						a {
							color: black;
						}
					}
				}
			}
		}
	}
	@keyframes animationBox {
		0% {
			transform: translateX(100vw);
		}
		100% {
			transform: translateX(calc(100vw - 400px));
		}
	}
	.menu_close {
		position: absolute;
		display: block;
		width: 400px;
		height: 100px;
		background: green;
		animation-name: animationBoxClose;
		animation-duration: 0.3s;
		animation-fill-mode: forwards;
		top: 62px;
		ul {
			display: flex;
			background: green;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
	@keyframes animationBoxClose {
		0% {
			transform: translateX(calc(100vw - 400px));
		}
		100% {
			transform: translateX(100vw);
		}
	}
	//NavLinkでは、選択中のelementにはactiveが使われます
	.active {
		background: white;
		color: black;
		border-radius: 4px;
	}
	nav {
		display: flex;
		width: 100%;
		background: green;
		justify-content: space-between;
		align-items: center;

		.logo_container {
			color: ghostwhite;
			text-decoration: none;
			font-weight: 700;
			font-size: 2.6rem;
		}
		// 800px以上の時のul
		ul {
			display: flex;
			flex-direction: row;
			gap: 10px;
			font-size: 2rem;
			a {
				padding: 10px;
				&:hover {
					background: white;
					color: black;
					border-radius: 4px;
				}
			}
		}
		@media (max-width: ${DISPLAY_MD}) {
			ul {
				display: none;
			}
		}
	}
`;

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const clickBurger = () => {
		let burger = document.querySelector("#burger");
		burger.style.display = "none";

		// スクロール出来ないようにする
		document.body.style.overflow = "hidden";

		setMenuOpen(true);
	};

	const clickClose = () => {
		setMenuOpen(false);
		let burger = document.querySelector("#burger");
		burger.style.display = "flex";

		//スクロール出来るようにする
		document.body.style.overflow = "auto";
	};

	let content = (
		<ul>
			<li>
				<NavLink to="/about" onClick={() => clickClose()}>
					About
				</NavLink>
			</li>
			<li>
				<NavLink to="/login" onClick={() => clickClose()}>
					ログイン
				</NavLink>
			</li>
			<li>
				<NavLink to="/register" onClick={() => clickClose(clickClose)}>
					会員登録
				</NavLink>
			</li>
		</ul>
	);

	return (
		<>
			<ShowBurger>
				<span id="burger" onClick={() => clickBurger()}>
					&#9776;
				</span>
			</ShowBurger>
			{menuOpen ? (
				<MenuBackground onClick={() => clickClose()}>
					<div onClick={() => clickClose()}>&#x2716;</div>
				</MenuBackground>
			) : (
				""
			)}
			<NavigationHeader>
				<nav>
					<Link to="/" className="logo_container">
						ROUTER
					</Link>
					{content}
					<div className={menuOpen ? "menu" : "menu_close"}>{content}</div>
				</nav>
			</NavigationHeader>
		</>
	);
};

export default Navbar;
