import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import { useParams, Link } from "react-router-dom";

// const Challanges = [
//   {
//     title: "Challange 1",
//     description:
//       "how to create a web platform it should have \
// 1. Admin page \
// 2. New users can create account (with only username and a password) \
// 3. The admin can create an event entity \
// 4. Users can get into a specific event \
// 5. User are provided with set of challenges \
// 6. They can code in a ide in the challenge page and execute their code (python only)\
// 7. There must be a chat session for a event where users can send their messages \
// 8. Admin and the user who put the message can delete it",
//     id: 1,
//   },
//   {
//     title: "Challange 2",
//     description:
//       "how to create a web platform it should have \
// 1. Admin page \
// 2. New users can create account (with only username and a password) \
// 3. The admin can create an event entity \
// 4. Users can get into a specific event \
// 5. User are provided with set of challenges \
// 6. They can code in a ide in the challenge page and execute their code (python only)\
// 7. There must be a chat session for a event where users can send their messages \
// 8. Admin and the user who put the message can delete it",
//     id: 2,
//   },
//   {
//     title: "Challange 3",
//     description:
//       "how to create a web platform it should have \
// 1. Admin page \
// 2. New users can create account (with only username and a password) \
// 3. The admin can create an event entity \
// 4. Users can get into a specific event \
// 5. User are provided with set of challenges \
// 6. They can code in a ide in the challenge page and execute their code (python only)\
// 7. There must be a chat session for a event where users can send their messages \
// 8. Admin and the user who put the message can delete it",
//     id: 3,
//   },
//   {
//     title: "Challange 4",
//     description:
//       "how to create a web platform it should have \
// 1. Admin page \
// 2. New users can create account (with only username and a password) \
// 3. The admin can create an event entity \
// 4. Users can get into a specific event \
// 5. User are provided with set of challenges \
// 6. They can code in a ide in the challenge page and execute their code (python only)\
// 7. There must be a chat session for a event where users can send their messages \
// 8. Admin and the user who put the message can delete it",
//     id: 4,
//   },
// ];

const Challanges = [
  {
      title: 'Challenge 1',
      description: 'Hello World',
      id : 1 
  }
]
function getChallanges(id) {
  return Challanges;
}


function getChallange(id) {
  console.log(id);
}

const EventChallengesView = () => {
  const { eventId } = useParams();

  const allChallanges = getChallanges(eventId);

  return (
    <Container>
      <Row>
        <Col>
          <Card className="mt-2">
            <Card.Header>Event {eventId}</Card.Header>
            <Card.Body>
              {allChallanges.map((challenge, index) => (
                <Link
                  to={`/event/${eventId}/challenge/${challenge["id"]}` } style={{textDecoration:'none'}}
                  className="p-1 col-3"
                >
                  <Row
                    className="m-2 border rounded p-2"
                    style={{ zIndex: 3 }}
                    onClick={() => {
                      getChallange(challenge["id"]);
                    }}
                  >
                    <Row className="p-1">
                      <Card className="p-2 m-2" style={{ textAlign: "center" }}>
                        {challenge["title"]}
                      </Card>
                    </Row>
                    <Row className="p-1">
                      <Card className="p-2 m-2" style={{ textAlign: "center" }}>
                        {challenge["description"]}
                      </Card>
                    </Row>
                  </Row>
                </Link>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EventChallengesView;
