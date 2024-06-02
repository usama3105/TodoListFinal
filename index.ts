#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

interface Todo {
  text: string;
  complete: boolean;
}

const todos: Todo[] = [];

const promptUser = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: ['Add a task', 'View tasks', 'Exit'],
  });

  switch (action) {
    case 'Add a task':
      await addTask();
      break;
    case 'View tasks':
      viewTasks();
      break;
    case 'Exit':
      console.log(chalk.green('Goodbye!'));
      process.exit(0);
  }
};

const addTask = async () => {
  const { task } = await inquirer.prompt({
    type: 'input',
    name: 'task',
    message: 'Enter the task:',
  });

  todos.push({ text: task, complete: false });
  console.log(chalk.green('Task added successfully!'));
  promptUser();
};

const viewTasks = () => {
  if (todos.length === 0) {
    console.log(chalk.yellow('No tasks found.'));
  } else {
    console.log(chalk.blue('Your tasks:'));
    todos.forEach((todo, index) => {
      const status = todo.complete ? chalk.green('✓') : chalk.red('◯');
      console.log(`${index + 1}. ${status} ${todo.text}`);
    });
  }
  promptUser();
};

console.log(chalk.yellow('Welcome to the Todo List App!'));
promptUser();
