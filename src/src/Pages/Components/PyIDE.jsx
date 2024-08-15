import Editor from "@monaco-editor/react";
import { useRef } from "react";
import React, { useState, useCallback } from "react";
import { Row, Button } from "react-bootstrap";
import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor"
loader.config({ monaco });

import { IP, PORT } from "../../settings.json";

const PyIDE = () => {
    const editorRef = useRef(null);
    const [userCode, setUserCode] = useState("    ");
    const [result, setResult] = useState("");
    
    
    const fetchResult = useCallback(async (code) => {
        try {
          const response = await fetch(`http://${IP}:${PORT}/api/v2/execute`, {
            method: "POST",
            headers: {
              "Content-Length": `${code.length}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              language: "python",
              version: "3.12.0",
              files: [{ name: "main.py", content: code }],
            }),
          });
          if (!response.ok) {
            setResult(`HTTP error ! status: ${response.status}`) ;
          }
          const responseObj = await response.json();
          console.log(responseObj["run"]["signal"])
          if (responseObj["run"]["signal"]) {
            setResult("Time limit exceeded");
            return ;
          }
          if(responseObj["run"]["output"].trim()===""){
            setResult("<No Output>")
            return ;
          }
          setResult(responseObj["run"]["output"]) ;
        } catch (error) {
          setResult(error.toString()) ;
        }
      }, [userCode])

    function handleEditorDidMount(editor, monaco) {
      editorRef.current = editor;

  
      // Add the command
      editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Enter, function() {
        fetchResult(editor.getValue());
      });
  
      // Prevent default Shift+Enter behavior
      editor.onKeyDown(function(e) {
        if (e.keyCode === monaco.KeyCode.Enter && e.shiftKey) {
          e.preventDefault();
        }
      });
    }
  
  
    return (
      <>
      
        <Editor
            height="30vh"
            defaultLanguage="python"
            defaultValue=""
            onMount={handleEditorDidMount}
            onChange={(value) => {
            setUserCode(value);
            }}
        />

        <Button
            variant="primary"
            className="m-2 p-2"
            onClick={() => {
            fetchResult(userCode);
            }}
            >
            Submit
        </Button>

        <Row className='m-3'>
            <div className="border m-2 p-2 rounded">
                <h3 className=''>OUTPUT</h3>
                <pre>{result}</pre>
            </div>
        </Row>

      </>
    );
}

export default PyIDE