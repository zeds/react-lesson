import React, { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
	background: white;
	padding: 20px 0;
	button {
		width: 100%;
		height: 40px;
		border: none;
		border-radius: 4px;
		font-size: 1.6rem;
		font-weight: bold;
		color: darkgray;
		&:hover {
			cursor: pointer;
		}
	}
`;
interface InputInterface {
	label: string;
	color?: string; // ?: optional parameter
	background?: string;
}

export function Button({
	label,
	color = "white",
	background = "lightgray",
}: InputInterface) {
	return (
		<Frame>
			<button type="submit" style={{ color: color, background: background }}>
				{label}
			</button>
		</Frame>
	);
}