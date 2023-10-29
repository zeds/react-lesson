import React, { useState } from "react";
import styled from "styled-components";
import Eye from "../assets/eye.svg";
import EyeOff from "../assets/eye-off.svg";

const Frame = styled.div`
	background: white;
	label {
		display: block;
		font-size: 1.4rem;
		font-weight: 700;
		margin-top: 20px;
		margin-bottom: 6px;
	}
	.required {
		color: #bc3852;
		font-size: 1.2rem;
		font-weight: normal;
	}
	input {
		width: 100%;
		height: 40px;
		font-size: var(--font-size-2xl);
		padding: 4px 8px;
		border: 1px solid var(--ls-color-border-input);
	}
	.password {
		display: flex;
		button {
			width: 40px;
			border: none;
			background: transparent;
			&:hover {
				cursor: pointer;
			}
		}
	}
	.error {
		margin: 6px 0;
		font-size: 1.4rem;
		color: #bc3852;
	}
`;
interface InputInterface {
	type: string;
	name: string;
	label: string;
	placeholder?: string;
	errors: any;
	register: any;
	validationSchema: {};
	required: boolean;
}

export function Input({
	name,
	label,
	placeholder,
	register,
	errors,
	required,
	type,
	validationSchema,
}: InputInterface) {
	// パスワード表示制御ようのstate
	const [isRevealPassword, setIsRevealPassword] = useState(false);

	const togglePassword = (e: any) => {
		e.preventDefault();
		setIsRevealPassword((prevState) => !prevState);
	};

	return (
		<Frame>
			<label htmlFor={name}>
				{label}
				<span className="required">{required && " 必須"}</span>
			</label>
			{type == "password" ? (
				<div className="password">
					<input
						id={name}
						name={name}
						type={isRevealPassword ? "text" : "password"}
						placeholder={placeholder}
						{...register(name, validationSchema)}
					/>
					<button onClick={(e) => togglePassword(e)}>
						{isRevealPassword ? (
							<img src={Eye} alt="eye" />
						) : (
							<img src={EyeOff} alt="eye" />
						)}
					</button>
				</div>
			) : (
				<input
					id={name}
					name={name}
					type={type}
					placeholder={placeholder}
					{...register(name, validationSchema)}
				/>
			)}
			{errors && errors[name]?.type === "required" && (
				<div className="error">{errors[name]?.message}</div>
			)}
			{errors && errors[name]?.type === "minLength" && (
				<div className="error">{errors[name]?.message}</div>
			)}
		</Frame>
	);
}
