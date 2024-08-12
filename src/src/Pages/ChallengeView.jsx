import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

function getChallenge(eventId, challengeId) {
  if (eventId === "1" && challengeId === "1") {
    return {
      title: "Challenge 1",
      description: "Print Hello World",
      inputF: "None",
      outputF: "Hello World",
      testCases: [{ input: "", output: "Hello World" }],
      defaultCode: "",
      testCode: {
        // User Uses Print Statement
        usePrint: true,
        function: "",
        functionArgs: [],
      },
    };
  }

  return {
    title: `Event ${eventId} | Challenge ${challengeId}`,
    description:
      "Slice the list to get the first two elements. If the list has less than two elements, return the original array.It should take a list as input and return a list as output. Name of the function should be 'solution'.",
    inputF: "[3, 5, 6, 7]",
    outputF: "[3, 5]",
    testCases: [
      { input: "[1,2,3,4]", output: "[1, 2]" },
      { input: "[4,3,2,1]", output: "[4, 3]" },
      { input: "[1,2]", output: "[1, 2]" },
      { input: "[1]", output: "[1]" },
      { input: "[]", output: "[]" },
    ],
    defaultCode: "def solution(input_data):\n    # Your code here\n",
    testCode: {
      // User Does not Use Print Statement
      usePrint: false,
      function: "soulution",
      functionArgs: ["test_input"],
    },
  };
}

const ChallengeView = () => {
  const { eventId, challengeId } = useParams();

  const [challenge, setChallenge] = useState(null);
  const [userCode, setUserCode] = useState("    ");
  const [result, setResult] = useState("");
  let testSnippet = "";

  const fetchResult = async (code) => {
    try {
      const response = await fetch("http://localhost:2000/api/v2/execute", {
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
        return `HTTP error ! status: ${response.status}`;
      }
      const responseObj = await response.json();
      if (responseObj["run"]["signal"]) {
        return "Time limit exceeded";
      }
      return responseObj["run"]["output"];
    } catch (error) {
      return error.toString();
    }
  };
  
  const runTest = useCallback(async () => {
    for (let i = 0; i < challenge["testCases"].length; i++) {
      const test = challenge["testCases"][i];
      let codeToRun = userCode;
      if (!challenge["testCode"]["usePrint"]) {
        codeToRun = userCode + `\nprint(solution(${test.input}))`;
      }
      const result = await fetchResult(codeToRun);
      setResult(result); // Update the state for UI purposes
      if (result.trim() !== test.output) {
        document.getElementsByClassName(`test_${i}`)[0].style.backgroundColor = "red";
        return { status: false, message: `Test case ${i + 1} failed` };
      } else {
        document.getElementsByClassName(`test_${i}`)[0].style.backgroundColor = "green";
      }
    }
    return { status: true, message: "All test cases passed" };
  }, [userCode, challenge]);

  useEffect(() => {
    setChallenge(getChallenge(eventId, challengeId));
  }, [challengeId, eventId]);

  return (
    <Container>
      <Row>
        <Col>
          {challenge !== null ? (
            <div>
              <Card>
                <Card.Header>{challenge.title}</Card.Header>
                <Card.Body>
                  <Card className="m-2 p-2">
                    Description : {challenge.description}
                  </Card>
                  <Card className="m-2 p-2">
                    Input Format : {challenge.inputF}
                  </Card>
                  <Card className="m-2 p-2">
                    Output Format : {challenge.outputF}
                  </Card>
                </Card.Body>

                <div className="Editor p-1 border m-2 rounded">
                  <Editor
                    height="30vh"
                    defaultLanguage="python"
                    defaultValue={challenge.defaultCode}
                    onChange={(value) => {
                      setUserCode(value);
                    }}
                  />
                </div>
                <Button
                  variant="primary"
                  className="m-2 p-2"
                  onClick={() => {
                    runTest();
                  }}
                >
                  Submit
                </Button>

                <Card.Body>
                  {challenge["testCases"].map((test, index) => (
                    <Card className="m-2 p-2">
                      <Col>
                        <Row className="m-2">
                          {test.input ? <Col>Input : {test.input}</Col> : ''}
                          <Col>Output : {test.output}</Col>
                        </Row>
                      </Col>

                      <Col>
                        <Row className='border p-2 rounded m-2'>
                          <Col className="col-4 rounded p-2 me-2" style={{backgroundColor:'#1e9ae0'}}>Your Output</Col>
                          <Col className={`rounded p-2 test_${index}`}>{result}</Col>
                        </Row>
                      </Col>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
            </div>
          ) : (
            <div className="m-3">Loading...</div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ChallengeView;
