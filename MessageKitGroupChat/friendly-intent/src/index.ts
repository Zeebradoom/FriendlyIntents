import { run, HandlerContext } from "@xmtp/message-kit";

// Define the correct password
const PASSWORD = "ZEEBRA"; // Replace with your desired password

// Variable to track whether we're waiting for the password
let awaitingPassword = false;

// Main function to run the app
run(async (context: HandlerContext) => {
  const {
    message: {
      content: { content: text },
    },
  } = context;

  if (!awaitingPassword) {
    // If not waiting for password, ask for it
    awaitingPassword = true;
    context.send("Please enter the password:");
  } else {
    // We're now expecting a password input
    if (text === PASSWORD) {
      context.send(
        "Access granted. Here is the secret message: <your_message_here>"
      );
    } else {
      context.send("Invalid password.");
    }
    awaitingPassword = false; // Reset the state after checking the password
  }
});
