import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Blocks } from 'react-loader-spinner'



const EditTask = ({ data, fetchData }) => {
    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "",
        priority: "",
        dueDate: "",
        _id: ""
    })

    const resetForm = ()=>{
        setFormData(
            {
                title: "",
                description: "",
                status: "",
                priority: "",
                dueDate: ""
            }
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })

    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        axios.put('http://localhost:8080/tasks/edit', formData)
            .then((response) => {
                setLoader(false)
                fetchData()
                Swal.fire({
                    icon: "success",
                    title: "Updated",
                    text: "Data Edited Successfuly",
                });
                fetchData();
                resetForm();
            })
            .catch((err) => {
                setLoader(false)
                Swal.fire({
                    icon: "error",
                    title: "Server Error",
                    text: err.message,
                });
            });

    }

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title || "",
                description: data.description || "",
                status: data.status || "",
                priority: data.priority || "",
                dueDate: data.dueDate || "",
                _id: data._id || ""
            });
        }
    }, [data]);


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="ri-edit-box-fill"></i>            {/* //edit botton to open box model */}
            </Button>
            <Blocks height="80" width="80" color="#4fa94d" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" visible={loader} />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name='title' type="text" value={formData.title} onChange={handleChange} />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='description' type="text" value={formData.description} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Status</Form.Label>
                            <Form.Select name='status' value={formData.status} onChange={handleChange}>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Priority</Form.Label>
                            <Form.Select name='priority' value={formData.priority} onChange={handleChange}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control name='dueDate' value={formData.dueDate} type="date" onChange={handleChange} />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit' onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditTask;