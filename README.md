# To-Do List App

## Description

This is a simple To-Do List application where users can manage their tasks. Users can create, delete, and archive to-do items. The archived to-dos are sorted by their archived date and displayed in the archive section.

## Features

- Create new to-do items by entering text and selecting a category.
- Four category options: Important, Unimportant, Urgent, Non-urgent.
- Delete to-do items.
- Archive to-do items.
- Archived to-dos are displayed sorted by their archived date.
- Restore archived to-do items back to the main to-do list.
- **Persistence**: All to-do items and their statuses are stored locally using `localStorage`, ensuring that your to-do list will persist even if you refresh the page or close the browser.

## Usage

1. Open the application in your web browser.
2. To create a new to-do item:
   - Enter the task description in the input field.
   - Select a category from the dropdown menu.
   - Click the "Add" button or press Enter.
3. To delete a to-do item:
   - Click the "Delete" button next to the item.
4. To archive a to-do item:
   - Click the "Done" button next to the item.
5. To view archived to-do items:
   - Click the "To-Do Archive" link in the navigation.
6. To restore an archived to-do item:
   - Click the "Return" button next to the item in the archive section.
