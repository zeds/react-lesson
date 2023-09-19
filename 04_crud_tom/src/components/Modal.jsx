import React from "react";
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
	height: 200px;
	background: white;
`;

const Modal = (props) => {
	if (!props.open) return null;

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

	return (
		<ModalContainer onClick={() => clickBackground()}>
			<ModalFrame onClick={stopPropagation}>
				<button onClick={clickClose}>閉じる</button>
				モーダルです
				<p>名前</p>
				<p>コメント</p>
				<button>キャンセル</button>
				<button>投稿</button>
			</ModalFrame>
		</ModalContainer>
	);
};

export default Modal;
