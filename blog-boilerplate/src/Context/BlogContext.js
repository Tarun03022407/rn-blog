// import React, { useState } from "react";

// const BlogContext = React.createContext();

// export const BlogProvider = ({ children }) => {
//   const [blogPost, setBlogPost] = useState([]);
//   const addBlogPost = () => {
//     setBlogPost([
//       ...blogPost,
//       { title: `Blog Post No #${blogPost.length+1}` },
//     ]);
//   };
//   return (
//     <BlogContext.Provider value={{ data: blogPost, addBlogPost }}>
//       {children}
//     </BlogContext.Provider>
//   );
// };

// export default BlogContext;

//using provider
import createContextData from "./createContextData";
import jsonserver from "../../api/jsonserver";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogPosts":
      return action.payload;
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
      // case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    case "del_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);

    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    try {
      const res = await jsonserver.get("/blogPosts");
      dispatch({ type: "get_blogPosts", payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};
const addBlogPost = () => {
  return async (title, content, callback) => {
    await jsonserver.post("/blogPosts", { title, content });
    if (callback) {
      callback();
    }
  };
};
const delBlogPost = (dispatch) => {
  return async (id) => {
    await jsonserver.delete(`/blogPosts/${id}`);
    dispatch({ type: "del_blogpost", payload: id });
  };
};
const editBlogPost = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonserver.put(`/blogPosts/${id}`, { title, content });
    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createContextData(
  blogReducer,
  { addBlogPost, delBlogPost, editBlogPost, getBlogPosts },
  []
);
