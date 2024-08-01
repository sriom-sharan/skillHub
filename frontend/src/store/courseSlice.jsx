import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    info:null
};

export const courseSlice = createSlice({
    name:"courses",
    initialState,
    reducers:{

        loadcourse:(state,action)=>{
            state.info = action.payload;
        },
        removecourse:(state)=>{
            state.info = null;
        }
    },
});


export const {loadcourse,removecourse} = courseSlice.actions;
export default courseSlice.reducer;