import React, { useState } from "react";
import { Container, STRAPI_URL } from "../GlobalStyle";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { validation } from "../common/validation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Mypage = () => {
	const navigate = useNavigate();

	const getMe = async (text: any) => {
		console.log("getMe");
		const token = localStorage.getItem("token");
		// if (!token) {
		// 	navigate("/login");
		// 	return;
		// }

		//tokenが期限切れの場合は、ここでログアウトする
		try {
			const res = await axios.get(`${STRAPI_URL}/api/users/me`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return res.data;
		} catch (error) {
			console.log("error=" + error);
			return null;
		}
	};

	// 😺CRUDのRead
	const { isLoading, isError, data } = useQuery(["getme"], () =>
		getMe("aiueo")
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		console.log("isError");
		navigate("/login");
	}

	const clickLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<Container>
			マイページ
			<div>
				{JSON.stringify(data)}
				<button onClick={() => clickLogout()}>ログアウト</button>
			</div>
		</Container>
	);
};

export default Mypage;
