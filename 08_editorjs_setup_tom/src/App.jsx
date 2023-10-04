import { useState } from "react";
import "./App.css";
import Editor from "./Editor";
import EditorTextParser from "./components/EditorTextParser";
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

	function toggleEditMode() {
		if (isEditMode) {
			setIsEditMode(false);
			console.log("Edit mode is now disabled");
		} else {
			setIsEditMode(true);
			console.log("Edit mode is now enabled");
		}
	}

	return (
		<div className="container">
			<button onClick={toggleEditMode}>Toggle Edit Mode</button>
			<div className="editor">
				{isEditMode ? (
					<Editor
						data={data}
						onChange={setData}
						editorblock="editorjs-container"
					/>
				) : (
					// <div>hoge</div>
					<EditorTextParser data={data} />
				)}
				<button
					className="savebtn"
					onClick={() => {
						console.log(JSON.stringify(data));
						setContents(JSON.stringify(data));
					}}
				>
					Save
				</button>
				<textarea id="w3review" name="w3review" rows="4" cols="50">
					{contents}
				</textarea>{" "}
			</div>
		</div>
	);
}

export default App;
