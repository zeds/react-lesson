import { DISPLAY_MD, HEIGHT_NAV } from "../GlobalStyle";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import ImgBurger from "../assets/burger.svg";
import ImgClose from "../assets/close.svg";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const ShowBurger = styled.div`
	display: none;
	z-index: 1;
	position: fixed;
	right: 0;
	width: ${HEIGHT_NAV};
	height: ${HEIGHT_NAV};
	div {
		img {
			width: 100%;
			height: 100%;
		}
	}
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
		width: ${HEIGHT_NAV};
		height: ${HEIGHT_NAV};

		img {
			width: 100%;
			height: 100%;
		}

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
	height: ${HEIGHT_NAV};
	padding: 0 15px;
	justify-content: center;
	align-items: center;

	.menu {
		position: absolute;
		display: block;
		top: ${HEIGHT_NAV};
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
		top: ${HEIGHT_NAV};
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
		let burger = document.querySelector<HTMLElement>("#burger")!;
		burger.style.display = "none";

		// スクロール出来ないようにする
		document.body.style.overflow = "hidden";

		setMenuOpen(true);
	};

	const clickClose = () => {
		setMenuOpen(false);
		let burger = document.querySelector<HTMLElement>("#burger")!;
		burger.style.display = "flex";

		//スクロール出来るようにする
		document.body.style.overflow = "auto";
	};

	const jwt = useSelector((state: RootState) => state.auth.jwt);
	console.log("jwt=", jwt);

	let content;

	if (jwt) {
		content = (
			<ul>
				<li>
					<NavLink to="/users" onClick={() => clickClose()}>
						ユーザー一覧
					</NavLink>
				</li>
				<li>
					<NavLink to="/about" onClick={() => clickClose()}>
						About
					</NavLink>
				</li>
				<li>
					<NavLink to="/mypage" onClick={() => clickClose()}>
						マイページ
					</NavLink>
				</li>
			</ul>
		);
	} else {
		content = (
			<ul>
				<li>
					<NavLink to="/users" onClick={() => clickClose()}>
						ユーザー一覧
					</NavLink>
				</li>
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
					<NavLink to="/register" onClick={() => clickClose()}>
						会員登録
					</NavLink>
				</li>
			</ul>
		);
	}

	return (
		<>
			<ShowBurger>
				<div id="burger" onClick={() => clickBurger()}>
					<img src={ImgBurger} alt="burger" />
				</div>
			</ShowBurger>
			{menuOpen ? (
				<MenuBackground onClick={() => clickClose()}>
					<div onClick={() => clickClose()}>
						<img src={ImgClose} alt="close" />
					</div>
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
