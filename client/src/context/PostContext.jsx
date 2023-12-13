import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch posts on component mount
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/post");
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const createPost = async (newPost) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/post",
        newPost
      );
      setPosts([...posts, response.data]);
    } catch (error) {
      setError(error.message);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/post/${id}`,
        updatedPost
      );

      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
    } catch (error) {
      setError(error.message);
    }
  };

  const likePost = async (id, likedPost) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/post/like/${id}`,
        likedPost
      );

      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
    } catch (error) {
      setError(error.message);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/post/${id}`);

      setPosts(posts.filter((post) => post._id !== id)); //keep all the posts except the one where id matches the payload id
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        error,
        createPost,
        loading,
        updatePost,
        deletePost,
        likePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
