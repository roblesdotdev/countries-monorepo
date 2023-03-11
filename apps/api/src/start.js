const logger = require("loglevel");
const server = require("./server");
const { conn } = require("./db");
const seed = require("./db/seed");
const { APP_PORT, DB_SYNC } = require("./config");

logger.setLevel(process.env.NODE_ENV !== "production" ? "TRACE" : "SILENT");

server.listen(APP_PORT, async () => {
  logger.info(`✅ Server listening at ${server.address().port}`);
  try {
    await conn.sync({ force: DB_SYNC });
    logger.info("✅ Database is up");
    await seed();
  } catch (err) {
    logger.error(`❌ ${err.message}`);
  }
});
