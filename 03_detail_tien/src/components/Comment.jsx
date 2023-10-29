import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";

import neko1 from "../assets/neko1.png";
import neko2 from "../assets/neko2.png";
import neko3 from "../assets/neko3.jpeg";

const Container = styled.div`
	width: 95%;
	margin: 0 auto;
	font-size: 14px;
	div {
		width: 100%;
		display: flex;
		margin-bottom: 10px;
		gap: 5px 10px;
		img {
			width: 46px;
			height: 46px;
			border-radius: 50%;
		}
		.box {
			flex-direction: column;
			span {
				font-weight: bold;
			}
			.comment {
				padding: 10px;
				border-radius: 8px;
				background: #f5f5f5;
				flex-direction: column;
				p:last-child {
					font-size: 12px;
					color: #666666;
				}
			}
		}
	}
`;

const PostComment = styled.div`
	flex-direction: column;
	padding: 20px;
	input {
		width: 300px;
	}
	.comment {
		height: 80px;
	}
	button {
		width: 300px;
	}
`;

let finished = false;

const Counter = (e) => {
	// moji: 変数、 setMoji: 関数
	// あいうえおを変数(moji)に格納している
	const [comment, setComment] = useState([
		{
			img: neko1,
			name: "かーすけ",
			comment: "変更しておきましたのでよろしくお願い致します。m(_ _)m",
			date: Date.now(),
		},
		{
			img: neko1,
			name: "たかぽん",
			comment: "商品届きました、ありがとうございます。m(_ _)m",
			date: "10日前",
		},
	]);
	const [name, setName] = useState("");
	const [post, setPost] = useState("");

	const { isLoading, error, isSuccess, data } = useQuery({
		queryKey: ["Comments"],
		queryFn: () =>
			fetch("https://lusty.asia:1443/api/mercari-comments").then((res) =>
				res.json()
			),
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (finished == false) {
		const content = data.data.map((item) => {
			console.log(item.attributes.name);
			console.log(item.attributes.comment);

			let obj = {
				img: neko1,
				name: item.attributes.name,
				comment: item.attributes.comment,
				date: "10日前",
			};

			console.log("-----------------");
			console.log(obj);

			setComment((prevState) => [obj, ...prevState]);
		});
		finished = true;
	}

	const submit = () => {
		// 空チェック（validation：正しい値が入っているかチェック）
		if (name.length == 0 || post.length == 0) {
			return;
		}

		// 同じユーザーが、同じコメントを投稿できないようにする。
		for (let i = 0; i < comment.length; i++) {
			if (comment[i].name == name && comment[i].text == post) {
				alert("同じ内容は投稿できません");
				return;
			}
		}

		let d = new Date();
		let year = d.getFullYear();
		let month = d.getMonth() + 1;
		let day = d.getDate();
		let dayofweek = d.getDay();

		const dayname = ["日", "月", "火", "水", "木", "金", "土"];

		const obj = {
			img: neko3,
			name: name,
			comment: post,
			date:
				year +
				"年" +
				month +
				"月" +
				day +
				"日" +
				"[" +
				dayname[dayofweek] +
				"]",
		};
		setComment([obj, ...comment]);
		setName("");
		setPost("");
	};

	return (
		<Container>
			<PostComment>
				<input
					id="name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="your name"
				></input>
				<div className="comment">
					<input
						type="text"
						value={post}
						onChange={(e) => setPost(e.target.value)}
						placeholder="comment here"
					></input>
				</div>
				<button onClick={() => submit()}>投稿</button>
			</PostComment>
			{comment.map((item, index) => (
				<div key={index}>
					<img src={item.img} alt="nako" />
					<div className="box">
						<span>{item.name}</span>
						<div className="comment">
							<p>{item.comment}</p>
							<p>{item.date}</p>
						</div>
					</div>
				</div>
			))}
		</Container>
	);
};

export default Counter;
