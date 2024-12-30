<template>
  <!-- Template giữ nguyên như cũ -->
  <div class="chat-widget">
    <div v-if="!expanded" class="chat-toggle" @click="toggleChat">
      <i class="fas fa-comment-alt"></i>
    </div>

    <div v-else class="chat-container">
      <header class="chat-header">
        <div class="chat-logo">
          <img src="@/assets/doctor-bot.png" alt="Logo" />
          <span>Trợ lý ảo Unime AI</span>
        </div>
        <div class="chat-options">
          <button @click="toggleChat">x</button>
        </div>
      </header>

      <div class="chat-history" ref="chatHistory">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.role]"
        >
          <div class="message-bubble">
            <p>{{ message.content }}</p>
          </div>
        </div>
        <div v-if="loading" class="message assistant">
          <div class="message-bubble typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div class="chat-input-container">
        <input
          ref="chatInput"
          type="text"
          v-model="userInput"
          placeholder="Nhập tin nhắn..."
          @keypress.enter="sendMessage"
          :disabled="loading"
        />
        <button @click="sendMessage" :disabled="loading || !userInput">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [
        {
          role: 'assistant',
          content: 'Chào bạn! Tôi là trợ lý y tế của Unime. Bạn có thể hỏi về các dịch vụ khám chữa bệnh hoặc các vấn đề về sức khoẻ.'
        }
      ],
      userInput: '',
      loading: false,
      expanded: false,
      COHERE_API_KEY: 'UvZGoAD8hSb4Clz6QgPQ4KnFUuMn84CT9Ry8MDUh',
      retryCount: 0,
      maxRetries: 3
    }
  },
  methods: {
    toggleChat() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.$nextTick(() => {
          this.$refs.chatInput.focus(); // Tự động focus vào ô nhập tin nhắn khi mở chat
        });
      }
    },
    
    formatChatHistory() {
      return this.messages.map(msg => ({
        message: msg.content,
        role: msg.role === 'user' ? 'USER' : 'CHATBOT'
      }));
    },

    async sendMessage() {
  if (!this.userInput.trim() || this.loading) return;

  const userMessage = this.userInput.trim();
  this.messages.push({
    role: 'user',
    content: userMessage
  });
  this.userInput = '';
  this.loading = true;

  try {
    const response = await fetch('https://api.cohere.ai/v1/chat', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.COHERE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: userMessage, // "query" là trường chính xác theo tài liệu
        chat_history: this.formatChatHistory(), // Định dạng đúng lịch sử hội thoại
        persona: "Trợ lý y tế Unime: Giúp bạn trả lời các vấn đề về sức khoẻ và dịch vụ y tế.", // Thêm persona nếu cần
        temperature: 0.8,
        max_tokens: 500,
        return_prompt: false, // Tắt trả về prompt để tiết kiệm dữ liệu
        stream: false // Nếu cần streaming response, đổi thành true
      })
    });

    // Kiểm tra trạng thái HTTP
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'API Error');
    }

    const data = await response.json();
    console.log('API Response:', data);

    if (data.text) {
      this.messages.push({
        role: 'assistant',
        content: data.text // "reply" là trường chứa câu trả lời từ API
      });
    } else {
      throw new Error('Invalid response format from API.');
    }
  } catch (error) {
    console.error('Error during API call:', error);

    // Hiển thị thông báo lỗi cho người dùng
    this.messages.push({
      role: 'assistant',
      content: `Xin lỗi, tôi không thể trả lời lúc này. Lỗi: ${error.message}`
    });
  } finally {
    this.loading = false;

    // Tự động cuộn xuống
    this.$nextTick(() => {
      this.scrollToBottom();
      // Tự động focus vào ô tin nhắn sau khi gửi
      this.$refs.chatInput.focus();
    });
  }
}
,

    scrollToBottom() {
      if (this.$refs.chatHistory) {
        this.$refs.chatHistory.scrollTop = this.$refs.chatHistory.scrollHeight;
      }
    }
  },
  watch: {
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true
    }
  },
  mounted() {
    // Initialize any required setup
  }
}
</script>

<style scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-toggle {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
}

.chat-toggle:hover {
  transform: scale(1.1);
}

.chat-toggle i {
  color: white;
  font-size: 24px;
}

.chat-container {
  width: 380px;
  height: 550px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 5px 30px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chat-logo img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.3);
}

.chat-logo span {
  font-size: 18px;
  font-weight: 600;
}

.chat-options button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.chat-options button:hover {
  opacity: 1;
}

.chat-history {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f8f9fa;
}

.message {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.message-bubble {
  max-width: 85%;
  padding: 12px 18px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.5;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  animation: fadeIn 0.3s ease;
  text-align: justify;
}

.user {
  align-items: flex-end;
}

.user .message-bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 5px;
}

.assistant .message-bubble {
  background: white;
  color: #2d3748;
  border-bottom-left-radius: 5px;
  align-self: flex-start;
}

.typing {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 15px 20px;
}

.typing span {
  width: 8px;
  height: 8px;
  background: #90949c;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.chat-input-container {
  padding: 20px;
  background: white;
  border-top: 1px solid #edf2f7;
  display: flex;
  gap: 12px;
}

.chat-input-container input {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #edf2f7;
  border-radius: 25px;
  outline: none;
  font-size: 15px;
  transition: border-color 0.2s ease;
}

.chat-input-container input:focus {
  border-color: #667eea;
}

.chat-input-container button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-input-container button:hover:not(:disabled) {
  transform: scale(1.1);
}

.chat-input-container button:disabled {
  background: #edf2f7;
  cursor: not-allowed;
}

.chat-input-container button i {
  font-size: 18px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scrollbar styling */
.chat-history::-webkit-scrollbar {
  width: 6px;
}

.chat-history::-webkit-scrollbar-track {
  background: #f8f9fa;
}

.chat-history::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 3px;
}

.chat-history::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}
</style>