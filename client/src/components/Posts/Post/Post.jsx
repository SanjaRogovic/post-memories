import React, { useContext } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { PostContext } from "../../../context/PostContext";


const Post = ({ post, setCurrentId }) => {
  
  const { deletePost, likePost } = useContext(PostContext);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardMedia
        image={post.selectedFile}
        title={post.title}
        sx={{
          height: "0",
          paddingTop: "56.25%",
          backgroundColor: "rgba(0, 0, 0, 0.5",
          backgroundBlendMode: "darken",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
        }}
      >
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
        }}
      >
        <Button
          style={{
            color: "white",
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
          size="large"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>

      <div style={{ padding: "10px" }}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography variant="h5" gutterBottom sx={{ padding: "5px 16px" }}>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          padding: "5px 16px 8px 16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button color="primary" size="small" onClick={() => likePost(post._id)}>
          <ThumbUpOffAltIcon fontSize="small" />
          &nbsp; Like &nbsp; {post.likeCount}
        </Button>
        <Button
          color="primary"
          size="small"
          onClick={() => deletePost(post._id)}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
