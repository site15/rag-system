# JavaScript Client Guide for Flow Controller API

This comprehensive guide explains how to interact with the Flow Controller API using JavaScript's `fetch` API. The API uses `http://localhost:3000/api` as its base URL with API key authentication.

## Table of Contents
- [Base API Configuration](#base-api-configuration)
- [Authentication](#authentication)
- [Core API Methods](#core-api-methods)
- [Frontend Integration Examples](#frontend-integration-examples)
- [Advanced Usage Patterns](#advanced-usage-patterns)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## Base API Configuration

The API is available at: `http://localhost:3000/api`

```javascript
const API_BASE_URL = 'http://localhost:3000/api'; // Base URL for all API calls
const DEFAULT_TIMEOUT = 30000; // 30 seconds
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

// For dynamic API key usage:
const getAuthHeadersWithKey = (apiKey) => ({
  'Content-Type': 'application/json',
  'x-api-key': apiKey
});
```

## Core API Methods

### 1. Send Message (`POST /flow/message/send`)

Send a message to start or continue a conversation.

```javascript
async function sendMessage(messageData, apiKey = API_KEY) {
  const response = await fetch(`${API_BASE_URL}/flow/message/send`, {
    method: 'POST',
    headers: getAuthHeadersWithKey(apiKey),
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
  }, API_KEY);
  
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
async function getDialogMessages(dialogId, apiKey = API_KEY, page = 1, perPage = 20) {
  const params = new URLSearchParams({
    dialogId: dialogId,
    curPage: page.toString(),
    perPage: perPage.toString()
  });

  const response = await fetch(`${API_BASE_URL}/flow/dialog?${params}`, {
    method: 'GET',
    headers: getAuthHeadersWithKey(apiKey)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Example usage:
const API_KEY = 'your-actual-api-key-here';

try {
  const dialogData = await getDialogMessages('your-dialog-id', API_KEY, 1, 10);
  
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
async function getMessageTrace(messageId, apiKey = API_KEY) {
  const params = new URLSearchParams({
    messageId: messageId
  });

  const response = await fetch(`${API_BASE_URL}/flow/message/trace?${params}`, {
    method: 'GET',
    headers: getAuthHeadersWithKey(apiKey)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

// Example usage:
const API_KEY = 'your-actual-api-key-here';

try {
  const traceData = await getMessageTrace('your-message-id', API_KEY);
  
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
async function cancelMessage(messageId, apiKey = API_KEY) {
  const response = await fetch(`${API_BASE_URL}/flow/message/cancel`, {
    method: 'POST',
    headers: getAuthHeadersWithKey(apiKey),
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
  const result = await cancelMessage('message-to-delete-id', API_KEY);
  console.log('Message cancelled successfully:', result.message);
} catch (error) {
  console.error('Error cancelling message:', error);
}
```

## Frontend Integration Examples

### React Component Example

```jsx
import React, { useState, useEffect } from 'react';

const ChatComponent = ({ apiKey, apiUrl = 'http://localhost:3000/api' }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialogId, setDialogId] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/flow/message/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          message: input,
          dialogId: dialogId
        })
      });

      const data = await response.json();
      
      // Update dialog ID if this is the first message
      if (!dialogId && data.dialogId) {
        setDialogId(data.dialogId);
      }
      
      setMessages(prev => [{
        id: data.messageId,
        question: data.question,
        answer: data.answer,
        createdAt: new Date().toISOString()
      }, ...prev]);
      
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistory = async () => {
    if (!dialogId) return;
    
    try {
      const params = new URLSearchParams({
        dialogId: dialogId,
        curPage: '1',
        perPage: '50'
      });
      
      const response = await fetch(`${apiUrl}/flow/dialog?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        }
      });
      
      const data = await response.json();
      setMessages(data.items.reverse()); // Show oldest first
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  useEffect(() => {
    if (dialogId) {
      loadHistory();
    }
  }, [dialogId]);

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className="message-pair">
            <div className="user-message">
              <strong>You:</strong> {msg.question}
              <small>{new Date(msg.createdAt).toLocaleString()}</small>
            </div>
            <div className="bot-message">
              <strong>Bot:</strong> {msg.answer}
            </div>
          </div>
        ))}
        {loading && <div className="typing-indicator">Bot is typing...</div>}
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
    this.defaultTimeout = 30000;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);
    
    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  async sendMessage(message, options = {}) {
    return await this.request('/flow/message/send', {
      method: 'POST',
      body: JSON.stringify({
        message: message,
        ...options
      })
    });
  }

  async getDialog(dialogId, page = 1, perPage = 20) {
    const params = new URLSearchParams({
      dialogId,
      curPage: page.toString(),
      perPage: perPage.toString()
    });
    
    return await this.request(`/flow/dialog?${params}`, {
      method: 'GET'
    });
  }

  async getMessageTrace(messageId) {
    const params = new URLSearchParams({ messageId });
    return await this.request(`/flow/message/trace?${params}`, {
      method: 'GET'
    });
  }

  async cancelMessage(messageId) {
    return await this.request('/flow/message/cancel', {
      method: 'POST',
      body: JSON.stringify({ messageId })
    });
  }
}

// Usage example:
const client = new FlowApiClient('your-api-key');

// Send a message
client.sendMessage('Hello!')
  .then(response => console.log('Sent:', response))
  .catch(error => console.error('Error:', error));

// Get dialog history with pagination
client.getDialog('dialog-id', 1, 10)
  .then(history => console.log('History:', history))
  .catch(error => console.error('Error:', error));
```

### Browser Fetch Wrapper with Advanced Features

```javascript
const FlowAPI = {
  baseUrl: 'http://localhost:3000/api',
  defaultTimeout: 30000,
  
  async call(method, endpoint, data = null, apiKey, timeout = this.defaultTimeout) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    };

    const config = { method, headers };
    
    if (data && (method === 'POST' || method === 'PUT')) {
      config.body = JSON.stringify(data);
    }

    // Add timeout support
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetch(url, { ...config, signal: controller.signal });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  },

  // Convenience methods with timeout support
  sendMessage: (data, apiKey, timeout) => 
    FlowAPI.call('POST', '/flow/message/send', data, apiKey, timeout),
    
  getDialog: (dialogId, page = 1, perPage = 20, apiKey, timeout) => {
    const params = new URLSearchParams({ 
      dialogId, 
      curPage: page.toString(), 
      perPage: perPage.toString() 
    });
    return FlowAPI.call('GET', `/flow/dialog?${params}`, null, apiKey, timeout);
  },
    
  getMessageTrace: (messageId, apiKey, timeout) => {
    const params = new URLSearchParams({ messageId });
    return FlowAPI.call('GET', `/flow/message/trace?${params}`, null, apiKey, timeout);
  },
    
  cancelMessage: (messageId, apiKey, timeout) => 
    FlowAPI.call('POST', '/flow/message/cancel', { messageId }, apiKey, timeout)
};

// Batch operations example
const FlowAPIBatch = {
  async sendMultipleMessages(messages, apiKey) {
    const promises = messages.map(msg => 
      FlowAPI.sendMessage(msg, apiKey).catch(err => ({ error: err.message }))
    );
    return Promise.all(promises);
  },
  
  async getMultipleTraces(messageIds, apiKey) {
    const promises = messageIds.map(id => 
      FlowAPI.getMessageTrace(id, apiKey).catch(err => ({ error: err.message }))
    );
    return Promise.all(promises);
  }
};

// Usage examples:
// Single call with custom timeout
FlowAPI.sendMessage({ message: "Hello!" }, 'your-api-key', 15000)
  .then(result => console.log(result));

// Batch operations
FlowAPIBatch.sendMultipleMessages([
  { message: "First message" },
  { message: "Second message" }
], 'your-api-key')
  .then(results => console.log('Batch results:', results));
```

## Advanced Usage Patterns

### Connection Pooling and Retry Logic

```javascript
class ResilientFlowClient {
  constructor(apiKey, baseUrl = 'http://localhost:3000/api') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.maxRetries = 3;
    this.retryDelay = 1000;
  }

  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-api-key': this.apiKey
    };
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async requestWithRetry(endpoint, options = {}, retryCount = 0) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status >= 500 && retryCount < this.maxRetries) {
          await this.delay(this.retryDelay * Math.pow(2, retryCount));
          return this.requestWithRetry(endpoint, options, retryCount + 1);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (retryCount < this.maxRetries) {
        await this.delay(this.retryDelay * Math.pow(2, retryCount));
        return this.requestWithRetry(endpoint, options, retryCount + 1);
      }
      throw error;
    }
  }

  async sendMessage(message, options = {}) {
    return await this.requestWithRetry('/flow/message/send', {
      method: 'POST',
      body: JSON.stringify({ message, ...options })
    });
  }
}
```

### TypeScript Definitions

```typescript
interface SendMessageRequest {
  message: string;
  dialogId?: string | null;
  goodResponse?: boolean;
  badResponse?: boolean;
  provider?: string;
  model?: string;
  temperature?: number;
}

interface SendMessageResponse {
  dialogId: string | null;
  question: string;
  answer: string;
  messageId: string | null;
}

interface DialogMessage {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
  dialogId?: string;
}

interface DialogResponse {
  items: DialogMessage[];
  meta: {
    curPage: number;
    perPage: number;
    totalResults: number;
  };
}

interface MessageTraceResponse {
  messageId: string;
  trace: Record<string, any>;
}

interface CancelMessageResponse {
  message: string;
}
```

## Error Handling

### Comprehensive Error Handler

```javascript
class ApiErrorHandler {
  static categorizeError(error) {
    if (error.message.includes('401')) {
      return { type: 'AUTHENTICATION', message: 'Invalid or missing API key' };
    } else if (error.message.includes('403')) {
      return { type: 'FORBIDDEN', message: 'Access forbidden' };
    } else if (error.message.includes('404')) {
      return { type: 'NOT_FOUND', message: 'Resource not found' };
    } else if (error.message.includes('500')) {
      return { type: 'SERVER_ERROR', message: 'Server error' };
    } else if (error.message.includes('timeout')) {
      return { type: 'TIMEOUT', message: 'Request timeout' };
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return { type: 'NETWORK', message: 'Network error - check connection' };
    }
    return { type: 'UNKNOWN', message: 'An unknown error occurred' };
  }

  static async handleApiCall(apiFunction, ...args) {
    try {
      const result = await apiFunction(...args);
      return { success: true, data: result };
    } catch (error) {
      const categorizedError = this.categorizeError(error);
      return { 
        success: false, 
        error: categorizedError.message,
        errorType: categorizedError.type,
        originalError: error.message
      };
    }
  }
}

// Usage:
const result = await ApiErrorHandler.handleApiCall(
  FlowAPI.sendMessage, 
  { message: "Test message" }, 
  'your-api-key'
);

if (result.success) {
  console.log('Success:', result.data);
} else {
  console.error('Error:', result.error);
  // Handle specific error types
  switch(result.errorType) {
    case 'AUTHENTICATION':
      // Redirect to login
      break;
    case 'NETWORK':
      // Show offline message
      break;
    default:
      // Show generic error
      break;
  }
}
```

## Best Practices

### 1. Configuration Management

```javascript
const AppConfig = {
  development: {
    apiUrl: 'http://localhost:3000/api',
    timeout: 30000,
    retries: 3
  },
  production: {
    apiUrl: 'https://your-production-api.com/api',
    timeout: 15000,
    retries: 1
  }
};

const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return AppConfig[env];
};
```

### 2. Request Interception

```javascript
const createInterceptedClient = (apiKey, config = getCurrentConfig()) => {
  const client = new FlowApiClient(apiKey, config.apiUrl);
  
  // Add logging interceptor
  const originalRequest = client.request.bind(client);
  client.request = async function(endpoint, options) {
    console.log(`API Request: ${options.method || 'GET'} ${endpoint}`);
    const startTime = Date.now();
    
    try {
      const result = await originalRequest(endpoint, options);
      const duration = Date.now() - startTime;
      console.log(`API Response: ${endpoint} (${duration}ms)`);
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`API Error: ${endpoint} (${duration}ms)`, error.message);
      throw error;
    }
  };
  
  return client;
};
```

### 3. Caching Strategy

```javascript
class CachedFlowClient {
  constructor(apiKey, ttl = 300000) { // 5 minutes default TTL
    this.client = new FlowApiClient(apiKey);
    this.cache = new Map();
    this.ttl = ttl;
  }

  getKey(endpoint, params) {
    return `${endpoint}?${new URLSearchParams(params).toString()}`;
  }

  isExpired(timestamp) {
    return Date.now() - timestamp > this.ttl;
  }

  async getCachedOrFetch(endpoint, params = {}, fetchFn) {
    const key = this.getKey(endpoint, params);
    
    // Check cache
    if (this.cache.has(key)) {
      const cached = this.cache.get(key);
      if (!this.isExpired(cached.timestamp)) {
        return cached.data;
      }
      // Remove expired cache
      this.cache.delete(key);
    }

    // Fetch fresh data
    const data = await fetchFn();
    
    // Cache the result
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });

    return data;
  }

  async getDialog(dialogId, page = 1, perPage = 20) {
    return await this.getCachedOrFetch(
      '/flow/dialog',
      { dialogId, page, perPage },
      () => this.client.getDialog(dialogId, page, perPage)
    );
  }
}
```

This comprehensive guide provides everything needed to integrate with the Flow Controller API, from basic usage to advanced patterns, with practical examples for various frontend frameworks and use cases.