import React, { useContext, useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from "@mui/material";
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import memories from "./images/memories.png";
// import { PostContext } from "./context/PostContext";
import "./App.css";

const App = () => {
  // const { posts } = useContext(PostContext);
  const [currentId, setCurrentId] = useState(null);

  return (
    <Container maxWidth="lg">
      <AppBar
        position="static"
        color="inherit"
        sx={{
          borderRadius: 15,
          margin: "30px 0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          className="header"
          variant="h2"
          align="center"
          sx={{ color: "rgba(0,183,255, 1)", padding: "8px" }}
        >
          Memories
        </Typography>
        <img
          src={memories}
          alt="memory"
          height="60"
          sx={{ marginLeft: "15px" }}
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            className="container"
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
