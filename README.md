Task Tracker CLI

A Task Tracker Command-Line Interface (CLI) application to help you efficiently manage your to-do list. 
This project is implemented in Node.js and allows you to track tasks by adding, updating, deleting, and managing their statuses directly from the command line. 
Tasks are stored locally in a JSON file.

Features

Add Tasks: Add new tasks with a description.
Update Tasks: Update the description of an existing task.
Delete Tasks: Remove tasks from the list.
Mark Task Status:
Mark a task as in-progress.
Mark a task as done.
List Tasks:
List all tasks.
Filter tasks by their status: todo, in-progress, or done.

Requirements

Node.js: Ensure that Node.js is installed on your machine.
File System Access: The app creates and manages a tasks.json file in the current directory.

Installation

1.Clone the Repository:

git clone https://github.com/venkateshvishnuperumal/Task-Tracker.git
cd task-tracker

2.Initialize the Project: Install any necessary dependencies

npm install


Usage 

The CLI provides several commands to manage tasks. Below are the available commands:

1.Add a New Task
node task-tracker.js add "Your task description here"

2.Update an Existing Task
node task-tracker.js update <task-id> "New task description"

3.Delete a Task
node task-tracker.js delete <task-id>

4. Mark a Task as In Progress
node task-tracker.js mark-in-progress <task-id>

5. Mark a Task as Done
node task-tracker.js mark-done <task-id>

6. List All tasks
node task-tracker.js list

7. Filter Tasks by Status
node task-tracker.js list done
node task-tracker.js list todo



File Structure

The tasks.json file stores tasks with the following properties:

[
  {
    "id": 1,
    "description": "Example Task",
    "status": "todo",
    "createdAt": "2024-11-24T12:00:00.000Z",
    "updatedAt": "2024-11-24T12:00:00.000Z"
  }
]

Each task has:

id: Unique identifier for the task.
description: Description of the task.
status: Status (todo, in-progress, done).
createdAt: Timestamp of when the task was created.
updatedAt: Timestamp of the last update.


Error Handling


The application gracefully handles:
Invalid Commands: Displays a list of available commands.
Invalid IDs: Alerts when trying to update, delete, or mark a task that doesn't exist.
Empty JSON File: Automatically initializes the JSON file if missing or empty.
