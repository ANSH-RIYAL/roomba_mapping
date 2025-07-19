
import React, { useState, useEffect, useRef } from 'react';
import chatService from '../services/chatService';
import '../styles/chatModal.css';

const ChatModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your smart shopping assistant. Try adding items like 'water', 'milk', or 'bread' to see the new selection options!",
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: "For example: 'Add water to my shopping list'",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shoppingList, setShoppingList] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addToShoppingList = (item) => {
    const newItem = {
      id: Date.now(),
      name: item.name || item,
      category: item.category || 'General',
      quantity: item.quantity || 1,
      completed: false,
      variants: item.variants || []
    };
    setShoppingList(prev => [...prev, newItem]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    addMessage(userMessage, 'user');
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message to chat service
      const response = await chatService.sendMessage(userMessage);
      
      // Handle different response types
      if (response.type === 'product_search' || response.type === 'add_item') {
        // If it's a product search or add item request
        addMessage(response.message || 'Let me search for that item...', 'bot');
        
        if (response.products && response.products.length > 0) {
          // Add products to shopping list
          response.products.forEach(product => {
            addToShoppingList(product);
          });
          
          addMessage(`Added ${response.products.length} item(s) to your shopping list!`, 'bot');
        } else if (response.item) {
          // Single item response
          addToShoppingList(response.item);
          addMessage(`Added "${response.item.name || response.item}" to your shopping list!`, 'bot');
        }
      } else {
        // Regular chat response
        addMessage(response.message || response.response || 'I understand. How else can I help you?', 'bot');
      }
    } catch (error) {
      console.error('Chat service error:', error);
      addMessage('Sorry, I\'m having trouble connecting to the service. Please try again.', 'bot');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleItemComplete = (itemId) => {
    setShoppingList(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setShoppingList(prev => prev.filter(item => item.id !== itemId));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="chat-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        
        <div className="chat-container">
          {/* Chat Section */}
          <div className="chat-section">
            <div className="chat-header">
              <h1><i className="fas fa-comments"></i> Grocer-ease Smart Shopping Assistant</h1>
              <p>Add items to your shopping list with detailed selections</p>
            </div>
            
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`message ${message.sender}-message`}>
                  {message.text}
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="message bot-message">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="chat-input">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me to add items to your shopping list..."
                disabled={isLoading}
              />
              <button onClick={handleSendMessage} disabled={isLoading}>
                <i className="fas fa-paper-plane"></i> Send
              </button>
            </div>
          </div>
          
          {/* Shopping List Section */}
          <div className="shopping-section">
            <div className="shopping-header">
              <h2><i className="fas fa-list-check"></i> Smart Shopping List</h2>
            </div>
            
            <div className="shopping-content">
              {shoppingList.length === 0 ? (
                <div className="empty-list">
                  <i className="fas fa-shopping-cart"></i>
                  <p>Your shopping list is empty</p>
                  <small>Ask the assistant to add items!</small>
                </div>
              ) : (
                <div className="shopping-list">
                  {shoppingList.map((item) => (
                    <div key={item.id} className={`shopping-item ${item.completed ? 'completed' : ''}`}>
                      <div className="item-checkbox">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItemComplete(item.id)}
                        />
                      </div>
                      <div className="item-details">
                        <span className="item-name">{item.name}</span>
                        <span className="item-category">{item.category}</span>
                        <span className="item-quantity">Qty: {item.quantity}</span>
                      </div>
                      <button className="remove-item" onClick={() => removeItem(item.id)}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="shopping-stats">
                <div><i className="fas fa-list"></i> {shoppingList.length} items</div>
                <div><i className="fas fa-check-circle"></i> {shoppingList.filter(item => item.completed).length} completed</div>
                <div><i className="fas fa-cube"></i> {shoppingList.reduce((sum, item) => sum + item.quantity, 0)} units</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
