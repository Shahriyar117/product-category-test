import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import expressApp from "./expressApp";

const PORT = process.env.PORT || 8100;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`Application litening to : ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.log(err);
    process.exit(1);
  });
};

StartServer().then(() => console.log("Server is up!"));
