import { useState } from "react";
import styled from "styled-components";
import {
    NekoContainer,
    LeftBox,
    RightBox,
    IconContainer,
    AuthorContainer,
    InfoContainer,
    VerifyContainer,
    AvatarContainer,
    Avatar,
    VerifyBox
} from "./DetailStyle";

import heart from "../assets/icons/heart.svg";
import comment from "../assets/icons/comment.svg";
import dot from "../assets/icons/dot.svg";
import link from "../assets/icons/link.svg";
import lock from "../assets/icons/lock.svg";
import arrow from "../assets/icons/arrow.svg";
import star from "../assets/icons/star.svg";
import check_icon from "../assets/icons/check_icon.svg";

function Detail() {
    return (
        <>
            <NekoContainer>
                <LeftBox>
                    <img
                        src="https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg?1690880161"
                        alt="aaa"
                    />
                </LeftBox>
                <RightBox>
                    <div className="title">
                        新品　ツモリチサト　120センチ　浴衣
                    </div>
                    <div className="brand">120cm / ツモリチサト</div>
                    <div className="price">¥5,200(税込)送料込み</div>
                    <IconContainer>
                        <div>
                            <img src={heart} alt="heart" />
                            <img src={comment} alt="comment" />
                        </div>

                        <div>
                            <img src={dot} alt="dot" />
                        </div>
                    </IconContainer>
                    <div className="button_buy">
                        Buy this item!
                        <img src={link} alt="link" />
                    </div>
                    <div className="thanks">
                        Thanks to our partnership with Buyee, we ship to over
                        100 countries worldwide! For international purchases,
                        your transaction will be with Buyee.
                    </div>
                    <div className="desc">
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
                    <InfoContainer>
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
                    </InfoContainer>

                    <hr />

                    <AuthorContainer>
                        <div className="Locktext">
                            <div className="lock">
                                <img src={lock} alt="" />
                                <p>メルカリ安心への取り組み</p>
                            </div>
                            <div className="safetext">
						<p>お金は事務局に支払われ、評価後に振り込まれます</p>
                         </div>
                        </div>
                        <div>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </AuthorContainer>
                    <span className="text">出品者</span>
                    <VerifyContainer>
                        <AvatarContainer>
                            <Avatar>
                                <img src="https://static.mercdn.net/thumb/members/320377822.jpg?1638851200" alt="" />
                            </Avatar>
                            <VerifyBox>
                                <span className="verify">アミラ💛メルカリへようこそ❕</span>
                                <ul className="star_mark">
                                    <li> 
                                        <img src={star} alt="" />
                                    </li>
                                    <li>
                                        <img src={star} alt="" />
                                    </li>
                                    <li>
                                        <img src={star} alt="" />
                                    </li>
                                    <li>
                                        <img src={star} alt="" />
                                    </li>
                                   
                                    <li>
                                        <span className="count">123u</span>
                                    </li>
                                </ul>
                                <div className="checkicon">
                                    <div className="">
                                        <img src={check_icon} alt="" />
                                    </div>
                                    <span className="">本人確認済</span>
                                </div>
                            </VerifyBox>
                        </AvatarContainer>
                        <div className="">
                            <img src={arrow} alt="" />
                        </div>
                  </VerifyContainer>
                    <div className="">
                        <span>コメント (0)</span>
                    </div>
                    <button className="login">ログインしてコメントする</button>
                </RightBox>
            </NekoContainer>
        </>
    );
}

export default Detail;