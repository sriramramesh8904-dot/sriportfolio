import React, { useState, useEffect } from 'react';
import './App.css';

const TypeYourWords = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage on initial render
    const saved = localStorage.getItem('portfolio-messages');
    return saved ? JSON.parse(saved) : [];
  });

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolio-messages', JSON.stringify(messages));
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        text: input.trim(),
        timestamp: new Date().toLocaleString()
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <>
      <button
        className="floating-chat-btn"
        onClick={() => setOpen((o) => !o)}
        style={{ position: 'fixed', bottom: '40px', left: '40px', zIndex: 1000 }}
      >
        Drop Me a Line
      </button>
      {open && (
        <div className="chat-window">
          <div className="chat-header">
            Type Your Words
            {messages.length > 0 && (
              <button 
                className="clear-messages-btn"
                onClick={() => {
                  setMessages([]);
                  localStorage.removeItem('portfolio-messages');
                }}
              >
                Clear All
              </button>
            )}
          </div>
          <div className="chat-body">
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-placeholder">No messages yet.</div>
              ) : (
                messages.map((msg, idx) => (
                  <div className="chat-message" key={idx}>
                    <div className="message-text">{msg.text}</div>
                    <div className="message-timestamp">{msg.timestamp}</div>
                  </div>
                ))
              )}
            </div>
            <div className="chat-input-row">
              <input
                type="text"
                className="chat-input"
                placeholder="Type your message here..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              />
              <button className="chat-send-btn" onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TypeYourWords;
