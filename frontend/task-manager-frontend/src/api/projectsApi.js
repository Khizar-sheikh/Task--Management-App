import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/projects" }), // Adjust the base URL as per your backend API endpoint
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (filter) => ({
        url: `/?filter=${filter}`,
      }),
      providesTags: ["Project"],
    }),
    addProject: builder.mutation({
      query: (project) => ({
        url: "/",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Project"],
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Project"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
