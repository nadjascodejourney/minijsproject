# Mini Database Terminal Application
This is a small JavaScript program designed for learning purposes, simulating a mini database with various functionalities such as creating, reading, updating, and deleting items. 

## Features
Create: Add new items to the storage.
Read: View all items in the storage along with their total weight.
Update: Modify existing items in the storage.
Delete: Remove items from the storage.

## Installation
1. Clone the repository: git clone https://github.com/yourusername/mini-database-terminal-app.git
   Note: Replace yourusername with your actual GitHub username in the clone URL.

2. Install Dependencies: npm install

3. To run the program, use the following command: node index.js

## The Project contains: 

### Main Menu
C: Create a new item.
R: Read and display all items.
U: Update an existing item.
D: Delete an item.
Q: Quit the program.
Code Overview

## Files
index.js: Main program file.
data/classes.js: Contains the Item class definition.
data/template.js: Contains template strings for menus.
Global Storage
The globalStorage array holds all items in the database, each represented as an object with properties: name, id, type, quantity, and weight.

## Functions
startProgramm(): Main function to display the menu and handle user input.
updateItem(): Function to update an existing item (needs to be implemented).
deleteItem(): Function to delete an item (needs to be implemented).


## Contributing
Feel free to fork this repository and submit pull requests. Suggestions and improvements are welcome!

Enjoy learning and have fun with this mini database terminal application! If you have any questions or issues, please open an issue in the repository.











