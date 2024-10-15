const sum = require("./sum.js");
const multiplication = require("./multiplication.js");
const division = require("./division.js");
const subtraction = require("./subtraction.js");

const args = process.argv.slice(2);

if (args[0] === "sum") console.log(sum(parseInt(args[1]), parseInt(args[2])));
else if (args[0] === "multiplication")
  console.log(multiplication(parseInt(args[1]), parseInt(args[2])));
else if (args[0] === "division")
  console.log(division(parseInt(args[1]), parseInt(args[2])));
else if (args[0] === "subtraction")
  console.log(subtraction(parseInt(args[1]), parseInt(args[2])));
