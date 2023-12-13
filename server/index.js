import express from "express";
import "dotenv/config"
import bodyParser from "body-parser";
import cors from "cors"
import client from "./db/db.js";
import postRouter from "./routes/post.js";

const app = express()

// app.use(express.json())
//set limit for image size
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
    ],
    credentials: true,
  })
);

app.use("/api/post", postRouter)

const PORT = 3000 || process.env.PORT;

client.on("connected", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  app.listen(80, () => {
    console.log("CORS-enabled web server listening on port 80");
  });
});