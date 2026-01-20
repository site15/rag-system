# JavaScript Client Guide for Flow Controller

This guide explains how to interact with the Flow Controller API using JavaScript's `fetch` API.

## Base URL Configuration

First, configure your base API URL:

```javascript
const API_BASE_URL = 'http://localhost:3000'; // Adjust for your environment
```

## API Key Management

### Obtaining an API Key

API keys must be obtained from your system administrator or generated through your application's admin panel. The API key should be kept secure and never exposed in client-side code in production.

### Environment-based Configuration

```javascript
// For development
const API_KEY = process.env.DEV_API_KEY || 'your-development-key';

// For production (recommended approach)
const API_KEY = process.env.PROD_API_KEY;

// In browser environments, consider using environment variables
// or secure storage mechanisms
```

### Secure Storage Options

1. **Environment Variables** (Node.js/Backend):
   ```bash
   export API_KEY="your-secret-api-key"
   ```

2. **Browser Storage** (Frontend):
   ```javascript
   // Store in sessionStorage (cleared on tab close)
   sessionStorage.setItem('api_key', apiKey);
   
   // Or localStorage (persists until cleared)
   localStorage.setItem('api_key', apiKey);
   ```

3. **Secure HTTP Headers** (Production):
   Consider implementing server-side proxy that adds the API key header automatically.

### Important Security Notes

- **IP Restrictions**: The API may have IP-based access controls. Ensure your requests originate from allowed IP addresses.
- **Rate Limiting**: Be aware of request rate limits to avoid being temporarily blocked.
- **HTTPS Required**: Always use HTTPS in production to protect your API key in transit.

## Authentication

All endpoints require API key authentication. You'll need to include the API key in the `x-api-key` header:

```javascript
// Replace with your actual API key
const API_KEY = 'your-api-key-here';

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': API_KEY
});

// Or if you want to pass it dynamically:
const getAuthHeadersWithKey = (apiKey) => ({
  'Content-Type': 'application/json',
  'x-api-key': apiKey
});
```

## Available Endpoints

### 1. Send Message (`POST /flow/message/send`)

Send a message to start or continue a conversation.

```javascript
async function sendMessage(messageData, apiKey) {
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
async function getDialogMessages(dialogId, apiKey, page = 1, perPage = 20) {
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
async function getMessageTrace(messageId, apiKey) {
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
async function cancelMessage(messageId, apiKey) {
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

## Complete Example: Conversation Flow

Here's a complete example showing how to have a conversation:

```javascript
class ChatClient {
  constructor(apiKey, baseUrl = 'http://localhost:3000') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.currentDialogId = null;
  }

  async sendMessage(message, options = {}) {
    const payload = {
      message: message,
      dialogId: this.currentDialogId || null,
      ...options
    };

    const response = await fetch(`${this.baseUrl}/flow/message/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.status}`);
    }

    const result = await response.json();
    
    // Store dialog ID for continuation
    if (result.dialogId && !this.currentDialogId) {
      this.currentDialogId = result.dialogId;
    }

    return result;
  }

  async getConversationHistory(page = 1, perPage = 20) {
    if (!this.currentDialogId) {
      throw new Error('No active dialog');
    }

    const params = new URLSearchParams({
      dialogId: this.currentDialogId,
      curPage: page.toString(),
      perPage: perPage.toString()
    });

    const response = await fetch(`${this.baseUrl}/flow/dialog?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get history: ${response.status}`);
    }

    return await response.json();
  }

  reset() {
    this.currentDialogId = null;
  }
}

// Usage example:
async function demonstrateConversation() {
  // Replace with your actual API key
  const API_KEY = 'your-actual-api-key-here';
  
  const chat = new ChatClient(API_KEY);

  try {
    // First message
    console.log('Sending first message...');
    let response = await chat.sendMessage("Hi! Tell me about NestJS");
    console.log('Bot:', response.answer);

    // Follow-up message
    console.log('\nSending follow-up...');
    response = await chat.sendMessage("What are the main features?");
    console.log('Bot:', response.answer);

    // Get conversation history
    console.log('\nGetting conversation history...');
    const history = await chat.getConversationHistory();
    console.log(`Total messages: ${history.meta.totalResults}`);
    
    history.items.forEach((msg, i) => {
      console.log(`\nMessage ${i + 1}:`);
      console.log(`Q: ${msg.question}`);
      console.log(`A: ${msg.answer}`);
    });

  } catch (error) {
    console.error('Chat error:', error);
  }
}

// Run the demonstration
demonstrateConversation();
```

## Error Handling

Always implement proper error handling, especially for authentication errors:

```javascript
async function safeApiCall(apiFunction, ...args) {
  try {
    const result = await apiFunction(...args);
    return { success: true, data: result };
  } catch (error) {
    // Handle specific error cases
    if (error.status === 401) {
      return { 
        success: false, 
        error: 'Invalid or missing API key',
        status: 401,
        code: 'INVALID_API_KEY'
      };
    }
    if (error.status === 403) {
      return { 
        success: false, 
        error: 'Access forbidden - check your permissions',
        status: 403,
        code: 'FORBIDDEN'
      };
    }
    
    return { 
      success: false, 
      error: error.message,
      status: error.status 
    };
  }
}

// Enhanced error handling with automatic retry for temporary issues
async function robustApiCall(apiFunction, maxRetries = 3, ...args) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await apiFunction(...args);
      return { success: true, data: result };
    } catch (error) {
      lastError = error;
      
      // Don't retry on authentication errors
      if (error.status === 401 || error.status === 403) {
        break;
      }
      
      // Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
  
  return { 
    success: false, 
    error: lastError.message,
    status: lastError.status,
    retries: maxRetries
  };
}
```
// Usage with API key:
const API_KEY = 'your-actual-api-key-here';

const result = await safeApiCall(sendMessage, {
  message: "Hello world"
}, API_KEY);

if (result.success) {
  console.log('Success:', result.data);
} else {
  console.error('API Error:', result.error);
}
```

## Environment Configuration

Create a config file for different environments:

```javascript
// config.js
const CONFIG = {
  development: {
    apiUrl: 'http://localhost:3000',
    timeout: 30000
  },
  production: {
    apiUrl: 'https://your-production-api.com',
    timeout: 15000
  }
};

const getCurrentConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return CONFIG[env];
};

module.exports = { getCurrentConfig };
```

## TypeScript Types (if using TypeScript)

```typescript
interface SendMessageRequest {
  message: string;
  dialogId?: string;
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
}

interface DialogResponse {
  items: DialogMessage[];
  meta: {
    curPage: number;
    perPage: number;
    totalResults: number;
  };
}
```

This guide provides all the necessary information to integrate with the Flow Controller API using vanilla JavaScript fetch.