import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchPost = createAsyncThunk("post/fetchPosts", async () => {
    const { data } = await axios.get("/post")
    console.log(data)
    return data
})

export const fetchTags = createAsyncThunk("post/fetchTags", async () => {
    const { data } = await axios.get("/tags")
    console.log(data)
    return data
})

export const fetchRemovePost = createAsyncThunk("post/fetchRemovePost", async (id) => {
    axios.delete(`/post/${id}`)
})

const initialState = {
    posts: {
        items: [],
        status: "loading"
    },
    tags: {
        items: [],
        status: "loading"
    },
}

const postsSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: {
        //Получение статей 
        [fetchPost.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = "loading"
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded"
        },
        [fetchPost.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error"
        },
        //Получение тегов
        [fetchTags.pending]: (state) => {
            state.tags.items = [];
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = "loaded"
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = "error"
        },
        //Удаление статьи
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(ob => ob._id !== action.meta.arg)
        },
    }
})

export const { } = postsSlice.actions;

export default postsSlice.reducer;