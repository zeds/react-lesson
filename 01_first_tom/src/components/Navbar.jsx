import { useState } from "react";
import logo from "../assets/mercari.svg";
import search from "../assets/search-icon.svg";

import "../App.css";

function Navbar() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="my_header">
                <div className="logo_container">
                    <img className="logo" src={logo} alt="" />
                    <input type="text" placeholder="なにをお探しですか？" />
                    <img className="search_icon" src={search} alt="" />
                </div>
                <ul>
                    <li>お知らせ</li>
                    <li>ログイン</li>
                    <li>会員登録</li>
                    <button>出品</button>
                </ul>
            </div>
            <hr className="hr_top" />
        </>
    );
}

export default Navbar;
