import React, { useState, useRef } from "react";
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
	width: 300px;
	height: 320px;
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
`;

const Modal = (props) => {
	if (!props.open) return null;

	const refName = useRef();
	const refComment = useRef();
	const [errorName, setErrorName] = useState("");
	const [errorComment, setErrorComment] = useState("");

	//閉じる
	const clickClose = (e) => {
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
		//validation
		if (refName.current.value.length == 0) {
			setErrorName("名前を入れてください");
			return;
		}

		//名前エラーをクリア
		setErrorName("");

		if (refComment.current.value.length == 0) {
			setErrorComment("コメントを入力してください");
			return;
		}

		let obj = {
			name: refName.current.value,
			comment: refComment.current.value,
		};
		props.post(obj);
		// alert(refName.current.value + ":" + refComment.current.value);
	};

	return (
		<ModalContainer onClick={() => clickBackground()}>
			<ModalFrame onClick={stopPropagation}>
				<button className="close" onClick={clickClose}>
					❌
				</button>
				コメント投稿
				<p className="name">
					名前<input ref={refName}></input>
				</p>
				<div className="error">{errorName}</div>
				<p>
					コメント
					<input ref={refComment}></input>
				</p>
				<p className="error">{errorComment}</p>
				<div className="buttonBlock">
					<button className="cancel">キャンセル</button>
					<button className="post" onClick={() => clickPost()}>
						投稿
					</button>
				</div>
			</ModalFrame>
		</ModalContainer>
	);
};

export default Modal;
