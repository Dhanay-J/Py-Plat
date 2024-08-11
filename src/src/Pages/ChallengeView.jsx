import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

function getChallenge(eventId, challengeId) {
  return {
    title: `Event ${eventId} | Challenge ${challengeId}`,
    description: "Slice the list to get the first two elements. If the list has less than two elements, return the original array.It should take a list as input and return a list as output. Name of the function should be 'solution'.",
    inputF: "[3, 5, 6, 7]",
    outputF: "[3, 5]",
    testCases:[
      {input:'[1,2,3,4]', output:'[1, 2]'},
      {input:'[4,3,2,1]', output:'[4, 3]'},
      {input:'[1,2]', output:'[1, 2]'},
      {input:'[1]', output:'[1]'},
      {input:'[]', output:'[]'},
    ],
    defaultCode:"def solution(input_data):\n    # Your code here\n",
    testCode:{
      usePrint:false,
      function:"soulution",
      functionArgs:["test_input"],
    }
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
      const response = await fetch('http://localhost:2000/api/v2/execute', {
        method: 'POST',
        headers: {
          'Content-Length':`${code.length}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          language: 'python',
          version: '3.12.0',
          files:[{name: 'main.py', content: code}]
         }),
      });

      if (!response.ok) {
        setResult(`HTTP error ! status: ${response.status}`);
      }

      const responseObj = await response.json();
      if (responseObj['run']['signal']){
        const signal = responseObj['run']['signal'];
          setResult('Time limit exceeded');
          return;
      }
      // console.log(responseObj['run']['output']);
      setResult(responseObj['run']['output']);
      
    } catch (error) {
      setResult(error.toString());
  
      // console.log(error.toString());
    }finally{
      return result;
    }
  };

  const runTest = async () => { 
    for (let i = 0; i < challenge['testCases'].length; i++){
      const test = challenge['testCases'][i];
      console.log(test);

      const code = userCode + `\nprint(solution(${test.input}))`;
      console.log(code);
      const ans = await fetchResult(code);
      
      if (result.trim() !== test.output){
        console.log(ans,'|', test.output);
        document.getElementsByClassName(`test_${i}`)[0].style.backgroundColor = 'red';
        return {status: false, message: `Test case ${i+1} failed`}
      }else{
        document.getElementsByClassName(`test_${i}`)[0].style.backgroundColor = 'green';
      }
    }
    return {status: true, message: 'All test cases passed'}
  }

  useEffect(() => {
    setChallenge(getChallenge(eventId, challengeId));
  }, [challengeId, eventId]);

  return (
    <Container>
      <Row>
        <Col>
          {challenge !== null ? 
          
          <div>
            <Card>
            <Card.Header>{challenge.title}</Card.Header>
            <Card.Body>
              <Card className="m-2 p-2">
                Description : {challenge.description}
              </Card>
              <Card className="m-2 p-2">Input Format : {challenge.inputF}</Card>
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
              
              {challenge['testCases'].map((test, index) => 

                (
                <Card className="m-2 p-2">
                  <Col>
                    <Row className="m-2">
                      <Col>
                        Input : {test.input}
                      </Col>
                      <Col>
                        Output : {test.output}
                      </Col>
                    </Row>
                  </Col>

                  <Col>
                    <Row className={`border p-2 rounded m-2 test_${index}`}>
                      <Col className="col-4">
                        Your Output
                      </Col>
                      <Col>
                          hai
                      </Col>
                    </Row>
                  </Col>
                </Card>
                ))
              }
              
            </Card.Body>


          </Card>
          </div>
          : 
          
          <div className="m-3">
            Loading...
          </div>
          }
        </Col>
      </Row>
    </Container>
  );
};

export default ChallengeView;
