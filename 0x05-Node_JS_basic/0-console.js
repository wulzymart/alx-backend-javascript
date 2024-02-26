/**
 * Displays a message on the STDOUT.
 */
const displayMessage = (msg) => {
  process.stdout.write(msg + "\n");
};

module.exports = displayMessage;
