import { Editor } from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

const CodeEditor = () => {
    const editorRef = useRef(null);
    const [value, setValue] = useState("");
    const [language, setLanguage] = useState("javascript");
    const [fontSize, setFontSize] = useState(18);

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.focus();
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleFontSizeChange = (event) => {
        setFontSize(Number(event.target.value));
    };

    const handleSubmit = () => {
        if (editorRef.current) {
            const code = editorRef.current.getValue();
            console.log("Submitted code:", code);
        }
    };

    return (
        <div className="code_editor_wrapper">
            <div className="code_editor_header_content">
                <span className="code_editor_heading">Code</span>

                <div className="editor_controls">
                    <label htmlFor="language_selector">Language: </label>
                    <select
                        id="language_selector"
                        value={language}
                        onChange={handleLanguageChange}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="csharp">Rust</option>
                        <option value="cpp">C++</option>
                        <option value="cpp">C</option>
                        {/* Add more languages as needed */}
                    </select>

                    <label htmlFor="font_size_selector">Font Size:</label>
                    <input
                        id="font_size_selector"
                        type="number"
                        min="10"
                        max="30"
                        value={fontSize}
                        onChange={handleFontSizeChange}
                    />
                </div>
            </div>

            <Editor
                height="90rem"
                defaultLanguage="python"
                theme="vs-dark"
                defaultValue="// Write your code here"
                onMount={handleEditorDidMount}
                value={value}
                onChange={(value) => setValue(value)}
                options={{
                    fontSize: fontSize,
                    fontFamily: "JetBrains Mono",
                    fontLigatures: true,
                    wordWrap: "on",
                    minimap: {
                        enabled: false,
                    },
                    bracketPairColorization: {
                        enabled: true,
                    },
                    cursorBlinking: "blink",
                    formatOnPaste: true,
                    suggest: {
                        showFields: false,
                        showFunctions: false,
                    },
                }}
            />
            <button
                onClick={handleSubmit}
                className="code_editor_submit_button"
            >
                Submit
            </button>
        </div>
    );
};

export default CodeEditor;
