import React from "react";
import { Button, Card, CardBody, CardTitle, Table } from "reactstrap";
import GenericModal from "../Modal/Modal";
import { firestore } from "../../FireBase/Firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export default function List({ name, type, list }) {
    if (!list) list = [];

    const handleDelete = async (item) => {
        await deleteDoc(doc(firestore, "wishes", item.id));
        window.location.href = "/";
    };
    const handleUpdate = async (item) => {
        await setDoc(doc(firestore, "wishes", item.id), {
            ...item,
            is_done: item.is_done + 1,
        });
        window.location.href = "/";
    };

    return (
        <Card>
            <CardTitle>
                <h2 className="text-center">{name}</h2>
            </CardTitle>
            <CardBody>
                <Table>
                    <thead>
                        <tr>
                            <th className="border-0">#</th>
                            <th className="border-0">Хүсэл</th>
                            <th className="border-0">Биелсэн эсэх</th>
                            {type === 1 && <th className="border-0">Устгах</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item, i) => {
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.wish}</td>
                                    {type === 1 ? (
                                        <td>
                                            {item.is_done === 2 ? (
                                                <>Зөвшөөрсөн</>
                                            ) : item.is_done === 1 ? (
                                                <>Биелсэн</>
                                            ) : (
                                                <GenericModal
                                                    onClick={() => {
                                                        handleUpdate(item);
                                                    }}
                                                    action="Биелсэн"
                                                    title="Итгэлтэй байна уу?"
                                                    body="Та биелүүлсэн гэж бодож байна уу?"
                                                />
                                            )}
                                        </td>
                                    ) : (
                                        <td>
                                            {item.is_done === 0 ? (
                                                <>Биелээгүй</>
                                            ) : item.is_done === 1 ? (
                                                <GenericModal
                                                    onClick={() => {
                                                        handleUpdate(item);
                                                    }}
                                                    action="Зөвшөөрөх"
                                                    title="Итгэлтэй байна уу?"
                                                    body="Та зөвшөөрөхдөө итгэлтэй байна уу?"
                                                />
                                            ) : (
                                                <>Зөвшөөрсөн</>
                                            )}
                                        </td>
                                    )}
                                    {type === 1 && (
                                        <td>
                                            <GenericModal
                                                onClick={() => {
                                                    handleDelete(item);
                                                }}
                                                action="Устгах"
                                                title="Итгэлтэй байна уу?"
                                                body="Та устгахдаа итгэлтэй байна уу?"
                                            />
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
}
