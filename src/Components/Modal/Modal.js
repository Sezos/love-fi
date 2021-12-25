import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

function GenericModal({ onClick, params, action, title, body }) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };
    const handleConfirm = () => {
        onClick(params);
        setShow(false);
    };

    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
    };

    return (
        <>
            <Button onClick={handleShow} size="sm">
                {action}
            </Button>
            <Modal
                style={{ fontSize: "13px" }}
                show={show}
                onHide={handleClose}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button size="sm" variant="secondary" onClick={handleClose}>
                        Хаах
                    </Button>
                    <Button size="sm" onClick={handleConfirm}>
                        {action}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default GenericModal;
