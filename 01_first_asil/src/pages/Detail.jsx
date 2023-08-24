import { useState } from "react";
import styled from "styled-components";

const NekoContainer = styled.div`
    max-width: 1280px;
    background: white;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    gap: 10px;
    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

function Detail() {
    return (
        <>
            <NekoContainer>
                <div class="box-left">
                    <img
                        src="https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg?1690880161"
                        alt="aaa"
                    />
                </div>
                <div class="box-right">
                    <div class="title">新品　ツモリチサト　120センチ　浴衣</div>
                    <div class="brand">120cm / ツモリチサト</div>
                    <div class="price">¥5,200(税込)送料込み</div>
                    <div class="iconContainer">
                        <div class="icons">
                            <img src="heart.svg" alt="heart" />
                            <img src="comment.svg" alt="comment" />
                        </div>

                        <div class="dot">
                            <img src="dot.svg" alt="dot" />
                        </div>
                    </div>
                    <div class="button_buy">
                        Buy this item!
                        <img src="link.svg" alt="link" />
                    </div>
                    <div class="thanks">
                      
                    </div>
                    <div class="desc">
                        <h2>商品の説明</h2>
                        <p>
                            即購入歓迎
                            <br />
                            メルカリ便にて発送致します。
                            <br />
                            値下げ交渉ご遠慮下さい。
                            <br />
                            よろしくお願い致します。
                            <br />
                            <br />
                            「ポケモン不思議のダンジョン 赤の救助隊」
                            <br />
                            定価: ￥ 4571
                            <br />
                            ポケモンダンジョン
                            <br />
                            #ゲーム #RPG #ゲームボーイアドバンス #Other
                            <br />
                            GAMEBOY ADVANCE
                            <br />
                            ポケットモンスター
                            <br />
                            GBA
                            <br />
                            赤<br />
                            <br />
                            12分前
                            <br />
                        </p>
                    </div>

                    <hr />
                    <div class="info">
                        <h2>商品の情報</h2>
                        <div>
                            <p>カテゴリー</p>

                            <ul>
                                <li>本・音楽・ゲーム</li>
                                <li>テレビゲーム</li>
                                <li>その他</li>
                            </ul>
                        </div>
                        <div>
                            <p>商品の状態</p>
                            <span>目立った傷や汚れなし</span>
                        </div>

                        <div>
                            <p>配送料の負担</p>
                            <span>送料込み(出品者負担)</span>
                        </div>

                        <div>
                            <p>配送の方法</p>
                            <span>未定</span>
                        </div>

                        <div>
                            <p>発送元の地域</p>
                            <span>未定</span>
                        </div>

                        <div>
                            <p>発送までの日数</p>
                            <span>目立った傷や汚れなし</span>
                        </div>
                    </div>

                    <hr />

                    <div class="author">
                        <div>
                            <img src="./lock.svg" alt="lock" />
                            <span>メルカリ安心への取り組み</span>
                        </div>
                        <div>
                            <p>
                                お金は事務局に支払われ、評価後に振り込まれます
                            </p>
                        </div>
                        <div class="arrow">
                            <img src="./arrow.svg" alt="arrow" />
                        </div>
                    </div>
                </div>
            </NekoContainer>
        </>
    );
}

export default Detail;
