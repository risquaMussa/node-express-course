const { createReadStream } = require("fs");
const path = require("path");

const stream = createReadStream(path.join(__dirname, "../content/big.txt"), {
  encoding: "utf8",
  highWaterMark: 200,
});

let chunkCount = 0;

stream.on("data", (chunk) => {
  chunkCount++;
  console.log(`Chunk ${chunkCount}:\n`, chunk);
});

stream.on("end", () => {
  console.log(`Finished. Total chunks: ${chunkCount}`);
});

stream.on("error", (err) => {
  console.log("Stream error: ", err);
});
