import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react"; // Import setupListeners from RTK-Query
import tasksReducer from "./tasksSlice";
import projectsReducer from "./projectSlice";
import { tasksApi } from "./../api/tasksApi"; // Import tasksApi
import { projectsApi } from "./../api/projectsApi";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    projects: projectsReducer,
    [tasksApi.reducerPath]: tasksApi.reducer, // Add tasksApi reducer under its reducerPath
    [projectsApi.reducerPath]: projectsApi.reducer, // Add projectsApi reducer under its reducerPath
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware, projectsApi.middleware), // Add RTK-Query middleware
});

setupListeners(store.dispatch); // Enable automatic subscription management

export default store;
