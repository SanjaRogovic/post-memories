import React, {useContext, useState} from 'react'
import Post from "./Post/Post"
import { Grid, CircularProgress } from '@mui/material'
import { PostContext } from '../../context/PostContext'

const Posts = ({setCurrentId}) => {
    const {posts} = useContext(PostContext)

    // console.log(posts)


  return (
    <>
        {!posts.length ? <CircularProgress sx={{display: "flex", justifyContent: "center", alignItems: "center"}}/> : (
          <Grid container spacing={3} alignItems="stretch" sx={{display: "flex", alignItems: "center"}}>
              {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6}>
                  <Post post={post} setCurrentId={setCurrentId}/>
                </Grid>
              ))}
          </Grid>
        )}
    </>
  )
}

export default Posts