import app from "./app";

const rawPort = process.env.PORT || "5000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err?: Error) => {
  if (err) {
    console.error("Error listening on port", err);
    process.exit(1);
  }

  console.log(`Server listening on port ${port}`);
});
