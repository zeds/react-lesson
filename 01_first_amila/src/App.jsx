import "./App.css";
import logo from "./assets/mercari.svg";
import search from "./assets/search-icon.svg";
import twitter from "./assets/twitter.svg";
import facebook from "./assets/facebook.svg";
import home from "./assets/home.svg";
import bell from "./assets/bell.svg";
import camera from "./assets/camera.svg";
import person from "./assets/person.svg";

function App() {

    return (
        <>
            <div className="container">
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

                <div className="tab_container">
                    <div>
                        <span className="border">おすすめ</span>
                        <span>マイリスト</span>
                        <span>ピックアップ</span>
                    </div>
                </div>

                <hr />
                <div className="nekoContainer">
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
                            animi sint modi fuga facilis nihil officiis enim
                            quas necessitatibus, totam quae iusto at, provident
                            tenetur laboriosam.
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
                            animi sint modi fuga facilis nihil officiis enim
                            quas necessitatibus, totam quae iusto at, provident
                            tenetur laboriosam.
                        </p>
                    </div>
                    <div className="nekoBox">
                        <div>
                            <img
                                src="https://static.mercdn.net/c!/w=240/thumb/photos/m85935112334_1.jpg?1672205879"
                                alt=""
                            />
                            <span>3,800</span>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Neque nesciunt ullam repellendus perspiciatis
                            animi sint modi fuga facilis nihil officiis enim
                            quas necessitatibus, totam quae iusto at, provident
                            tenetur laboriosam.
                        </p>
                    </div>
                    <div className="nekoBox">
                        <div>
                            <img
                                src="https://static.mercdn.net/c!/w=240/thumb/photos/m77373788402_1.jpg?1678769728"
                                alt=""
                            />
                            <span>3,800</span>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Neque nesciunt ullam repellendus perspiciatis
                            animi sint modi fuga facilis nihil officiis enim
                            quas necessitatibus, totam quae iusto at, provident
                            tenetur laboriosam.
                        </p>
                    </div>
                    <div className="nekoBox">
                        <div>
                            <img
                                src="https://static.mercdn.net/c!/w=240/thumb/photos/m43312854834_1.jpg?1686563105"
                                alt=""
                            />
                            <span>3,800</span>
                        </div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing
                            elit. Neque nesciunt ullam repellendus perspiciatis
                            animi sint modi fuga facilis nihil officiis enim
                            quas necessitatibus, totam quae iusto at, provident
                            tenetur laboriosam.
                        </p>
                    </div>
                </div>

                <div className="footer">
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
                </div>

                <div className="social">
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
                </div>

                <div className="margin"></div>

                <div className="footer-nav">
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
                </div>
            </div>
        </>
    );
}

export default App;