import 'bootstrap/dist/css/bootstrap.min.css';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import CompletedTask from './components/completedTask';
import PendingTask from './components/pendingTask';
import InprogressTask from './components/inprogressTask';
import AddTask from './components/addTask';
import 'remixicon/fonts/remixicon.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Draggable, Droppable } from 'react-drag-and-drop';
import Swal from 'sweetalert2'



function App() {
  const [tasks, setTask] = useState([]);
 
    const handleAddTask = () => {
      fetchData()
    };
  

  const fetchData = () => {
    axios.get("http://localhost:8080/tasks")
      .then((response) => setTask(response.data))
      .catch((err) => console.log(err)
      )
  }

  useEffect(() => {
    fetchData()
  }, []);

  const postData = (drop) => {
    axios.put('http://localhost:8080/tasks/edit', drop)
      .then((response) => {
        fetchData()
        Swal.fire({
          icon: "success",
          title: "Dropped",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Try Again!",
        });
      });
  }

  const onDrop = (data) => {

    if (data.pending === undefined) {
      const value = data.completed !== "" ? data.completed : data['in-progress']
      let droppedData = JSON.parse(value);
      droppedData.status = "pending";

      postData(droppedData)
    }

    else if (data['in-progress'] === undefined) {
      const value = data.pending !== "" ? data.pending : data.completed;
      let droppedData = JSON.parse(value);
      droppedData.status = "in-progress";

      postData(droppedData)
    }

    else if (data.completed === undefined) {
      const value = data.pending !== "" ? data.pending : data['in-progress']
      let droppedData = JSON.parse(value);
      droppedData.status = "completed";

      postData(droppedData)
    }

  };


  return (
    <>
      <div style={{ background: "#cce6ea" }}>
        <div style={{ display: 'flex', justifyContent: "center", fontSize: "2rem", fontWeight: "bolder", color: "#25e5f7" }}>Manage Task</div>
        <div style={{ display: 'flex', justifyContent: "center", margin: "10px" }}><AddTask fetchData={handleAddTask} /></div>

        <Grid
          container
          justifyContent="center"
          style={{ minHeight: '90vh', margin: "10px" }}
        >
          <Grid item md={3} sm={12} sx={{ border: '1px solid black' }}>
            <Box sx={{ backgroundColor: "#f48998" }}>
              <center><h2 style={{ padding: "3px" }}>Pending</h2></center>
            </Box>

            <Droppable types={['in-progress', 'completed']} onDrop={(data) => onDrop(data, 'in-progress')}>
              <div style={{ minHeight: '90vh' }}>
                {
                  tasks.map((item, index) => (
                    item.status === "pending" ? <Draggable type="pending" data={JSON.stringify(item)} key={index}><PendingTask data={item} fetchData={handleAddTask}  key={index} /></Draggable> : null
                  ))
                }
              </div>
            </Droppable>
          </Grid>



          <Grid item md={3} sm={12} sx={{ border: '1px solid black' }}>
            <Box sx={{ backgroundColor: "#f2e06f" }}>
              <center><h2 style={{ padding: "3px" }}>In Progress</h2></center>
            </Box>

            <Droppable types={['pending', 'completed']} onDrop={onDrop}>
              <div style={{ minHeight: '90vh' }}>
                {
                  tasks.map((item, index) => (
                    item.status === "in-progress" ? <Draggable type="in-progress" data={JSON.stringify(item)} key={index}><InprogressTask data={item} key={index} fetchData={handleAddTask} /></Draggable> : null
                  ))
                }
              </div>
            </Droppable>
          </Grid>



          <Grid item md={3} sm={12} sx={{ border: '1px solid black' }}>

            <Box sx={{ backgroundColor: "#07770c" }}>
              <center><h2 style={{ padding: "3px" }}>Completed</h2></center>
            </Box>

            <Droppable types={['pending', 'in-progress']} onDrop={onDrop}>
              <div style={{ minHeight: '90vh' }}>

                {
                  tasks.map((item, index) => (
                    item.status === "completed" ? <Draggable type="completed" data={JSON.stringify(item)} key={index}><CompletedTask data={item} key={index} fetchData={handleAddTask} /></Draggable> : null
                  ))
                }
              </div>
            </Droppable>
          </Grid>

        </Grid>
      </div>
    </>

  );
}

export default App;


