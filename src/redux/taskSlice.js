import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
    name: "manage_task",
    initialState: {
        tasks: []
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },

        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        }
    }
})
export const { addTask, removeTask, editTask } = taskSlice.actions

export default taskSlice.reducer



