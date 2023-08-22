import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mercari.svg";
import search from "../assets/search-icon.svg";
import styled from "styled-components";

const Header = styled.header`
    display: flex;
    height: 64px;
    justify-content: space-between;
    padding: 0 10px;

    .logo_container {
        position: relative;
        width: 720px;
        display: flex;
        align-items: center;
        gap: 10px;

        .logo {
            width: 110px;
        }
        input {
            width: 100%;
            background: #f5f5f5;
            height: 34px;
            border-radius: 4px;
            border: 1px solid #cccccc;
            padding: 0 16px;
            font-size: 16px;
            font-weight: 400;
        }
        .search_icon {
            position: absolute;
            right: 3px;
            padding: 3px;
            border-radius: 4px;
            &:hover {
                cursor: pointer;
                background: #dfdfdf;
            }
        }
    }

    ul {
        list-style: none;
        display: flex;
        align-items: center;
        li {
            width: 80px;
            /* font-size: 1.4rem; */
            padding: 8px;
            text-align: center;
            border-radius: 4px;
            &:hover {
                background: #f5f5f5;
                cursor: pointer;
            }
        }
        button {
            width: 62px;
            height: 36px;
            border: none;
            background: #ff333f;
            font-weight: bold;
            color: white;
            border-radius: 4px;
            &:hover {
                opacity: 0.6;
            }
            @media (max-width: 800px) {
                display: none;
            }
        }
    }
`;

const Test = styled.div`
    width: 100px;
    height: 100px;
    background: red;
`;

function Navbar() {
    const [count, setCount] = useState(0);

    return (
        <>
            {/* <Test /> */}
            <Header>
                <div className="logo_container">
                    <Link to="/">
                        <img className="logo" src={logo} alt="" />
                    </Link>
                    <input type="text" placeholder="なにをお探しですか？" />
                    <img className="search_icon" src={search} alt="" />
                </div>
                <nav>
                    <ul>
                        <li>お知らせ</li>
                        <li>ログイン</li>
                        <li>会員登録</li>
                        <button>出品</button>
                    </ul>
                </nav>
            </Header>
        </>
    );
}

export default Navbar;
