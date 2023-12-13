import React, { useState, useContext, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import FileBase from "react-file-base64";
import { PostContext } from "../../context/PostContext";

const Form = ({ currentId, setCurrentId }) => {
  const { createPost, updatePost, posts } = useContext(PostContext);
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = currentId ? posts.find((post) => post._id === currentId) : null;

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId) {
      await updatePost(currentId, postData);
    } else {
      await createPost(postData);
    }

    handleClear();
  };

  const handleClear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper sx={{ padding: "10px" }}>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        <Typography variant="h6" align="center">
          {currentId ? "Edit" : "Create"} a memory
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
          sx={{ width: "97%", margin: "10px 0" }}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          sx={{ width: "97%", margin: "10px 0" }}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
          sx={{ width: "97%", margin: "10px 0" }}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
          sx={{ width: "97%", margin: "10px 0" }}
        />
        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
          sx={{ marginBottom: "10px", marginTop: "10px" }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleClear}
          fullWidth
          sx={{ marginBottom: "10px" }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
