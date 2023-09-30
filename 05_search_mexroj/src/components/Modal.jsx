import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import axios from "axios";

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
	/* height: 320px; */
	background: white;
	position: relative;
	font-size: 20px;
	padding: 10px;
	border-radius: 4px;
	background: #f4fbfe;

	.contents {
		display: flex;
		gap: 10px;
		img {
			width: 100px;
			object-fit: contain;
		}
		.update {
			/* background: red; */
		}
	}

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
	const [image, setImage] = useState(props.data.image);
	const [fileName, setFileName] = useState("");
	const [name, setName] = useState(props.data.name);
	const [comment, setComment] = useState(props.data.comment);

	const [errorName, setErrorName] = useState("");
	const [errorComment, setErrorComment] = useState("");

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

	// 🐙 新規登録/更新ボタン
	const clickPost = () => {
		//validation
		if (name.length == 0) {
			setErrorName("名前を入れてください");
			return;
		}

		//名前エラーをクリア
		setErrorName("");

		if (comment.length == 0) {
			setErrorComment("コメントを入力してください");
			return;
		}

		let obj = {
			id: props.data.id,
			name: name,
			comment: comment,
			file: fileName,
		};
		props.post(obj);
		// alert(refName.current.value + ":" + refComment.current.value);
	};

	//キャンセルボタン
	const clickCancel = () => {
		props.close();
	};

	const changeName = (e) => {
		setName(e.target.value);
	};
	const changeComment = (e) => {
		setComment(e.target.value);
	};

	//画像の変更
	const clickImageButton = (e) => {
		console.log("e=", e.target.files[0]);
		let file = e.target.files[0];
		setImage(window.URL.createObjectURL(file));
		setFileName(file);
	};

	return (
		<ModalContainer onClick={() => clickBackground()}>
			<ModalFrame onClick={stopPropagation}>
				<button className="close" onClick={clickClose}>
					❌
				</button>

				{props.data.type == "edit" ? (
					<div>コメント編集</div>
				) : (
					<div>新規登録</div>
				)}
				<div className="contents">
					<img src={image} alt="" />
					<div className="update">
						<p className="name">
							名前
							<input
								onChange={changeName}
								value={name}
								autoFocus={true}
							></input>
						</p>
						<div className="error">{errorName}</div>
						<p>
							コメント
							<input onChange={changeComment} value={comment}></input>
						</p>
						<p className="error">{errorComment}</p>
					</div>
				</div>
				<input type="file" accept="image/*" onChange={clickImageButton} />

				<div className="buttonBlock">
					<button className="cancel" onClick={() => clickCancel()}>
						キャンセル
					</button>
					<button className="post" onClick={() => clickPost()}>
						{props.data.type == "edit" ? (
							<div>更新</div>
						) : (
							<div>新規登録</div>
						)}
					</button>
				</div>
			</ModalFrame>
		</ModalContainer>
	);
};

export default Modal;
