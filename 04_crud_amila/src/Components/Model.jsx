// import React from "react";
import { styled } from "styled-components";

const ModalContainer = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	background: black;
	opacity: 0.5;
`;

const Modal = ({ open }) => {
	if (!open) return null;

	return (
		<ModalContainer>
			Modal
			<button></button>
		</ModalContainer>
	);
};

export default Modal;
