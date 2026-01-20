# JavaScript Client Guide for Flow Controller API

This guide explains how to interact with the Flow Controller API using JavaScript's `fetch` API.

## Base API URL

The API is available at: `http://localhost:3000/api`

```javascript
const API_BASE_URL = 'http://localhost:3000/api'; // Base URL for all API calls
```

## Authentication

All endpoints require API key authentication via the `x-api-key` header:

```javascript
// Replace with your actual API key
const API_KEY = 'your-api-key-here';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
});
```

## Available Methods

### 1. Send Message (`POST /flow/message/send`)

Send a message to start or continue a conversation.

```javascript
async function sendMessage(messageData) {
  const response = await fetch(`${API_BASE_URL}/flow/message/send`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      message: messageData.message,           // Required: The user's message
      dialogId: messageData.dialogId,         // Optional: Existing dialog ID to continue conversation
      goodResponse: messageData.goodResponse, // Optional: Mark as good response
      badResponse: messageData.badResponse,   // Optional: Mark as bad response
      provider: messageData.provider,         // Optional: LLM provider to use
      model: messageData.model,               // Optional: Specific model to use
      temperature: messageData.temperature    // Optional: Temperature setting (0-2)
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Example usage:
const API_KEY = 'your-actual-api-key-here';

try {
  const result = await sendMessage({
    message: "Hello, how can you help me?",
    dialogId: null,  // Start new conversation
    provider: "openai",
    model: "gpt-4",
    temperature: 0.7
  });
  
  console.log('Message sent successfully:');
  console.log('Dialog ID:', result.dialogId);
  console.log('Message ID:', result.messageId);
  console.log('Question:', result.question);
  console.log('Answer:', result.answer);
} catch (error) {
  console.error('Error sending message:', error);
}
```

### 2. Get Dialog Messages (`GET /flow/dialog`)

Retrieve messages from a specific dialog conversation.

```javascript
async function getDialogMessages(dialogId, page = 1, perPage = 20) {
  const params = new URLSearchParams({
    dialogId: dialogId,
    curPage: page.toString(),
    perPage: perPage.toString()
  });

  const response = await fetch(`${API_BASE_URL}/flow/dialog?${params}`, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Example usage:
const API_KEY = 'your-actual-api-key-here';

try {
  const dialogData = await getDialogMessages('your-dialog-id', 1, 10);
  
  console.log('Dialog messages:');
  console.log('Total results:', dialogData.meta.totalResults);
  console.log('Current page:', dialogData.meta.curPage);
  
  dialogData.items.forEach((message, index) => {
    console.log(`Message ${index + 1}:`);
    console.log('  ID:', message.id);
    console.log('  Question:', message.question);
    console.log('  Answer:', message.answer);
    console.log('  Created:', message.createdAt);
  });
} catch (error) {
  console.error('Error fetching dialog:', error);
}
```

### 3. Get Message Trace (`GET /flow/message/trace`)

Retrieve trace/debug information for a specific message.

```javascript
async function getMessageTrace(messageId) {
  const params = new URLSearchParams({
    messageId: messageId
  });

  const response = await fetch(`${API_BASE_URL}/flow/message/trace?${params}`, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Example usage:
const API_KEY = 'your-actual-api-key-here';

try {
  const traceData = await getMessageTrace('your-message-id');
  
  console.log('Message trace:');
  console.log('Message ID:', traceData.messageId);
  console.log('Trace data:', traceData.trace);
} catch (error) {
  console.error('Error fetching trace:', error);
}
```

### 4. Cancel/Delete Message (`POST /flow/message/cancel`)

Soft delete a message from the conversation.

```javascript
async function cancelMessage(messageId) {
  const response = await fetch(`${API_BASE_URL}/flow/message/cancel`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      messageId: messageId
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Example usage:
const API_KEY = 'your-actual-api-key-here';

try {
  const result = await cancelMessage('message-to-delete-id');
  console.log('Message cancelled successfully:', result.message);
} catch (error) {
  console.error('Error cancelling message:', error);
}
```

## Frontend Integration Examples

### React Component Example

```jsx
import React, { useState } from 'react';

const ChatComponent = ({ apiKey }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const API_KEY = apiKey; // Pass API key as prop
      
      const response = await fetch('http://localhost:3000/api/flow/message/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          message: input,
          dialogId: messages.length > 0 ? messages[0].dialogId : null
        })
      });

      const data = await response.json();
      
      setMessages(prev => [{
        id: data.messageId,
        question: data.question,
        answer: data.answer,
        dialogId: data.dialogId
      }, ...prev]);
      
      setInput('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className="message-pair">
            <div className="user-message">You: {msg.question}</div>
            <div className="bot-message">Bot: {msg.answer}</div>
          </div>
        ))}
      </div>
      
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
```

### Vanilla JavaScript Class

```javascript
class FlowApiClient {
  constructor(apiKey, baseUrl = 'http://localhost:3000/api') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    };
  }

  async sendMessage(message, options = {}) {
    const response = await fetch(`${this.baseUrl}/flow/message/send`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        message: message,
        ...options
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  }

  async getDialog(dialogId, page = 1, perPage = 20) {
    const params = new URLSearchParams({
      dialogId,
      curPage: page.toString(),
      perPage: perPage.toString()
    });

    const response = await fetch(`${this.baseUrl}/flow/dialog?${params}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  }

  async getMessageTrace(messageId) {
    const params = new URLSearchParams({ messageId });
    const response = await fetch(`${this.baseUrl}/flow/message/trace?${params}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  }

  async cancelMessage(messageId) {
    const response = await fetch(`${this.baseUrl}/flow/message/cancel`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ messageId })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  }
}

// Usage example:
const client = new FlowApiClient('your-api-key');

// Send a message
client.sendMessage('Hello!')
  .then(response => console.log('Sent:', response))
  .catch(error => console.error('Error:', error));

// Get dialog history
client.getDialog('dialog-id')
  .then(history => console.log('History:', history))
  .catch(error => console.error('Error:', error));
```

### Browser Fetch Wrapper

```javascript
// Simple wrapper for browser usage
const FlowAPI = {
  baseUrl: 'http://localhost:3000/api',
  
  async call(method, endpoint, data = null, apiKey) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    };

    const config = {
      method,
      headers
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  },

  // Convenience methods
  sendMessage: (data, apiKey) => 
    FlowAPI.call('POST', '/flow/message/send', data, apiKey),
    
  getDialog: (dialogId, page = 1, perPage = 20, apiKey) => 
    FlowAPI.call('GET', `/flow/dialog?dialogId=${dialogId}&curPage=${page}&perPage=${perPage}`, null, apiKey),
    
  getMessageTrace: (messageId, apiKey) => 
    FlowAPI.call('GET', `/flow/message/trace?messageId=${messageId}`, null, apiKey),
    
  cancelMessage: (messageId, apiKey) => 
    FlowAPI.call('POST', '/flow/message/cancel', { messageId }, apiKey)
};

// Usage in browser:
// FlowAPI.sendMessage({ message: "Hello!" }, 'your-api-key')
//   .then(result => console.log(result));
```

## Error Handling Best Practices

```javascript
// Comprehensive error handler
async function apiCallWithErrorHandling(apiFunction, ...args) {
  try {
    const result = await apiFunction(...args);
    return { success: true, data: result };
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.message.includes('401')) {
      errorMessage = 'Invalid or missing API key';
    } else if (error.message.includes('403')) {
      errorMessage = 'Access forbidden';
    } else if (error.message.includes('404')) {
      errorMessage = 'Resource not found';
    } else if (error.message.includes('500')) {
      errorMessage = 'Server error';
    }
    
    return { 
      success: false, 
      error: errorMessage,
      originalError: error.message
    };
  }
}

// Usage:
const result = await apiCallWithErrorHandling(
  FlowAPI.sendMessage, 
  { message: "Test message" }, 
  'your-api-key'
);

if (result.success) {
  console.log('Success:', result.data);
} else {
  console.error('Error:', result.error);
}
```

This guide provides complete documentation for integrating with the Flow Controller API on the frontend using JavaScript fetch, with practical examples for React, vanilla JavaScript, and browser usage.