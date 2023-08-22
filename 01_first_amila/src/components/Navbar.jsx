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
        display: flex;
        width: 720px;
        align-items: center;
        gap: 10px;

        .logo {
            width: 110px;
        }
        input {
            width: 100%;
            height: 34px;
            border-radius: 4px;
            border: none;
            padding: 0 16px;
            font-size: 16px;
            font-weight: 400;
            background: #f5f5f5;
            font-weight: 400px;
        }
        .search_icon {
            position: absolute;
            right: 5px;
            padding: 3px;
            border-radius: 4px;
            &:hover {
                cursor: pointer;
                opacity: 0.5;
                background: #dfdfdf;

            }
        }
    }

    ul {
        list-style: none;
        display: flex;
        gap: 10px;
        align-items: center;
        li {
            width: 80px;
            font-size: 14px;
            font-weight: 400;
            padding: 8px;
            text-align: center;
            &:hover {
                background: #f5f5f5;
                cursor: pointer;
            }
        }
        button {
            width: 62px;
            height: 36px;
            font-size: 1.4rem;
            border: none;
            background: #ff333f;
            font-weight: bold;
            color: white;
            border-radius: 4px;
    &:hover {
        opacity: 0.4;
    }
    @media (max-width: 800px) {
        display: none;
    }
        }
    }
`;

// 
function Navbar() {
    // const [count, setCount] = useState(0);

    return (
        <>
            
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
