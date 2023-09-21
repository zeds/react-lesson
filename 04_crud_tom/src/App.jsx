import { useRef, useState } from "react";
import { styled } from "styled-components";
import "./App.css";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import edit from "./assets/edit.svg";
import trush from "./assets/trush.svg";
import Modal from "./components/Modal";

const Container = styled.div`
	max-width: 1024px;
	background: white;
	font-size: 2rem;
	margin: 20px auto;
	padding: 10px;
`;

const Card = styled.div`
	display: flex;
	width: 98%;
	border: 1px solid black;
	padding: 10px;
	margin: 10px auto;
	justify-content: space-between;
	align-items: center;

	.operation {
		display: flex;
		gap: 10px;
		button {
			border: none;
			padding: 10px;
			border-radius: 4px;
		}
		button:hover {
			cursor: pointer;
			background: skyblue;
		}
	}
`;

function App() {
	const [show, setShow] = useState(false);

	const queryClient = useQueryClient();
	const refName = useRef();
	const refComment = useRef();
	const [modalData, setModalData] = useState({
		id: 0,
		name: "hohoge",
		comment: "fugafuga",
	});

	// APIからCommentsを取得する関数
	const getComments = async () => {
		const res = await fetch(
			"https://lusty.asia:1443/api/mercari-comments?sort[0]=updatedAt:desc"
		);
		return res.json();
	};

	// 😺CRUDのRead
	const postsQuery = useQuery({
		queryKey: ["comments"],
		queryFn: getComments,
		refetchOnWindowFocus: true,
		// refetchInterval: 1000,
		// staleTime: 1000 * 60 * 5,
		// cacheTime: Infinity,
	});

	// 😺CRUDのDelete
	const mutationDelete = useMutation({
		mutationFn: (commentId) => {
			return axios.delete(
				`https://lusty.asia:1443/api/mercari-comments/${commentId}`
			);
		},
		onSuccess: () => {
			//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});

	// 😺CRUDのCreate
	const mutationCreate = useMutation({
		mutationFn: (newComment) => {
			return axios.post(
				"https://lusty.asia:1443/api/mercari-comments",
				newComment
			);
		},
		onSuccess: () => {
			//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});

	// 😺CRUDのUpdate
	const mutationUpdate = useMutation({
		mutationFn: (data) => {
			return axios.put(
				`https://lusty.asia:1443/api/mercari-comments/${data.id}`,
				{
					data: {
						name: data.name,
						comment: data.comment,
					},
				}
			);
		},
		onSuccess: () => {
			//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
			queryClient.invalidateQueries({ queryKey: ["comments"] });
		},
	});

	if (postsQuery.isLoading) {
		return <h1>Loading...</h1>;
	}

	// 🐶 Editボタン
	const clickEdit = (item) => {
		setModalData({
			id: item.id,
			name: item.attributes.name,
			comment: item.attributes.comment,
		});
		setShow(true);
	};

	// 🐶 deleteボタン
	const clickDelete = (id) => {
		console.log(id);
		mutationDelete.mutate(id);
	};

	// 🐙 Close Modal
	const closeModal = () => {
		setShow(false);
	};

	// 🐙 Modalで、投稿ボタンが押された
	const postModal = (data) => {
		setShow(false);
		console.log("data=" + JSON.stringify(data));
		mutationUpdate.mutate(data);
	};

	// 🐶 投稿
	const onSubmit = (e) => {
		// 画面のリロードを防ぐため
		e.preventDefault();
		console.log(refName.current.value);
		console.log(refComment.current.value);
		mutationCreate.mutate({
			data: {
				name: refName.current.value,
				comment: refComment.current.value,
			},
		});
	};

	return (
		<>
			{show && (
				<Modal post={postModal} close={closeModal} data={modalData} />
			)}

			<Container>
				<form onSubmit={onSubmit}>
					名前：<input ref={refName} type="text"></input>
					コメント：<input ref={refComment} type="text"></input>
					<button type="submit">投稿</button>
				</form>

				{postsQuery.data.data.map((item, index) => (
					<Card key={index}>
						<div>
							<div>{item.id}</div>
							<div>{item.attributes.name}</div>
							<div>{item.attributes.comment}</div>
						</div>

						<div className="operation">
							<button onClick={() => clickEdit(item)}>
								<img src={edit} alt="" />
							</button>
							<button onClick={() => clickDelete(item.id)}>
								<img src={trush} alt="" />
							</button>
						</div>
					</Card>
				))}
			</Container>
		</>
	);
}

export default App;
