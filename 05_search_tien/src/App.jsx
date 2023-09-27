import { useState, useRef, useEffect } from "react";
import { styled } from "styled-components";
import "./App.css";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import edit from "./assets/edit.svg";
import trush from "./assets/trush.svg";
import Modal from "./components/Modal";
import ModalConfirm from "./components/ModalConfirm";
import Search from "./assets/search.svg";
import {
	// CircleSpinnerOverlay,
	DotLoader,
	// FerrisWheelSpinner,
} from "react-spinner-overlay";

const SpinnerContainer = styled.div`
	position: absolute;
	background: rgba(0, 0, 0, 0.5);
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	max-width: 1024px;
	background: white;
	font-size: 2rem;
	margin: 20px auto;
	padding: 10px;
`;

const Header = styled.div`
	width: 100%;
	height: 64px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	font-size: 18px;
	gap: 10px;
	.logo {
		display: flex;
		width: 100%;
		height: 100%;
		align-items: center;
		max-width: 800px;
		background: green;
		padding: 5px;
		position: relative;
		p {
			width: 200px;
		}
		input {
			width: 100%;
			height: 100%;
			padding: 5px;
			font-size: 25px;
		}
		button {
			position: absolute;
			width: 40px;
			right: 10px;
			background: none;
		}
	}
	button {
		width: 100px;
		height: 40px;
		background: #5483eb;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 4px 0;
		&:hover {
			opacity: 0.5;
		}
	}
	@media (max-width: 800px) {
		font-size: 15px;
	}
`;

const Card = styled.div`
	display: flex;
	width: 98%;
	border: 1px solid black;
	padding: 10px;
	margin: 10px auto;
	justify-content: space-between;
	align-items: center;

	.image {
		img {
			width: 100px;
		}
	}
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
	const [loading, setLoading] = useState(true);
	const [show, setShow] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);
	// const [search, setSearch] = useState("&filters[comment][$contains]=安く");
	const [searchText, setSearchText] = useState("");
	const refSearch = useRef();

	const queryClient = useQueryClient();
	const [modalData, setModalData] = useState({
		id: 0,
		name: "hohoge",
		comment: "fugafuga",
	});

	useEffect(() => {
		if (loading) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [loading]);

	useEffect(() => {
		setLoading(false)
		// console.log("来ました")
	});
	
	const getComments = async (text) => {
		const res = await fetch(
			`https://lusty.asia:1443/api/mercari-comments?sort[0]=updatedAt:desc&populate=*${text}`
			
			);
		console.log("来ました")
			setLoading(false)
		return res.json();
	};

	// 😺CRUDのRead
	const postsQuery = useQuery(["comments", searchText], () =>
		getComments(searchText)
		);

	// 😺CRUDのDelete
	const mutationDelete = useMutation({
		mutationFn: (commentId) => {
			setLoading(true);
			return axios.delete(
				`https://lusty.asia:1443/api/mercari-comments/${commentId}`
			);
		},
		onSuccess: () => {
			//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
			queryClient.invalidateQueries({ queryKey: ["comments"] });
			setLoading(false)
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
			setLoading(false)
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
						image_url: data.image_url,
					},
				}
			);
		},
		onSuccess: () => {
			//invalidateQueriesメソッドを実行することでキャッシュが古くなったとみなし、データを再取得することができます。
			queryClient.invalidateQueries({ queryKey: ["comments"] });
			setLoading(false)
		},
	});

	// if (postsQuery.isLoading) return ();
	if (postsQuery.isError) return <h1>Error loading data!!!</h1>;

	// 🐶 新規登録ボタン
	const clickNew = () => {	
		setModalData({
			id: 0,
			name: "",
			comment: "",
			type: "new",
		});
		setShow(true);
	};
	// 🐶 Editボタン
	const clickEdit = (item) => {
		console.log(item)
		let imageUrl = null;
		imageUrl = `https://lusty.asia:1443/${item.attributes.image_url}`;
		// if (item.attributes.images.data) {
		// 	imageUrl = `https://lusty.asia:1443/${item.attributes.images.data[0].attributes.url}`;
		// }

		setModalData({
			id: item.id,
			name: item.attributes.name,
			comment: item.attributes.comment,
			image: imageUrl,
			type: "edit", // "new"
		});
		setShow(true);
	};

	// 🐶 deleteボタン
	const clickDelete = (item) => {
		let imageUrl = null;
		imageUrl = `https://lusty.asia:1443/${item.attributes.image_url}`;

		setModalData({
			id: item.id,
			name: item.attributes.name,
			comment: item.attributes.comment,
			type: "edit", // "new"
			image: imageUrl,
		});
		setShowConfirm(true);
	};

	// 🦑 Modalで、確認(削除)ボタンが押された時
	const deleteComment = (data) => {
		setShowConfirm(false);
		setLoading(true)
		mutationDelete.mutate(data.id);
	};

	// 🐙 Close Modal
	const closeModal = () => {
		setShow(false);
		setShowConfirm(false);
	};

	// 🐙 Modalで、新規登録/更新 ボタンが押された
	const postModal = (data) => {
		setShow(false);
		setLoading(true)
		// console.log("data=" + JSON.stringify(data));
		// console.log(modalData.type);
		// mutationUpdate.mutate(data);
		if (modalData.type == "new") {

			data.image_url = "";
			if (data.file) {
				console.log("あり");
				const formData = new FormData();
				formData.append("files", data.file);
				axios
					.post("https://lusty.asia:1443/api/upload", formData)
					.then((response) => {
						console.log("res=", response.data[0].url);
						data.image_url = response.data[0].url;
						mutationCreate.mutate({
							data: {
								name: data.name,
								comment: data.comment,
								image_url:data.image_url,
							},
						});
						setLoading(false)
					})
					.catch((error) => {
						console.log("error movie:", error);
					});
			} else {
				console.log("なし");
				mutationCreate.mutate({data: {
					name: data.name,
					comment: data.comment,
				},});
			}
		}

		if (modalData.type == "edit") {
			
			// mediaに画像をアップロードする。
			console.log("Fileあり？", data.file);
			if (data.file) {
				data.image_url = ""   ;
				console.log("あり");
				const formData = new FormData();
				formData.append("files", data.file);
				axios
					.post("https://lusty.asia:1443/api/upload", formData)
					.then((response) => {
						console.log("res=", response.data[0].url);
						data.image_url = response.data[0].url;
						mutationUpdate.mutate(data);
						setLoading(false)
					})
					.catch((error) => {
						console.log("error movie:", error);
					});
			} else {
				console.log("なし");
				mutationUpdate.mutate(data);
			}
		}
	};

	const clickSearch = () => {
		setLoading(true)
		//stateを変更することで、そのstateをwatchしているuseQueryが再度実行されます。
		setSearchText(`&filters[comment][$contains]=${refSearch.current.value}`);
		console.log(refSearch.current.value);

	};
	

	// 検索キーワード入力時に、Enterキーが押された
	const handleKeyDown = (e) => {
		// console.log("key=", e.key);
		if (e.nativeEvent.isComposing || e.key !== "Enter") return;
		setLoading(true)
		clickSearch();
	};
	if (postsQuery.isLoading) {
		return (
			<SpinnerContainer>
				<DotLoader loading={loading} size={50} />
			</SpinnerContainer>
		);
	}


	return (
		<>
			{loading ? (
				<SpinnerContainer>
					<DotLoader loading={loading} size={50} />
				</SpinnerContainer>
			) : null}

			{showConfirm && (
				<ModalConfirm
					post={deleteComment}
					close={closeModal}
					data={modalData}
				/>
			)}
			{show && (
				<Modal setModal={setLoading} post={postModal} close={closeModal} data={modalData} />
			)}

			<Container>
				<Header>
					<div className="logo">
						<p>コメント CRUD</p>
						<input
							ref={refSearch}
							onKeyDown={handleKeyDown}
							autoFocus={true}
						></input>
						<button onClick={() => clickSearch()}>
							<img src={Search} alt="" />
						</button>
					</div>
					<button onClick={() => clickNew()}>新規登録</button>
				</Header>

				{postsQuery.data.data.map((item, index) => (
					<Card key={index}>
						<div>
							<div>{item.id}</div>
							<div>{item.attributes.name}</div>
							<div>{item.attributes.comment}</div>
							<div className="image">
								{item.attributes.image_url ? (
									<img
										src={
											`https://lusty.asia:1443/` +
											item.attributes.image_url
										}
										alt=""
									/>
								) : (
									<div>なし</div>
								)}
							</div>
						</div>

						<div className="operation">
							<button onClick={() => clickEdit(item)}>
								<img src={edit} alt="" />
							</button>
							<button onClick={() => clickDelete(item)}>
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
