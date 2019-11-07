const consoleGreetingFirstLine = `Hi there! 👋`;
const consoleGreeting = `
Thanks for checking out my website! If you're seeing this,
you are awesome! I think there's a good chance we'd
could be friends so hit me up with a message and say hello!

🐦Tweet me @nickjnish saying you found my secret message

`;

const greetInConsoleMessage = () => {
  if (process.env.NODE_ENV !== 'development' && typeof console === 'object') {
    console.log(`%c${consoleGreetingFirstLine}`, 'font-size: 16px');
    console.log(consoleGreeting);
  }
};

greetInConsoleMessage();
