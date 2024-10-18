import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios';
import { Blocks } from 'react-loader-spinner'




const AddTask = ({fetchData}) => {

    const dispatch = useDispatch();
    const [loader, setLoader] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const [formData, setformData] = React.useState({
        title: "",
        description: "",
        status: "",
        priority: "",
        dueDate: ""
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        setformData({ ...formData, [name]: value })
    }


    const handleSubmit = (event) => {
        setLoader(true)
        event.preventDefault();
        const newTask = {
            title: formData.title,
            description: formData.description,
            status: formData.status,
            priority: formData.priority,
            dueDate: formData.dueDate,
        };
        // dispatch(addTask(newTask));

        axios.post('http://localhost:8080/tasks', newTask)
            .then((response) => {
                fetchData()
                setLoader(false)
                Swal.fire({
                    icon: "success",
                    title: "Saved",
                    text: "Task Created",
                });
            })
            .catch((err) => {
                setLoader(false)
                Swal.fire({
                    icon: "error",
                    title: "Server Error!",
                    text: err.message,
                });
            });
        handleClose();
    };


    return (
        <React.Fragment>
            <Blocks height="80" width="80" color="#4fa94d" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" visible={loader}/>     

            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Add Task
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit
                }}
            >
                <DialogTitle>Task Details</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.title}
                        onChange={handChange}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData.description}
                        onChange={handChange}
                    />

                    <FormControl fullWidth required margin="dense">
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            name="status"
                            variant="standard"
                            value={formData.status}
                            onChange={handChange}
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="in-progress">In Progress</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth required margin="dense">
                        <InputLabel id="status-label">Priority</InputLabel>
                        <Select
                            labelId="status-label"
                            id="priority"
                            name="priority"
                            variant="standard"
                            value={formData.priority}
                            onChange={handChange}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>


                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="dueDate"
                        label="Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        value={formData.date}
                        onChange={handChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
export default AddTask