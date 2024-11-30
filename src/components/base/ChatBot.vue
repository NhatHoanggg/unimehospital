<template>
    <div class="chat-widget">
      <!-- Nút bấm hình tròn -->
      <div
        v-if="!expanded"
        class="chat-toggle"
        @click="toggleChat"
      >
        <i class="fas fa-comment-alt"></i>
      </div>
  
      <!-- Giao diện chat -->
      <div v-else class="chat-container">
        <header class="chat-header">
          <div class="chat-logo">
            <img src="@/assets/doctor-bot.png" alt="Logo" />
            <span>Unime Chatbot</span>
          </div>
          <div class="chat-options">
            <button @click="toggleChat">x</button>
          </div>
        </header>
  
        <div class="chat-history">
          <div
            v-for="(message, index) in chatHistory"
            :key="index"
            :class="['message', message.role === 'user' ? 'user' : 'bot']"
          >
            <div class="message-bubble">
              <p>{{ message.parts[0].text }}</p>
            </div>
          </div>
        </div>
  
        <div class="chat-input-container">
          <input
            type="text"
            v-model="userMessage"
            placeholder="Nhập tin nhắn..."
            @keypress.enter="sendMessage"
          />
          <button @click="sendMessage" :disabled="loading || !userMessage">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
import { GoogleGenerativeAI } from "@google/generative-ai";

export default {
  data() {
    return {
      genAI: null,
      model: null,
      chat: null,
      chatHistory: [],
      userMessage: "",
      loading: false,
      expanded: false, 
    };
  },
  methods: {
    toggleChat() {
      this.expanded = !this.expanded;
    },
    async initializeChat() {
  try {
    this.genAI = new GoogleGenerativeAI('AIzaSyA6E7x3tQCm0oENcrA4Mg6bGvlHYTIOMIA');
    this.model = await this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    this.chat = await this.model.startChat({
      history: [
      ],
    });

    this.chatHistory = [
    {
        role: "user",
        parts: [
          {text: "Xin chào\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Chào mừng đến với bệnh viện UNIME, tôi là trợ lý ảo. Tôi có thể giúp gì cho bạn?\n"},
        ],
      },
    ];
  } catch (err) {
    console.error("Error initializing chat:", err.message);
  }
    },
    async sendMessage() {
  if (!this.userMessage.trim()) return;

  this.loading = true;

  this.chatHistory.push({
    role: "user",
    parts: [{ text: this.userMessage }],
  });

  try {
    // Gửi tin nhắn tới API Gemini
    const result = await this.chat.sendMessage(this.userMessage);

    // Thêm phản hồi của mô hình vào lịch sử
    this.chatHistory.push({
      role: "model",
      parts: [{ text: result.response.text() }],
    });

    this.userMessage = "";
  } catch (err) {
    console.error("Error sending message:", err.message);
  } finally {
    this.loading = false;
  }
},
    syncChatHistory() {
      try {
        if (Array.isArray(this.chat.history)) {
          this.chatHistory = [...this.chat.history];
        } else {
          console.error("chat.history is not an array:", this.chat.history);
        }
      } catch (err) {
        console.error("Error syncing chat history:", err.message);
      }
    },
  },
  mounted() {
    this.initializeChat();
  },
};
</script>

  
<style scoped>
.chat-widget {
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 100;
}

/* Nút toggle */
.chat-toggle {
  width: 60px;
  height: 60px;
  background-color: #4a90e2;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  border: none;
}

/* Giao diện chat */
.chat-container {
  width: 400px;
  height: 600px;
  background: linear-gradient(to bottom, #eef6fd, #ffffff);
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  bottom: 50px;
  right: 50px;
}

/* Header */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #ffffff;
  border-bottom: 1px solid #ddd;
}

.chat-logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chat-logo img {
  width: 30px;
  height: 30px;
}

.chat-logo span {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.chat-options button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* Chat history */
.chat-history {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #eef9fc;
}

.message {
  display: flex;
  align-items: flex-start;
}

.message-bubble {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
  background: #f1f5fc;
  color: #333;
}

.message.user {
  justify-content: flex-end;
}

.message.user .message-bubble {
  background: #4a90e2;
  color: #fff;
  border-bottom-right-radius: 0;
}

.message.bot .message-bubble {
  background: #cedff5;
  color: #333;
  border-bottom-left-radius: 0;
}

/* Input */
.chat-input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #ffffff;
  border-top: 1px solid #ddd;
}

.chat-input-container input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 14px;
  outline: none;
}

.chat-input-container button {
  background: none;
  border: none;
  margin-left: 10px;
  font-size: 20px;
  color: #4a90e2;
  cursor: pointer;
}

.chat-input-container button:disabled {
  color: #ccc;
}


</style>