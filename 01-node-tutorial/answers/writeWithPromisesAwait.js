const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  try {
    await writeFile("temp.txt", "Line 1\n");
    await writeFile("temp.txt", "Line 2\n", { flag: "a" });
    await writeFile("temp.txt", "Line 3\n", { flag: "a" });
  } catch (err) {
    console.log("An error occurred during writing: ", err);
  }
};

const reader = async () => {
  try {
    const data = await readFile("temp.txt", "utf-8");
    console.log("File contents:\n", data);
  } catch (err) {
    console.log("An error occurred during reading: ", err);
  }
};

const readWrite = async () => {
  await writer();
  await reader();
};

readWrite();
