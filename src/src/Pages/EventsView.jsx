import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Events = [
  {
    title: "Event 1",
    description:
      "how to create a web platform it should have \
1. Admin page \
2. New users can create account (with only username and a password) \
3. The admin can create an event entity \
4. Users can get into a specific event \
5. User are provided with set of challenges \
6. They can code in a ide in the challenge page and execute their code (python only)\
7. There must be a chat session for a event where users can send their messages \
8. Admin and the user who put the message can delete it",
    id: 1,
  },
  {
    title: "Event 2",
    description:
      "how to create a web platform it should have \
1. Admin page \
2. New users can create account (with only username and a password) \
3. The admin can create an event entity \
4. Users can get into a specific event \
5. User are provided with set of challenges \
6. They can code in a ide in the challenge page and execute their code (python only)\
7. There must be a chat session for a event where users can send their messages \
8. Admin and the user who put the message can delete it",
    id: 2,
  },
  {
    title: "Event 3",
    description:
      "how to create a web platform it should have \
1. Admin page \
2. New users can create account (with only username and a password) \
3. The admin can create an event entity \
4. Users can get into a specific event \
5. User are provided with set of challenges \
6. They can code in a ide in the challenge page and execute their code (python only)\
7. There must be a chat session for a event where users can send their messages \
8. Admin and the user who put the message can delete it",
    id: 3,
  },
  {
    title: "Event 4",
    description:
      "how to create a web platform it should have \
1. Admin page \
2. New users can create account (with only username and a password) \
3. The admin can create an event entity \
4. Users can get into a specific event \
5. User are provided with set of challenges \
6. They can code in a ide in the challenge page and execute their code (python only)\
7. There must be a chat session for a event where users can send their messages \
8. Admin and the user who put the message can delete it",
    id: 4,
  },
];

const EventsView = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Header>Header</Card.Header>
            <Card.Body>
              {Events.map((event, index) => (
                <>
                  <Row
                    className="m-2 border rounded p-2"
                    style={{ zIndex: 3 }}
                    onClick={() => {
                      getEvent(event["id"]);
                    }}
                  >
                    <Link to={`/event/${event["id"]}`}>
                      <Col className="p-1 col-3">
                        <Card className="p-2" style={{ textAlign: "center" }}>
                          {event["title"]}
                        </Card>
                      </Col>
                      <Col className="p-1">
                        <Card className="p-2" style={{ textAlign: "center" }}>
                          {event["description"]}
                        </Card>
                      </Col>
                    </Link>
                  </Row>
                </>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventsView;
