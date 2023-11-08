import "./App.css";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

export type BlockNoteEditorOptions = Partial<{
	editable: boolean;
	// initialContent: PartialBlock[];
	editorDOMAttributes: Record<string, string>;
	onEditorReady: (editor: BlockNoteEditor) => void;
	onEditorContentChange: (editor: BlockNoteEditor) => void;
	onTextCursorPositionChange: (editor: BlockNoteEditor) => void;
	// slashMenuItems: ReactSlashMenuItem[];
	defaultStyles: boolean;
	uploadFile: (file: File) => Promise<string>;
}>;

function App() {
	const editor: BlockNoteEditor = useBlockNote({
    editable: true,
    // initialContent: PartialBlock[];
    editorDOMAttributes: Record<string, string>;
    onEditorReady: (editor: BlockNoteEditor) => void;
    onEditorContentChange: (editor: BlockNoteEditor) => void;
    onTextCursorPositionChange: (editor: BlockNoteEditor) => void;
    // slashMenuItems: ReactSlashMenuItem[];
    defaultStyles: boolean;
    uploadFile: (file: File) => Promise<string>;
  
  });

	// Renders the editor instance using a React component.
	return <BlockNoteView editor={editor} />;
}

export default App;
