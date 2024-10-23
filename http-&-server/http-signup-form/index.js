const http = require("http"); // Import the built-in 'http' module to create a web server
const fs = require("fs"); // Import the 'fs' module to work with the file system
const qs = require("querystring"); // Import the 'querystring' module to parse form data

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Handle GET request for the /signup page to render the signup form
  if (req.url === "/signup" && req.method === "GET") {
    // Read the signup form HTML file
    fs.readFile("sign-up.html", "utf8", (err, data) => {
      if (err) {
        // If there's an error reading the file, send a 500 error
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Error loading the sign-up page");
      }
      // Send the signup form to the client
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }

  // Handle POST request for /signup to process form data
  else if (req.url === "/signup" && req.method === "POST") {
    let body = ""; // Initialize an empty string to collect incoming data

    // 'data' event handler to collect chunks of data from the request body
    req.on("data", (chunk) => {
      body += chunk.toString(); // Append the chunk to the body
    });

    // 'end' event handler to process the complete body after receiving all data
    req.on("end", () => {
      console.log(body); // Log the form data (for debugging purposes)
      const formData = qs.parse(body); // Parse the form data

      const username = formData.username; // Extract username
      const password = formData.password; // Extract password

      // Prepare user data in a string format to be saved in users.txt
      const user = `Username: ${username}, Password: ${password}\n`;

      // Append the user data to 'users.txt' file
      fs.appendFile("users.txt", user, (err) => {
        if (err) {
          // If there's an error while saving user data, send a 500 error
          res.writeHead(500, { "Content-Type": "text/plain" });
          return res.end("Error saving user data");
        }
        // Respond with a success message
        res.end("User logged In Successfully");
      });
    });
  }

  // Handle GET request for /allusers to display all registered users (without passwords)
  else if (req.url === "/allusers") {
    // Read the contents of 'users.txt' file
    fs.readFile("users.txt", "utf8", (err, data) => {
      if (err) {
        // If there's an error reading the file, send a 500 error
        res.writeHead(500, { "Content-Type": "text/plain" });
        return res.end("Error loading users data");
      }

      // Process the file data to extract only the usernames (remove passwords)
      const users = data
        .split("\n") // Split the data into lines (each user on a new line)
        .filter((line) => line) // Filter out any empty lines
        .map((line) => line.replace(/, Password: .*/, "")); // Remove the password from each line

      // Respond with the list of users in HTML format
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(
        `<h1>All Users</h1><ul>${users
          .map((user) => `<li>${user}</li>`) // Convert each username to a list item
          .join("")}</ul>` // Join all the list items into a single string
      );
    });
  }

  // If the request doesn't match any route, return a 404 Not Found response
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// Start the server and listen on port 8080
server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
