// Import the 'http' and 'fs' modules
const http = require("http");
const fs = require("fs");

// Create an HTTP server that listens to incoming requests
const server = http.createServer((req, res) => {
  // Check the request URL to determine which file to serve
  if (req.url === "/") {
    // If the request is for the root URL, read and serve 'home.html'
    fs.readFile("home.html", "utf8", (err, data) => {
      if (err) {
        // If there is an error reading the file, respond with a 500 status code and error message
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Error loading home page");
      }
      // Serve the HTML content of 'home.html'
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (req.url === "/about") {
    // If the request is for '/about', read and serve 'about.html'
    fs.readFile("about.html", "utf8", (err, data) => {
      if (err) {
        // If there is an error reading the file, respond with a 500 status code and error message
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Error loading about page");
      }
      // Serve the HTML content of 'about.html'
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (req.url === "/contactus") {
    // If the request is for '/contactus', read and serve 'contactus.html'
    fs.readFile("contactus.html", "utf8", (err, data) => {
      if (err) {
        // If there is an error reading the file, respond with a 500 status code and error message
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Error loading contact us page");
      }
      // Serve the HTML content of 'contactus.html'
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (req.url === "/index") {
    // If the request is for '/index', read and serve 'index.js'
    fs.readFile("index.js", "utf8", (err, data) => {
      if (err) {
        // If there is an error reading the file, respond with a 500 status code and error message
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        return res.end("Error loading index page");
      }
      // Serve the JavaScript content of 'index.js'
      res.setHeader("Content-Type", "text/javascript");
      res.end(data);
    });
  } else {
    // If the requested URL doesn't match any of the above, respond with a 404 error
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

// Make the server listen on port 8080
server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
