import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

function getChallenge(eventId, challengeId) {
  return {
    title: `Event ${eventId} | Challenge ${challengeId}`,
    description: "how to create a web platform it should have",
    inputF: "A B C D",
    outputF: "A B",
  };
}

const ChallengeView = () => {
  const { eventId, challengeId } = useParams();

  const [userCode, setUserCode] = useState("    ");

  const preDefinedCode = [
    "def solution(input_data):",
    "    # Your code here",
    "    ",
    "    return result",
    "",
    "# Test your solution",
    "print(solution(test_input))",
  ];

  const challenge = getChallenge(eventId, challengeId);

  return (
    <Container>
      <Row>
        <Col>
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
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  let code = "";
                  for (let i = 0; i < e.target.elements.length; i++) {
                    if(i!=1){
                      code += e.target.elements[i].value + "\n";
                    }
                  }
                  console.log(code);
                } }
              >
                <Form.Group>
                  <Form.Label className="m-2 p-2">Python IDE</Form.Label>
                  <div
                    className="border p-2"
                    style={{ fontFamily: "monospace" }}
                  >
                    {preDefinedCode.map((line, index) => (
                      <div key={index}>
                        {index === 2 ? (
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onKeyDown={(e) => {
                              if (e.key === "Tab") {
                                e.preventDefault();
                                const start = e.target.selectionStart;
                                const end = e.target.selectionEnd;
                                setUserCode(
                                  userCode.substring(0, start) +
                                    "    " +
                                    userCode.substring(end)
                                );
                              }
                            }}
                            // defaultValue={'    '}
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            style={{
                              width: "100%",
                              border: "none",
                              borderBottom: "1px solid #ced4da",
                              resize: "vertical",
                              fontFamily: "inherit",
                            }}
                          />
                        ) : (
                          <Form.Control
                            plaintext
                            readOnly
                            defaultValue={line}
                            style={{
                              fontFamily: "inherit",
                              padding: "0.375rem 0.75rem",
                              marginBottom: "0.25rem",
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </Form.Group>
                <Button className="m-2 p-2" variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChallengeView;
