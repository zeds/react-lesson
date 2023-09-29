import { useState } from "react";
import "./App.css";
import Editor from "./Editor";
import jsonData from "./data.json";

// Initial Data
const INITIAL_DATA = {
	time: new Date().getTime(),
	blocks: [
		{
			type: "header",
			data: {
				text: "This is my awesome editor!",
				level: 1,
			},
		},
	],
};

function App() {
	const [data, setData] = useState(jsonData);
	const [isEditMode, setIsEditMode] = useState(false);

	const [contents, setContents] = useState("あれ");

	return (
		<div className="editor">
			<Editor
				data={data}
				onChange={setData}
				editorblock="editorjs-container"
			/>
			<button
				className="savebtn"
				onClick={() => {
					setContents(JSON.stringify(data));
				}}
			>
				Save
			</button>
			<textarea id="w3review" name="w3review" rows="4" cols="50">
				{contents}
			</textarea>{" "}
		</div>
	);
}

export default App;
