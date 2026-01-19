#!/bin/bash

# API usage examples for message deletion endpoint
# POST /flow/message/delete

echo "=== Message Deletion API Examples ==="
echo

# Example 1: Basic message deletion
echo "🎯 Example 1: Delete a message and reset dialog parameters"
echo "POST /flow/message/delete"
echo "Content-Type: application/json"
echo
echo '{
  "messageId": "123e4567-e89b-12d3-a456-426614174000"
}'
echo
echo "---"
echo

# Example 2: Response format
echo "✅ Success Response:"
echo '{
  "success": true,
  "dialogId": "dialog-uuid-here",
  "message": "Message deleted successfully and dialog parameters reset"
}'
echo
echo "❌ Error Response:"
echo '{
  "success": false,
  "dialogId": null,
  "message": "Failed to delete message"
}'
echo
echo "---"
echo

# Example 3: cURL command
echo "📡 cURL Example:"
echo 'curl -X POST http://localhost:3000/flow/message/delete \\'
echo '  -H "Content-Type: application/json" \\'
echo '  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\'
echo '  -d '"'"'{'
echo '    "messageId": "123e4567-e89b-12d3-a456-426614174000"'
echo '  }'"'"
echo
echo "---"
echo

# Example 4: JavaScript/Fetch example
echo "🌐 JavaScript Fetch Example:"
cat << 'EOF'
const deleteMessage = async (messageId, token) => {
  const response = await fetch('/flow/message/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ messageId })
  });
  
  const result = await response.json();
  console.log('Delete result:', result);
  return result;
};

// Usage
deleteMessage('your-message-id', 'your-jwt-token');
EOF
echo
echo "---"
echo

# Example 5: What happens internally
echo "⚙️  Internal Process:"
echo "1. Validate message exists and isn't already deleted"
echo "2. Set message.deletedAt = CURRENT_TIMESTAMP"
echo "3. If message has dialog:"
echo "   - Set dialog.consecutiveFailures = 0"
echo "   - Set dialog.isFailed = false"
echo "4. Return success status and affected dialog ID"
echo
echo "---"
echo

echo "📝 Notes:"
echo "- This is a SOFT delete (sets deletedAt timestamp)"
echo "- Messages are not physically removed from database"
echo "- Dialog failure tracking is reset to allow continued conversation"
echo "- Returns dialogId in response for tracking purposes"