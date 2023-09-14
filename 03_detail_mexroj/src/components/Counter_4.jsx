import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

import neko1 from "../assets/neko1.png";
import neko2 from "../assets/neko2.png";
import neko3 from "../assets/neko3.jpeg";

const Container = styled.div`
	max-width: 800px;
	background: red;
	margin: 0 auto;
	font-size: 14px;
	img {
		width: 46px;
		height: 46px;
		border-radius: 50%;
	}
	div {
		display: flex;

		div {
			width: 100%;
			flex-direction: column;
			gap: 10px;
			span {
				font-weight: bold;
			}
			.comment {

				padding: 10px;
				border-radius: 8px;
				background: #f5f5f5;
				p:last-child {
					font-size: 12px;
					color: #666666;
				}
			}
		}
	}
`;

const Counter = (e) => {
	// moji: 変数、 setMoji: 関数
	// あいうえおを変数(moji)に格納している
	const [comment, setComment] = useState([
		{
			img: neko1,
			name: "かーすけ",
			text: "変更しておきましたのでよろしくお願い致します。m( )m",
			date: "10日前",
		},
		{
			img: neko2,
			name: "Mehroj",
			text: "ありがとうございます",
			date: "3日前",
		},
	]);

	return (
		<Container>
			{comment.map((item) => (
				<div>
					{/* {item.name} */}
					<img src={item.img} alt="" />
					<div>
							<span>{item.name}</span>
							<div className="comment">
								<p>{item.text}</p>
								<p>{item.date}</p>
						</div>
					</div>
				</div>
			))}
		</Container>
	);
};

export default Counter;
