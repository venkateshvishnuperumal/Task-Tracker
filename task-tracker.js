#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Filepath for storing tasks
const filePath = path.join(__dirname, "tasks.json");

// Helper function to read tasks
const readTasks = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

// Helper function to write tasks
const writeTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Generate a unique ID
const generateId = (tasks) => (tasks.length ? tasks[tasks.length - 1].id + 1 : 1);

// CLI logic
const main = () => {
  const args = process.argv.slice(2);
  const command = args[0];
  const tasks = readTasks();

  switch (command) {
    case "add": {
      const description = args[1];
      if (!description) return console.log("Error: Task description is required.");
      const newTask = {
        id: generateId(tasks),
        description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      tasks.push(newTask);
      writeTasks(tasks);
      console.log(`Task added successfully (ID: ${newTask.id})`);
      break;
    }

    case "update": {
      const id = parseInt(args[1], 10);
      const description = args[2];
      if (!id || !description) return console.log("Error: Task ID and description are required.");
      const task = tasks.find((t) => t.id === id);
      if (!task) return console.log("Error: Task not found.");
      task.description = description;
      task.updatedAt = new Date().toISOString();
      writeTasks(tasks);
      console.log("Task updated successfully.");
      break;
    }

    case "delete": {
      const id = parseInt(args[1], 10);
      if (!id) return console.log("Error: Task ID is required.");
      const index = tasks.findIndex((t) => t.id === id);
      if (index === -1) return console.log("Error: Task not found.");
      tasks.splice(index, 1);
      writeTasks(tasks);
      console.log("Task deleted successfully.");
      break;
    }

    case "mark-in-progress": {
      const id = parseInt(args[1], 10);
      if (!id) return console.log("Error: Task ID is required.");
      const task = tasks.find((t) => t.id === id);
      if (!task) return console.log("Error: Task not found.");
      task.status = "in-progress";
      task.updatedAt = new Date().toISOString();
      writeTasks(tasks);
      console.log("Task marked as in-progress.");
      break;
    }

    case "mark-done": {
      const id = parseInt(args[1], 10);
      if (!id) return console.log("Error: Task ID is required.");
      const task = tasks.find((t) => t.id === id);
      if (!task) return console.log("Error: Task not found.");
      task.status = "done";
      task.updatedAt = new Date().toISOString();
      writeTasks(tasks);
      console.log("Task marked as done.");
      break;
    }

    case "list": {
      const filter = args[1];
      const filteredTasks =
        filter === "done"
          ? tasks.filter((t) => t.status === "done")
          : filter === "todo"
          ? tasks.filter((t) => t.status === "todo")
          : filter === "in-progress"
          ? tasks.filter((t) => t.status === "in-progress")
          : tasks;
      if (!filteredTasks.length) return console.log("No tasks found.");
      filteredTasks.forEach((task) =>
        console.log(`ID: ${task.id}, Description: ${task.description}, Status: ${task.status}`)
      );
      break;
    }

    default:
      console.log("Invalid command. Available commands: add, update, delete, mark-in-progress, mark-done, list");
  }
};

main();
