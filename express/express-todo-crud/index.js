const express = require("express");
const fs = require("fs");
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * GET /api/tasks
 * - Reads the tasks from 'db.json' and sends them as a JSON response.
 */
app.get("/api/tasks", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading db.json" }); // Error handling for reading file
    }

    const tasks = JSON.parse(data).tasks; // Parse JSON data to retrieve tasks

    res.json(tasks); // Respond with the tasks in JSON format
  });
});

/**
 * POST /api/tasks
 * - Adds a new task to the 'db.json' file.
 * - The new task is assigned an id using `Date.now()` and is appended to the list of tasks.
 */
app.post("/api/tasks", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading db.json" }); // Error handling for reading file
    }

    const tasks = JSON.parse(data).tasks; // Parse current tasks
    const newTask = { id: Date.now(), ...req.body }; // Create a new task with unique id and request data
    tasks.push(newTask); // Add new task to the array
    const updatedDb = JSON.stringify({ tasks: tasks }); // Convert updated tasks array back to JSON

    fs.writeFile("db.json", updatedDb, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error writing to db.json" }); // Error handling for writing to file
      }

      res.status(201).json(newTask); // Respond with the newly created task
    });
  });
});

/**
 * PATCH /api/tasks
 * - Updates tasks by marking tasks with even IDs as completed if they are not already marked as completed.
 */
app.patch("/api/tasks", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading db.json" }); // Error handling for reading file
    }

    const tasks = JSON.parse(data).tasks; // Parse tasks from db.json
    const updatedTasks = tasks.map((task) => {
      if (task.id % 2 === 0 && !task.completed) {
        task.completed = true; // Mark task as completed if its ID is even
        return task;
      }
      return task; // Return task unchanged if the condition is not met
    });
    const updatedDb = JSON.stringify({ tasks: updatedTasks }); // Convert updated tasks back to JSON

    fs.writeFile("db.json", updatedDb, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing to db.json" }); // Error handling for writing to file
      }

      res.json(updatedTasks); // Respond with updated tasks list
    });
  });
});

/**
 * DELETE /api/tasks
 * - Deletes all tasks that are marked as completed by filtering them out from the task list.
 */
app.delete("/api/tasks", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error reading db.json" }); // Error handling for reading file
    }

    const tasks = JSON.parse(data).tasks; // Parse tasks from db.json
    const updatedTasks = tasks.filter((tasks) => tasks.completed === false); // Keep only tasks that are not completed
    const updatedDb = JSON.stringify({ tasks: updatedTasks }); // Convert updated tasks list to JSON

    fs.writeFile("db.json", updatedDb, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error writing to db.json" }); // Error handling for writing to file
      }

      res.json(updatedTasks); // Respond with remaining tasks
    });
  });
});

/**
 * Default route for handling all undefined routes.
 * - Responds with a 404 status code if a route is not found.
 */
app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found" }); // Respond with 404 if no matching route
});

// Start the server on port 8080
app.listen(8080, () => {
  console.log("Server is running on port 8080"); // Log message indicating server is running
});
