import { createSlice } from "@reduxjs/toolkit";

const initialReposState = {
    repos: [],
}

const reposSlice = createSlice({
    name: 'reposSlice',
    initialState: initialReposState,
    reducers: {
        setRepos(state, action) {
            state.repos = action.payload.data;
        }
    }
})
export const reposAction = reposSlice.actions
export default reposSlice;