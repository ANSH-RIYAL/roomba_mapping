
const CHAT_API_BASE_URL = 'https://grocer-ease-chatbot.onrender.com'; // Replace with actual deployed URL

class ChatService {
  async sendMessage(message) {
    try {
      const response = await fetch(`${CHAT_API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message to chat service:', error);
      throw error;
    }
  }

  async searchProducts(query) {
    try {
      const response = await fetch(`${CHAT_API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }
}

export default new ChatService();
