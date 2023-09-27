import React from "react";
import axios from "axios";
import styled from "styled-components";
import EditorJs from "@editorjs/editorjs";
// import EditorJs from "react-editor-js";
// import CodeTool from "@editorjs/code";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";

import { data } from "./data";
import { EDITOR_JS_TOOLS } from "./constants";

import "./styles.css";

const Container = styled.div`
	width: 100%;
	height: 100vh;
	background: skyblue;
`;

function App() {
	const editor = new EditorJs({
		/**
		 * Id of Element that should contain Editor instance
		 */
		holder: "editorjs",
		tools: {
			header: Header,
			list: List,
			image: {
				class: ImageTool,
				config: {
					uploader: {
						async uploadByFile(file) {
							console.log("file=", file);
							const formData = new FormData();
							formData.append("files", file);

							const response = await axios.post(
								"https://lusty.asia:1443/api/upload",
								formData
							);

							console.log("response=", response);
							if (response.data) {
								let url = response.data[0].url;

								let data = {
									success: 1,
									file: {
										// url: "https://www.tesla.com/tesla_theme/assets/img/_vehicle_redesign/roadster_and_semi/roadster/hero.jpg",
										url: `https://lusty.asia:1443${url}`,
									},
								};
								return data;
							}

							// Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzksImlhdCI6MTY5MzYzNjA0NSwiZXhwIjoxNjk2MjI4MDQ1fQ.XqOIm9MyrDFTxozP9lux7gSp1fi8IR7oRnGXTtlPCCA`,
						},
						async uploadByUrl(url) {
							console.log("あああああああ");
							const response = await axios.post(
								"https://lusty.asia:1443/api/upload",
								{
									url,
								}
							);
							console.log(response);
							return response;
						},
					},
					// endpoints: {
					// 	byFile: "https://lusty.asia:1443/api/upload", // Your backend file uploader endpoint
					// 	byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
					// },
				},
			},
		},
	});

	// const editor = new EditorJs({
	// 	holder: "editorjs",
	// 	minHeight: 100,
	// 	tools: {
	// 		code: CodeTool,
	// 		header: Header,
	// 	},
	// 	data: {
	// 		blocks: [
	// 			{
	// 				type: "header",
	// 				data: {
	// 					text: "目次",
	// 					level: 2,
	// 				},
	// 			},
	// 		],
	// 	},
	// 	onReady: () => {
	// 		console.log("Editorjs started");
	// 	},
	// 	onChange: (event) => {
	// 		console.log("event", event);
	// 	},
	// });

	return (
		<>
			<Container>
				Editor.js2
				<div id="editorjs" />
			</Container>
		</>
	);
}

export default App;
