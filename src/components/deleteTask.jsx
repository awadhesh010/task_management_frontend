import axios from 'axios';
import { Button } from '@mui/material';
import Swal from 'sweetalert2'
import { Blocks } from 'react-loader-spinner'
import { useState } from 'react';

const DeleteTask = ({ data, fetchData }) => {
    const [loader, setLoader] = useState(false)

    const handleDelete = () => {
        if (data) {
            setLoader(true)
            axios.delete(`http://localhost:8080/tasks/delete/${data._id}`)
                .then((res) => {
                    setLoader(false)
                    fetchData()
                    Swal.fire({
                        icon: "success",
                        title: "Deleted",
                        text: "Data Deleted Successfuly",
                    });
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
    };


    const handleDeleteClick = () => {
        const confirm = window.confirm(`Are you sure ?`);
        if (confirm) {
            handleDelete();
        }
    };


    return (
        <>
            <Blocks height="80" width="80" color="#4fa94d" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" visible={loader} />

            <Button variant="outlined" color="error" onClick={handleDeleteClick}>
                <i className="ri-delete-bin-line" style={{ fontSize: ".75rem" }} />
            </Button>
        </>
    )
}

export default DeleteTask;