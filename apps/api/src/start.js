if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const logger = require("loglevel");
const server = require("./server");

const APP_PORT = process.env.APP_PORT || 3001;

logger.setLevel(process.env.NODE_ENV !== "production" ? "TRACE" : "SILENT");

server.listen(APP_PORT, async () => {
  logger.info(`Server listening at ${server.address().port}`);
});
