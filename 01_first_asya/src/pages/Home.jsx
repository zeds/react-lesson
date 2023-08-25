import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mercari.svg";
import search from "../assets/search-icon.svg";
import twitter from "../assets/twitter.svg";
import facebook from "../assets/facebook.svg";
import home from "../assets/home.svg";
import bell from "../assets/bell.svg";
import camera from "../assets/camera.svg";
import person from "../assets/person.svg";
import styled from "styled-components";

const TabContainer = styled.div`
    width: 100%;
    height: 44px;
    /* padding: 0 36px; */
    @media (max-width: 800px) {
        padding: 0 5px;
    }

    div {
        display: flex;
        align-items: center;
        max-width: 1280px;
        height: 100%;
        margin: 0 auto;
        gap: 15px;
        span {
            padding: 0 24px;
            font-weight: bold;
            color: gray;
        }
        .border {
            position: relative;
            color: red;
            &:before {
                content: "";
                display: inline-block;
                position: absolute;
                left: 0%;
                bottom: -12px;
                width: 100%;
                height: 4px;
                border-radius: 5px;
                background: red;
            }
        }
    }
`;

const NekoContainer = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 36px;
    gap: 16px;
    @media (max-width: 800px) {
        grid-template-columns: repeat(3, 1fr);
    }
    .nekoBox {
        width: 100%;
        height: 100%;        
        div {
            position: relative;
            width: 100%;
            img {
                width: 100%;
                aspect-ratio: 1/1;
                height: 100%;
                object-fit: contain;
            }
            span {
                position: absolute;
                font-size: 1.4rem;
                color: white;
                font-weight: bold;                
                left: 0;
                bottom: 5px;
                @media (max-width: 800px) {
                    bottom: 10%;
                }
                background: rgb(0, 0, 0, 0.4);
                padding: 5px 15px 5px 14px;
                border-radius: 0 20px 20px 0;                                          
                    &:before {
                    content: "¥";
                    color: white;
                    font-size: 1rem;
                    font-weight: 700;
                    top: 0px;                    
                    /* left: -8px;
                    bottom: 6px;  */
                }               
                
            }
        }
        p {
            padding: 0.5px;
            font-size: 1.4rem;
            font-weight: 400;
            color: #333333;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            @media (max-width: 800px) {
                display: none;
            }
        }
    }
`;

const Footer = styled.div`
    display: flex;
    padding-bottom: 100px;
    gap: 10px;
    margin-left: 20px;
    div {
        width: 300px;
        font-weight: bold;
        ul {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            font-weight: normal; 
            color: black;           
        }
        li {
            color: #333333;
            font-size: 1.4rem;
            padding: 8px; 
            &:hover {
                background: #f5f5f5;
                cursor: pointer;
            }
        }
        

    }
`;

const Social = styled.div`
    width: 100%;
    border-top: 1px solid lightgray;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 16px;
    ul {
        display: flex;
    }
    img {
        height: 35px;
    }
    .right {
        font-size: 1.2rem;
        color: gray;
    }
`;

const Footer_nav = styled.div`
    display: none;
    width: 100%;
    height: 64px;
    position: fixed;
    left: 0;
    bottom: 0;
    background: green;
    border-top: 1px solid red;
    @media (max-width: 800px) {
        display: block;
    }
    ul {
        display: flex;
        height: 100%;
        background: pink;
        justify-content: space-around;
        align-items: center; 
        li {
            width: 100%;
            height: 100%;
            border: 1px solid black;
            font-size: 1.2rem;
            text-align: center;
        }
    }
    li {
        display: flex;
        justify-content: center;
    }
    img {
        width: 40px;
    }
`;

function Home() {
    const [count, setCount] = useState(0);

    return (
        <>
            <TabContainer>
                <div>
                    <span className="border">おすすめ</span>
                    <span>マイリスト</span>
                    <span>ピックアップ</span>
                </div>
            </TabContainer>

            <hr />
            <NekoContainer>
                <div className="nekoBox">
                    <div>
                        <img
                            src="https://static.mercdn.net/c!/w=240/thumb/photos/m54429009865_1.jpg"
                            alt=""
                        />
                        <span>3,800</span>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Neque nesciunt ullam repellendus perspiciatis
                        animi sint modi fuga facilis nihil officiis enim quas
                        necessitatibus, totam quae iusto at, provident tenetur
                        laboriosam.
                    </p>
                </div>
                <div className="nekoBox">
                    <div>
                        <img
                            src="https://static.mercdn.net/c!/w=240/thumb/photos/m24864889779_1.jpg?1689308356"
                            alt=""
                        />
                        <span>3,800</span>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Neque nesciunt ullam repellendus perspiciatis
                        animi sint modi fuga facilis nihil officiis enim quas
                        necessitatibus, totam quae iusto at, provident tenetur
                        laboriosam.
                    </p>
                </div>
                <Link to="/item">
                    <div className="nekoBox">
                        <div>
                            <img
                                src="https://static.mercdn.net/c!/w=240/thumb/photos/m26336997691_1.jpg?1665461074"
                                alt=""
                            />
                            <span>9,999</span>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Neque nesciunt ullam repellendus perspiciatis
                            animi sint modi fuga facilis nihil officiis enim
                            quas necessitatibus, totam quae iusto at, provident
                            tenetur laboriosam.
                        </p>
                    </div>
                </Link>
                <div className="nekoBox">
                    <div>
                        <img
                            src="https://static.mercdn.net/c!/w=240/thumb/photos/m13788077239_1.jpg?1692337965"
                            alt=""
                        />
                        <span>3,800</span>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Neque nesciunt ullam repellendus perspiciatis
                        animi sint modi fuga facilis nihil officiis enim quas
                        necessitatibus, totam quae iusto at, provident tenetur
                        laboriosam.
                    </p>
                </div>
                <div className="nekoBox">
                    <div>
                        <img
                            src="https://static.mercdn.net/c!/w=240/thumb/photos/m80564924129_1.jpg?1689909663"
                            alt=""
                        />
                        <span>3,800</span>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Neque nesciunt ullam repellendus perspiciatis
                        animi sint modi fuga facilis nihil officiis enim quas
                        necessitatibus, totam quae iusto at, provident tenetur
                        laboriosam.
                    </p>
                </div>
            </NekoContainer>

            <Footer>
                <div>
                    メルカリについて
                    <ul>
                        <li>会社概要（運営会社）</li>
                        <li>採用情報</li>
                        <li>プレスリリース</li>
                        <li>公式ブログ</li>
                        <li>プレスキット</li>
                        <li>メルカリUS</li>
                        <li>メルカリShops</li>
                        <li>メルカリShops会社概要（運営会社）</li>
                        <li>メルカリShopsプレスリリース</li>
                    </ul>
                </div>
                <div>
                    ヘルプ
                    <ul>
                        <li>ヘルプセンター（ガイド・お問い合わせ）</li>
                        <li>メルカリShops出店者向けガイド</li>
                        <li>お問い合わせ一覧</li>
                        <li>フリーワードから商品をさがす</li>
                    </ul>
                </div>
                <div>
                    プライバシーと利用規約
                    <ul>
                        <li>プライバシーポリシー</li>
                        <li>外部送信ポリシー</li>
                        <li>メルカリ利用規約</li>
                        <li>メルカリShops利用規約</li>
                        <li>メルペイ利用規約</li>
                        <li>メルカード利用規約</li>
                        <li>メルペイスマートマネー利用規約</li>
                        <li>メルペイスマートマネープライバシーポリシー</li>
                        <li>電磁交付規約</li>
                        <li>コンプライアンスポリシー</li>
                        <li>個人データの安全管理に係る基本方針</li>
                        <li>特定商取引に関する表記</li>
                        <li>資金決済法に基づく表示</li>
                        <li>法令順守と犯罪抑止のために</li>
                        <li>メルカリあんしん・あんぜん宣言！</li>
                        <li>偽ブランド品撲滅への取り組み</li>
                    </ul>
                </div>
                {/* <!-- 　&copy; 2020-2023 All Rights Reserved. --> */}
            </Footer>

            <Social>
                <div className="left">
                    <ul>
                        <li>
                            <img src={twitter} alt="twitter" />
                        </li>
                        <li>
                            <img src={facebook} alt="facebook" />
                        </li>
                    </ul>
                </div>
                <div className="right">© Mercari, Inc.</div>
            </Social>

            <div className="margin"></div>

            <Footer_nav>
                <ul>
                    <li>
                        <a href="./camera.html" alt="camera">
                            <img src={home} />
                            <p>ホーム</p>
                        </a>
                    </li>
                    <li>
                        <a href="./camera.html" alt="camera">
                            <img src={bell} />
                            <p>お知らせ</p>
                        </a>
                    </li>
                    <li>
                        <a href="./camera.html" alt="camera">
                            <img src={camera} />
                            <p>出品</p>
                        </a>
                    </li>
                    <li>
                        <a href="./camera.html" alt="camera">
                            <img src={person} />
                            <p>マイページ</p>
                        </a>
                    </li>
                </ul>
            </Footer_nav>
        </>
    );
}

export default Home;