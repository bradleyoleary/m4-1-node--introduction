'use strict';

// import the needed node_modules.
const express = require('express');
const morgan = require('morgan');

//defining jokeBoolean as false
let jokeBoolean = false;

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan('tiny'))

  // Any requests for static files will go into the public folder
  .use(express.static('public'))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  //cat chat
  .get('/cat-message', (req, res) => {
    const message = { author: 'cat', text: 'Meow' };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
   }, randomTime);
  })

  //monkey chat
  .get('/monkey-message', (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const message = { author: 'monkey', text: randomMessage };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
   }, randomTime);
  })

  //parrot chat
  .get(`/parrot-message`, (req, res) => {
    const message = { author: 'parrot', text: req.query.sentMessage };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
   }, randomTime);
  })

  //bot chat
  .get(`/bot-message`, (req, res) => {
    const getBotMessage = (text) => {
      const commonGreetings = ["hi", "hello", "hey", "howdy"];
      const commonGoodbyes = ["goodbye", "bye", "see ya"]
      const jokeTrigger = "something funny";//type this to trigger joke from robot
      const jokeArr = ["A user interface is like a joke. If you have to explain it, it's not that good.",
      "Why do programmers prefer dark mode? Cause light attracts bugs.", "Why can't you play poker on the African Savanna? There's too many cheetahs."];//array of jokes
      const jokeRandomizer = [Math.floor(Math.random() * jokeArr.length)]//will randomize jokes based on arr length

      let botMsg = `Bzzt ${text}`;//will copy what the user types if not in comGreetings or comGoodbyes

      //loops through common greetings to check if my text exists
      commonGreetings.filter((greeting) => {
        if (text.toLowerCase().includes(greeting)) {
          botMsg = "Hello, my dude!";
        }
      });

      //loops through common goodbyes to check if my text exists
      commonGoodbyes.filter((goodbye) => {
        if (text.toLowerCase().includes(goodbye)) {
          botMsg = "See ya, dude!"
        };
      });

      if (text.toLowerCase().includes(jokeTrigger)) {
        jokeBoolean = true;
        botMsg = "Want to hear a funny joke? Answer YES or N0.";
      } 
      
      else if (text === "YES" && jokeBoolean) {
        botMsg = `${jokeArr[jokeRandomizer]} How bout' another joke? Answer YES or NO.`;
      } 
      
      else if (text === "NO" && jokeBoolean) {
        jokeBoolean = false;
        botMsg = "Okay... Bye human!"
      } 
      
      else {
        jokeBoolean = false;
      }
      return botMsg;
    };

    const message = { author: `bot`, text: getBotMessage(req.query.sentMessage) };
    const randomTime = Math.floor(Math.random() * 5000);
    setTimeout(() => {
      res.status(200).json({ status: 200, message });
   }, randomTime);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get('/', (req, res) => {
    res
      .status(200)
      .json({ status: 200, message: "This is the homepage... it's empty :(" });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get('*', (req, res) => {
    res
      .status(404)
      .json({
        status: 404,
        message: 'This is obviously not the page you are looking for.',
      });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));