import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

const App = () => {
  // Initialize state
  const [userInput, setUserInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState("all"); // Default filter: all

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("todoList") || "[]");
    setList(storedList);
  }, []);

  // Update localStorage whenever tasks are added, deleted, or modified
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);

  // Add a new task
  const addItem = () => {
    if (userInput.trim() !== "") {
      const newItem = {
        id: Math.random(),
        title: userInput,
        description: descriptionInput || "",
        completed: false,
      };
      setList([...list, newItem]);
      setUserInput("");
      setDescriptionInput("");
    }
  };

  // Delete a task
  const deleteItem = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  // Toggle completion status of a task
  const toggleComplete = (id) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setList(updatedList);
  };

  // Edit task title and description
  const editItem = (id, newTitle, newDescription) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, title: newTitle, description: newDescription } : item
    );
    setList(updatedList);
  };

  // Filter tasks based on completion status
  const filteredList = list.filter((item) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !item.completed;
    } else {
      return item.completed;
    }
  });

  <br></br>

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        TODO LIST
      </Row>

      <hr />
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="add item . . . "
              size="lg"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              aria-label="add something"
              aria-describedby="basic-addon2"
            />
            <FormControl
              placeholder="add description . . . "
              size="lg"
              value={descriptionInput}
              onChange={(e) => setDescriptionInput(e.target.value)}
              aria-label="add description"
              aria-describedby="basic-addon2"
            />
            <InputGroup>
              <Button variant="dark" className="mt-2" onClick={addItem}>
                ADD
              </Button>
            </InputGroup>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 5, offset: 4 }}>
        
          <div className="filters">
            <Button
              variant="outline-primary"
              onClick={() => setFilter("all")}
              active={filter === "all"}
            >
              All
            </Button> &nbsp;
            <Button
              variant="outline-primary"
              onClick={() => setFilter("active")}
              active={filter === "active"}
            >
              Active
            </Button> &nbsp;
            <Button
              variant="outline-primary"
              onClick={() => setFilter("completed")}
              active={filter === "completed"}
            >
              Completed
            </Button>
          </div>

          <br></br>
          <ListGroup>
            {/* map over and print items */}
            {filteredList.map((item) => (
              <ListGroup.Item
                key={item.id}
                variant={item.completed ? "success" : "dark"}
                action
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                <div>
                  <div>{item.title}</div>
                  {item.description && <small>{item.description}</small>}
                </div>
                <span>
                  <Button
                    style={{ marginRight: "10px" }}
                    variant={item.completed ? "success" : "danger"} // Change button color dynamically
                    onClick={() => toggleComplete(item.id)}
                  >
                    {item.completed ? "Incomplete" : "Complete"}
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => {
                      const newTitle = prompt("Edit the todo title:", item.title);
                      const newDescription = prompt("Edit the todo description:", item.description);
                      if (newTitle !== null && newTitle.trim() !== "") {
                        editItem(item.id, newTitle, newDescription);
                      }
                    }}
                  >
                    Edit
                  </Button>
                  &nbsp; &nbsp;
                  <Button
                    variant="light"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </Button>
                </span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;