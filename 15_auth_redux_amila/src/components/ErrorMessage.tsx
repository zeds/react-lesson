import { useDispatch } from "react-redux";
import styled from "styled-components";
import { showMessage } from "../redux/slices/uxSlice";
import type { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import firedRice from "../assets/cooking-transparent.gif";

const Wrapper = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);

	img {
		width: 100px;
		height: 100px;
	}

	button {
		background: red;
		border: none;
		padding: 20px;
		border-radius: 5px;
	}
	.loader {
		border: 16px solid #f3f3f3;
		border-top: 16px solid #3498db;
		border-radius: 50%;
		width: 130px;
		height: 130px;
		animation: spin 2s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const ErrorMessage = () => {
	const dispatch = useDispatch();

	const ux = useSelector((state: RootState) => state.ux);
	console.log("ux=", ux);

	if (!ux.message_window) {
		console.log("!ux", ux);
		return <div></div>;
	}

	return (
		<Wrapper>
			ErrorMessage
			<img src={firedRice} alt="loading..." />
			<button onClick={() => dispatch(showMessage(false))}>close</button>
		</Wrapper>
	);
};

export default ErrorMessage;
