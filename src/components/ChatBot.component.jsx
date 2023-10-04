import React, { Component } from 'react';
import "./chatboot.styles.scss";

import { API_BASE_URL } from '../config';  // Adjusted path to go up one directory and then find config.js


class ChatBotUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessage: '',
      chatHistory: [],
      showChat: false,
      isLoading: false,
    };
    this.chatBoxRef = React.createRef();  // Add this line for the ref
  }

  componentDidUpdate() {
    const chatBox = this.chatBoxRef.current;
    chatBox.scrollTop = chatBox.scrollHeight;  // Add this line for auto-scrolling
  }

  handleInputChange = (e) => {
    this.setState({ userMessage: e.target.value });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSend();
    }
  }

  handleSend = () => {
    const { userMessage, chatHistory } = this.state;
  
    // Immediately add the user's message to chat history
    const immediateHistory = [...chatHistory, { role: 'user', content: userMessage }];
    this.setState({ chatHistory: immediateHistory, userMessage: '' });  // <-- Clear userMessage here
  
    // Set loading to true for spinner
    this.setState({ isLoading: true });
  
    // Send POST request to Django
    fetch(`${API_BASE_URL}/chatbot/api/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history: immediateHistory }),
    })
    .then(response => response.json())
    .then(data => {
      const chatbotMessage = data.answer;
      const newHistory = [...immediateHistory, { role: 'system', content: chatbotMessage }];
  
      // Update the state with the new chat history and remove the loading spinner
      this.setState({ chatHistory: newHistory, isLoading: false });
    })
    .catch(error => {
      console.error('There was an error:', error);
      this.setState({ isLoading: false });
    });
  }
  
  
  
    toggleChat = () => {
      this.setState(prevState => ({
        showChat: !prevState.showChat
      }));
    }
  
    render() {
      const { chatHistory, userMessage, showChat } = this.state;
      return (
        <div>
          <div className={`chat-container ${showChat ? '' : 'hidden'}`}>
            <div className="chat-header" onClick={this.toggleChat}>
              SwissCost Bot
            </div>
            <div className="chat-box" ref={this.chatBoxRef}>  {/* Add the ref here */}
              {chatHistory.map((item, index) => (
                <p key={index}>
                  <span className={item.role === 'system' ? 'bot-response' : 'user-response'}>
                    {item.content}
                  </span>
                </p>
              ))}
              {this.state.isLoading && <div className="spinner"></div>}
            </div>
            <div className="chat-input-container">
            <input 
            type="text" 
            value={userMessage} 
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
            className="chat-input"
            placeholder="Type your message..."
            />

              <button className="send-button" onClick={this.handleSend}>
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
          <div className="toggle-button" onClick={this.toggleChat}>
            {showChat ? 
                <i class="fas fa-times"></i> : 
                <i class="fas fa-comments"></i>}
            </div>

        </div>
      );
    }
  }
  
  export default ChatBotUI;