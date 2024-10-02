const axios = require("axios");

module.exports = {
	config: {
		name: 'blackbox',
		version: '1.0.0',
		author: 'KENLIEPLAYS',
		countDown: 5,
		role: 0,
		shortDescription: 'Use Blackbox AI',
		longDescription: 'Ask anything to Blackbox AI by providing a prompt.',
		category: 'ai',
		guide: {
			en: '   {pn} <message>: Ask Blackbox AI with a message.'
				+ '\n   Example: {pn} "hello world"'
		}
	},

	langs: {
		en: {
			chatting: 'Please wait...',
			error: 'An error occurred. Please contact Kenlie Navacilla Jugarap.'
		}
	},

	onStart: async function ({ args, message, getLang }) {
		// Check if a message was provided
		if (!args.length) {
			return message.reply("Please provide a message to ask Blackbox AI.");
		}
		
		const userMessage = args.join(" "); // Combine all arguments into one string
		message.reply(getLang('chatting')); // Notify user to wait while processing

		try {
			// Make the API call
			const response = await axios.get(`https://deku-rest-api-3jvu.onrender.com/blackbox?prompt=${encodeURIComponent(userMessage)}`);
			
			// Check if the API response contains the expected data
			if (response.data && response.data.response) {
				return message.reply(response.data.response); // Send the response from the API
			} else {
				// If no response, handle it
				throw new Error("No response field in API result.");
			}
		} catch (error) {
			// Log the error and notify the user
			console.error("Error:", error);
			return message.reply(getLang('error'));
		}
	}
};
