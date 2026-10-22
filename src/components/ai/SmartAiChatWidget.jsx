import React, { useState, useRef, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { generateAiAssistantResponse } from "../../services/aiService";
import {
  Sparkles,
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  RotateCcw
} from "lucide-react";

export const SmartAiChatWidget = () => {
  const { properties, navigateTo, formatPrice } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "ai-init",
      sender: "ai",
      text: "👋 Hello! I'm **SmartRental AI**, your intelligent real estate co-pilot.\n\nAsk me anything in natural language, for example: *\"Find me a 2-bedroom apartment in Port Harcourt under ₦1.5 million with parking\"* or request affordability advice!",
      properties: [],
      timestamp: "Just now"
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (textToSend = null) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const response = generateAiAssistantResponse(query, properties);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.reply,
        properties: response.suggestedProperties || [],
        timestamp: "Just now"
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 750);
  };

  const handleQuickPrompt = (promptText) => {
    handleSend(promptText);
  };

  const resetChat = () => {
    setMessages([
      {
        id: `ai-init-${Date.now()}`,
        sender: "ai",
        text: "👋 Chat reset! What kind of home or rental guidance can I assist you with today?",
        properties: [],
        timestamp: "Just now"
      }
    ]);
  };

  return (
    <div className="ai-widget-container">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          className="ai-widget-launcher animate-pulse-glow"
          onClick={() => setIsOpen(true)}
          aria-label="Open SMART-AI Assistant"
        >
          <div className="ai-launcher-icon-wrap">
            <Sparkles size={20} className="text-white" />
          </div>
          <div className="ai-launcher-text">
            <span className="ai-launcher-title">Ask SMART-AI</span>
            <span className="ai-launcher-status">Online Assistant</span>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="ai-chat-window animate-slide-up">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-chat-header-info">
              <div className="ai-chat-avatar">
                <Bot size={20} className="text-white" />
                <span className="ai-online-indicator"></span>
              </div>
              <div>
                <div className="ai-chat-title">SmartRental AI Assistant</div>
                <div className="ai-chat-model-tag">
                  <Zap size={11} /> Real-time Property Intelligence
                </div>
              </div>
            </div>
            <div className="ai-chat-header-actions">
              <button
                onClick={resetChat}
                className="ai-header-btn"
                title="Restart Conversation"
                aria-label="Restart Conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="ai-header-btn"
                title="Minimize Chat"
                aria-label="Minimize Chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="ai-quick-prompts">
            <button
              className="quick-chip"
              onClick={() =>
                handleQuickPrompt("Find me a 2-bedroom apartment in Port Harcourt under ₦1.5 million with parking")
              }
            >
              📍 2-Bed in Port Harcourt &lt; ₦1.5M
            </button>
            <button
              className="quick-chip"
              onClick={() => handleQuickPrompt("What is the 30% rent affordability rule?")}
            >
              💰 Affordability Rule
            </button>
            <button
              className="quick-chip"
              onClick={() => handleQuickPrompt("Show luxury duplexes in Lekki with solar power")}
            >
              ⚡ Lekki Solar Duplex
            </button>
          </div>

          {/* Messages Body */}
          <div className="ai-messages-body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`ai-message-row ${msg.sender === "user" ? "user-row" : "ai-row"}`}
              >
                <div className="ai-message-avatar">
                  {msg.sender === "user" ? (
                    <User size={14} className="text-gray-600" />
                  ) : (
                    <Bot size={14} className="text-blue-500" />
                  )}
                </div>
                <div className="ai-message-bubble">
                  <div className="ai-bubble-text">
                    {msg.text.split("\n").map((line, idx) => (
                      <p key={idx} className="mb-1 leading-relaxed">
                        {line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, pIdx) => {
                          if (part.startsWith("**") && part.endsWith("**")) {
                            return <strong key={pIdx}>{part.slice(2, -2)}</strong>;
                          }
                          if (part.startsWith("*") && part.endsWith("*")) {
                            return <em key={pIdx}>{part.slice(1, -1)}</em>;
                          }
                          return part;
                        })}
                      </p>
                    ))}
                  </div>

                  {/* Render Embedded Property Cards if returned */}
                  {msg.properties && msg.properties.length > 0 && (
                    <div className="ai-embedded-properties">
                      {msg.properties.map((prop) => (
                        <div
                          key={prop.id}
                          className="ai-prop-card"
                          onClick={() => {
                            setIsOpen(false);
                            navigateTo("property-detail", prop.id);
                          }}
                        >
                          <img
                            src={prop.images[0]}
                            alt={prop.title}
                            className="ai-prop-card-img"
                          />
                          <div className="ai-prop-card-info">
                            <div className="ai-prop-card-title truncate">{prop.title}</div>
                            <div className="ai-prop-card-loc">
                              {prop.location.city} • {prop.specs.bedrooms} Beds
                            </div>
                            <div className="ai-prop-card-price">
                              {formatPrice(prop.price)}/yr
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-blue-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="ai-bubble-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row ai-row">
                <div className="ai-message-avatar">
                  <Bot size={14} className="text-blue-500" />
                </div>
                <div className="ai-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="ai-chat-input-form"
          >
            <input
              type="text"
              placeholder="Ask anything or search with natural language..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="ai-chat-input"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="ai-chat-send-btn"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
