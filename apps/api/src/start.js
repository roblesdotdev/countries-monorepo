if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const logger = require("loglevel");
const server = require("./server");
const { conn } = require("./db");

const APP_PORT = process.env.APP_PORT || 3001;
const DB_SYNC = process.env.DB_SYNC || true;

logger.setLevel(process.env.NODE_ENV !== "production" ? "TRACE" : "SILENT");

server.listen(APP_PORT, async () => {
  logger.info(`✅ Server listening at ${server.address().port}`);
  try {
    await conn.sync({ force: DB_SYNC });
    logger.info("✅ Database is up");
  } catch (err) {
    logger.error(`❌ ${err.message}`);
  }
});
