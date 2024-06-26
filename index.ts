import cors from "cors";
import routes from "./routes";
import express from "express";
import { connectToDatabase } from "./db";

const app = express();
const PORT = 8080;

app.use(cors({ origin: ["http://localhost:3000", "http://localhost:5173"], credentials: true }));
app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));


app.use("/video", routes);
app.get("/", async (_, res) => {
  res.send("Welcome to amazing video stream verse");
});

connectToDatabase(() => {
  app.listen(PORT, async () => {
    console.log(`Server base bath is http://127.0.0.1:${PORT}`);
  });
});
