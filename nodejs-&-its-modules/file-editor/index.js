const fs = require("fs");

const arguments = process.argv.slice(2);

const operation = arguments[0];

const fileName = arguments[arguments.length - 1];

// Function for reading from a file
const readingFile = (fileName) => {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }

    console.log(data);
  });
};

//Function for appending new content to a file
const appendingFile = (fileName) => {
  const contentToAppend = arguments[1];
  console.log(contentToAppend);
  fs.appendFile(fileName, `\n${contentToAppend}`, "utf-8", (err) => {
    if (err) {
      throw err;
    }

    console.log(`Content appended o the file ${fileName}`);
  });
};

//Function to delete a file
const deletingFile = (fileName) => {
  fs.unlink(fileName, (err) => {
    if (err) throw err;
    console.log(`File ${fileName} has been deleted`);
  });
};

//Function to create a new file
const creatingFile = (fileName) => {
  fs.writeFile(fileName, "", (err) => {
    if (err) throw err;
    console.log(`File ${fileName} has been created`);
  });
};

//Function to Rename a file
const renamingFile = () => {
  const oldFileName = arguments[1];
  const newFileName = arguments[arguments.length - 1];

  console.log(oldFileName);
  console.log(newFileName);

  fs.rename(oldFileName, newFileName, (err) => {
    if (err) console.log("Renaming", err);
    console.log(`File ${oldFileName} has been renamed to ${newFileName}`);
  });
};

//Function to list all files in the current directory
const listingFiles = () => {
  fs.readdir(".", (err, files) => {
    if (err) {
      throw err;
    }

    files.forEach((ele) => {
      console.log(ele);
    });
  });
};

//Switch case for different operations
switch (operation) {
  case "read":
    readingFile(fileName);
    break;

  case "append":
    appendingFile(fileName);
    break;

  case "delete":
    deletingFile(fileName);
    break;

  case "create":
    creatingFile(fileName);
    break;
  case "rename":
    renamingFile();
    break;

  case "list":
    listingFiles();
    break;

  default:
    console.log("Invalid operation");
    break;
}
