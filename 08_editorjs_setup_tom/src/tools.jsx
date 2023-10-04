import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Link from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import CheckList from "@editorjs/checklist";
import CodeTool from "@editorjs/code";
// import TextAlign from "editorjs-text-alignment-blocktune";

export const EDITOR_JS_TOOLS = {
	paragraph: {
		class: Paragraph,
		inlineToolbar: true,
	},
	checkList: CheckList,
	list: {
		class: List,
		inlineToolbar: false,
	},
	header: {
		class: Header,
		config: {
			placeholder: "Enter a header",
			levels: [1, 2, 3, 4],
			defaultLevel: 3,
		},
	},
	delimiter: Delimiter,
	link: Link,
	code: CodeTool,
};
