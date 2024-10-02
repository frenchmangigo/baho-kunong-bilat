const axios = require('axios');

// Define valid prefixes
const UPoLPrefix = [
  '-ai',
  'ai',
  '/ai',
  'bot',
  'ask'
]; 

module.exports = {
  config: {
    name: 'ai',
    version: '1.2.1',
    role: 0,
    category: 'AI',
    author: 'Raphael scholar',
    shortDescription: '',
    longDescription: '',
  },
  
  onStart: async function () {},

  onChat: async function ({ message, event, args, api, threadID, messageID }) {
      
      // Find if the message starts with a valid prefix followed by a space
      const ahprefix = UPoLPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p + ' '));
      
      // If no valid prefix is found, return without responding
      if (!ahprefix) {
        return; 
      } 
      
      // Remove the prefix and trim any extra spaces
      const upol = event.body.substring(ahprefix.length).trim();
      
      // If no question is provided after the prefix, send a reminder to enter a question
      if (!upol) {
        await message.reply('Enter a question.? 🥹');
        return;
      }
      
      // List of random responses if the message is just "hi"
      const apply = ['Awww🥹, maybe you need my help', 'How can I help you?', 'How can I assist you today?', 'How can I help you?🙂'];
      const randomapply = apply[Math.floor(Math.random() * apply.length)];

      // Respond with a random greeting if the input is "hi"
      if (args[0] === 'hi') {
          message.reply(`${randomapply}`);
          return;
      }
      
      // Encode the user's question to be sent in the API call
      const encodedPrompt = encodeURIComponent(args.join(" "));
      await message.reply('thinking..');

      // Call the API with the user's question
      const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
      const UPoL = response.data.answer;

      // Reply with the AI's answer
      const upolres = `${UPoL}`;
      message.reply(upolres);
  }
};
