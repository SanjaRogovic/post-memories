import express from "express"
import Post from "../models/Post.js"

const postRouter = express.Router()


postRouter.get("/", async (req, res) => {
    try {
        const response = await Post.find()

        if(!response){
            return res.status(404).json({ message: "Posts not found"})
        }

        res.status(200).json(response)
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})


postRouter.post("/", async (req, res) => {
    try {
        const response = await Post.create(req.body)

        if(!response){
            res.status(409).json({ message: error.message})
        }

        await response.save()

        res.status(201).json(response)
        
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})


postRouter.put("/:id", async (req, res) => {
    try {
        const {id: _id} = req.params
        const post = req.body

        const response = await Post.findByIdAndUpdate(_id, {...post, _id}, {new: true})

        if (!response) {
            res.status(404).json({ message: 'Post not found'})
        }

        res.status(201).json(response)     
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})


postRouter.put("/like/:id", async (req, res) => {
    try {
        const {id} = req.params
        // console.log("POST ID", id)
    
        const response = await Post.findById(id)

        if (!response) {
            res.status(404).json({ message: 'Post not found'})
        }

        const likedPost = await Post.findByIdAndUpdate(id, {likeCount: response.likeCount + 1}, {new: true})

        res.status(201).json(likedPost)     
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})


postRouter.delete("/:id", async (req, res) => {
    try {
        const {id} = req.params

        const response = await Post.findByIdAndDelete(id)

        if (!response) {
            res.status(404).json({ message: 'Post not found'})
        }

        res.status(201).json(response)     
        
    } catch (error) {
        res.status(500).json(error.message)
    }
})

export default postRouter