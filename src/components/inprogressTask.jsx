import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import EditTask from './editTask';
import moment from 'moment';
import DeleteTask from './deleteTask';


const InprogressTask = ({ data, fetchData }) => {
  const [task, setTask] = React.useState(null);
  const [deleteData, setDeleateData] = React.useState(null);

  return (
    <Card sx={{ minWidth: 275, margin: "10px" }}>

      <Button type='button' onClick={() => setTask(data)}> <EditTask data={task} fetchData={fetchData} /></Button>         {/* used edit component inside button */}
      <DeleteTask data={data} fetchData={fetchData} />
      
      <CardContent>
        <Typography gutterBottom sx={{ fontSize: 18 }}>
          {data.title}
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          {data.description}
        </Typography>

        <Typography variant="body2">
          {data.priority}
        </Typography>

        <Typography variant="body2">
          Due Date : {moment(data.dueDate).format("DD-MM-YYYY")}
        </Typography>
      </CardContent>

    </Card>
  )
}

export default InprogressTask;