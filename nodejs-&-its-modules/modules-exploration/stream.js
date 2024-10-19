// const fs = require("fs");

// const start = new Date();

// const readStream = fs.createReadStream("largeFile.txt", { encoding: "utf8" });

// readStream.on("error", (error) => {
//   console.log(error);
// });

// const beforeStart = Date.now();
// readStream.on("data", (chunk) => {
//   console.log(chunk);
// });

// readStream.on("close", () => {
//   const end = new Date();
//   console.log(
//     "Time Taken:- ",
//     end.getSeconds() - start.getSeconds(),
//     " seconds"
//   );
// });

const fs = require("fs");

const start = new Date();

fs.readFile("largeFile.txt", "utf8", (err, data) => {
  if (err) throw err;

  console.log(data);

  const end = new Date();
  console.log(
    "Time Taken:- ",
    end.getSeconds() - start.getSeconds(),
    " seconds"
  );
});
