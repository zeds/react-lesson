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
`;

const Frame = styled.div`
	font-size: 3rem;
	color: white;

	.img_div {
		width: 100%;
		display: flex;
		justify-content: center;
		img {
			width: 100px;
			height: 100px;
		}
	}

	.button_div {
		width: 100%;
		display: flex;
		justify-content: center;
		button {
			background: orange;
			border: none;
			padding: 10px 20px;
			border-radius: 5px;
		}
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

	if (!ux.show) {
		return null;
	}

	return (
		<Wrapper>
			ErrorMessage
			<Frame>
				{ux.animation ? (
					<div className="img_div">
						<img src={firedRice} alt="loading..." />
					</div>
				) : null}

				<p>{ux.message}</p>
				{ux.button ? (
					<div className="button_div">
						<button onClick={() => dispatch(showMessage(false))}>
							OK
						</button>
					</div>
				) : null}
			</Frame>
		</Wrapper>
	);
};

export default ErrorMessage;
