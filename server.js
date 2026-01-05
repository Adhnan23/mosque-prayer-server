import app from "./src/app.js";

const PORT = process.env.PORT || 3000;
const ENVIRONMENT = process.env.ENVIRONMENT || "undefiend";

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT} in ${ENVIRONMENT} mode`
  );
});
