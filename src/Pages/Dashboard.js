import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Alert } from "reactstrap";
import { Modal } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import List from "./../Components/Dashboard/List";
import { firestore } from "../FireBase/Firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export default function Dashboard() {
    const { logout, currentUser } = useAuth();
    console.log(currentUser);
    const [wishes1, setWishes1] = useState([]);
    const [wishes2, setWishes2] = useState([]);
    const [newWish, setNewWish] = useState([]);
    const [isCreateShow, setIsCreateShow] = useState(false);

    const wishCollection = collection(firestore, "wishes");

    const arr =
        currentUser.email === "badral@love.com"
            ? ["Badral", "Nana"]
            : ["Nana", "Badral"];

    useEffect(() => {
        async function start() {
            const querySnapshot = await getDocs(wishCollection);
            const docs1 = [];
            const docs2 = [];

            querySnapshot.forEach((doc) => {
                console.log(doc.data());
                if (currentUser.email === doc.data().assignee)
                    docs1.push({ id: doc.id, ...doc.data() });
                else docs2.push({ id: doc.id, ...doc.data() });
            });

            setWishes1(docs1);
            setWishes2(docs2);
        }
        start();
    }, []);

    const createWish = async () => {
        await addDoc(wishCollection, {
            wish: newWish,
            assignee:
                currentUser.email === "badral@love.com"
                    ? "nana@love.com"
                    : "badral@love.com",
            is_done: 0,
        });
        window.location.href = "/";
    };

    const handleClose = () => {
        setIsCreateShow(false);
    };

    return (
        <div>
            <Modal
                style={{ fontSize: "13px" }}
                show={isCreateShow}
                onHide={handleClose}
            >
                <Modal.Header closeButton>Хүсэл Үүсгэх</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Input
                            placeholder="Хүсэл"
                            onChange={(e) => {
                                setNewWish(e.target.value);
                            }}
                        ></Input>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Col md="10"></Col>

                        <Col md="1">
                            <Button
                                size="sm"
                                color="primary"
                                onClick={createWish}
                            >
                                Үүсгэх
                            </Button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col md="1"></Col>
                <Col md="10">
                    <Row className="mt-5">
                        <Col md="5"></Col>
                        <Col md="2" className="text-center">
                            <h1>Wish List</h1>
                        </Col>
                        <Col md="4"></Col>
                        <Col md="1">
                            <Button
                                className="mt-3"
                                color="success"
                                size="sm"
                                onClick={() => {
                                    setIsCreateShow(true);
                                }}
                            >
                                Үүсгэх
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <List name={arr[0]} type={1} list={wishes1}></List>
                        </Col>
                        <Col>
                            <List name={arr[1]} type={2} list={wishes2}></List>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Button
                onClick={() => {
                    logout();
                }}
                color="danger"
                size="sm"
                style={logOutStyle}
            >
                Log Out
            </Button>
        </div>
    );
}
const logOutStyle = { position: "absolute", top: "10px", right: "10px" };
