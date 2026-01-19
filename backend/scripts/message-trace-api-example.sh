#!/bin/bash

# Example usage of the message trace API endpoint

echo "=== Message Trace API Examples ==="
echo ""

# Example 1: Get trace for a specific message
echo "1. Get trace for message (replace MESSAGE_ID with actual UUID):"
echo "curl -X GET 'http://localhost:3000/flow/message-trace?messageId=YOUR_MESSAGE_UUID' \\"
echo "  -H 'Authorization: Bearer YOUR_JWT_TOKEN'"
echo ""

# Example 2: Expected response format
echo "2. Expected response format:"
cat << EOF
{
  "messageId": "123e4567-e89b-12d3-a456-426614174000",
  "trace": {
    "name": "processMessage",
    "start": 1234567890,
    "end": 1234567900,
    "duration": 10,
    "children": [
      {
        "name": "transformQuestion",
        "start": 1234567891,
        "end": 1234567893,
        "duration": 2,
        "payload": {
          "original": "Hello world",
          "transformed": "hello world"
        }
      }
    ],
    "payload": {
      "userId": "user123",
      "dialogId": "dialog456"
    }
  },
  "hasTrace": true
}
EOF

echo ""
echo "3. Response when trace doesn't exist:"
cat << EOF
{
  "messageId": "nonexistent-id",
  "trace": null,
  "hasTrace": false
}
EOF

echo ""
echo "=== Notes ==="
echo "- The trace contains execution timing and payload data"
echo "- Traces are automatically collected during message processing"
echo "- Only messages that have been processed will have traces"
echo "- Traces include nested function calls and their durations"