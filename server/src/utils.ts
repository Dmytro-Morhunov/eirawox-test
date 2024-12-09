import * as redis from "redis";

const redisClient = redis.createClient();

(async () => {
  await redisClient.connect();
})();

redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("error", (err) =>
  console.log("Redis Client Connection Error", err)
);

export { redisClient };
