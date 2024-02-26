function displayMessage(message) {
  process.stdout.write(`${message}\n`);
}

displayMessage('Welcome to Holberton School, what is your name?');

process.stdin.on('data', (data) => {
  process.stdout.write(`Your name is: ${data}`);
  process.exit();
});
process.on('exit', () => {
  displayMessage('This important software is now closing');
});
