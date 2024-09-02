import cors from "cors";
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

//parsers
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ridex-car-rental.netlify.app"],
    credentials: true,
  })
);

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(notFound);
app.use(globalErrorHandler);
export default app;
