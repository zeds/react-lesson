import React, { useState, useEffect } from "react";
import { styled } from "styled-components";

const ModalContainer = styled.div`
	position: fixed;
	width: 100vw;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`;

const ModalFrame = styled.div`
	width: 500px;
	// height: 230px;
	background: white;
	position: relative;
	font-size: 20px;
	padding: 10px;
	border-radius: 4px;
	background: #f4fbfe;

	.error {
		color: red;
		font-size: 14px;
	}

	input {
		width: 100%;
		padding: 5px;
	}

	.name {
		margin-top: 20px;
	}

	.error {
		height: 20px;
	}

	.buttonBlock {
		display: flex;
		margin-top: 50px;
		justify-content: center;
		gap: 10px;
		button {
			width: 100px;
			border: 2px solid #5483eb;
			border-radius: 4px;
			padding: 4px 0;
			font-weight: bold;
			&:hover {
				opacity: 0.5;
			}
		}
		.cancel {
			background: white;
			color: #5483eb;
		}
		.post {
			background: #5483eb;
			color: white;
		}
	}

	.close {
		position: absolute;
		top: 5px;
		right: 5px;
		border: none;
		&:hover {
			background: skyblue;
		}
	}
	.image {
		img {
			width: 100px;
		}
	}
`;

const ModalConfirm = (props) => {
	console.log(props)
	const [name, setName] = useState(props.data.name);
	const [comment, setComment] = useState(props.data.comment);
	const [image, setImage] = useState(props.data.image);

	useEffect(() => {
		// スクロールできないようにする
		console.log("stopping scroll");
		document.body.style.overflow = "hidden";
		return () => {
			// componentWillUnmountの時に呼ばれる
			console.log("start scrolling");
			document.body.style.overflow = "auto";
		};
	}, []);

	//閉じるボタンが押された
	const clickClose = (e) => {
		console.log("clickClose");
		e.stopPropagation();
		props.close();
	};

	//背景がクリックされた
	const clickBackground = () => {
		props.close();
	};

	//Modalがクリックした時、背景がクリックされたイベントも発生
	//してしまうので、それを防ぐ
	const stopPropagation = (e) => {
		console.log("stopPropagation");
		e.stopPropagation();
	};

	const clickPost = () => {
		let obj = {
			id: props.data.id,
		};
		props.post(obj);
	};

	const clickCancel = () => {
		props.close();
	};

	return (
		<ModalContainer onClick={() => clickBackground()}>
			<ModalFrame onClick={stopPropagation}>
				<button className="close" onClick={clickClose}>
					❌
				</button>
				確認
				<div>このデータを削除してよろしいですか？</div>
				<hr />
				<div className="image">
					<img src={image} alt="" />
				</div>
				<div>{name}</div>
				<div>{comment}</div>
				<div className="buttonBlock">
					<button className="cancel" onClick={() => clickCancel()}>
						キャンセル
					</button>
					<button className="post" onClick={() => clickPost()}>
						確認
					</button>
				</div>
			</ModalFrame>
		</ModalContainer>
	);
};

export default ModalConfirm;
