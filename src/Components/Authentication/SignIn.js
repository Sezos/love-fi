import React, { useRef } from "react";
import { useAuth } from "../../Context/AuthContext";
import {
    Card,
    CardBody,
    Form,
    Button,
    FormGroup,
    Label,
    Input,
} from "reactstrap";

import { useAlert } from "react-alert";
export default function SignIn() {
    const { login } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const alert = useAlert();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            console.log(emailRef.current.value, passwordRef.current.value);
            const sth = await login(
                emailRef.current.value,
                passwordRef.current.value
            );
            console.log(sth);
        } catch (err) {
            alert.show("Нэвтэрч чадсангүй, дахин оролдоно уу!");
        }
    }

    return (
        <div>
            <Card>
                <CardBody>
                    <h2 className="text-center mb-4">Login</h2>
                    <Form>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                innerRef={emailRef}
                                required
                            ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                innerRef={passwordRef}
                                type="password"
                                required
                            ></Input>
                        </FormGroup>
                        <Button
                            onClick={handleSubmit}
                            color="primary"
                            className="w-100"
                        >
                            Log In
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
}
