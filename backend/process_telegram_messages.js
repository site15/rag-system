const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Function to parse a single HTML file and extract messages
function parseTelegramFile(filePath, repliedToMessages) {
  const messages = [];
  let html = fs.readFileSync(filePath, 'utf8');

  // Заменяем <br> и аналогичные на пробел
  html = html.replace(/<br\s*\/?>/gi, ' ');

  // Добавляем пробел после всех тегов
  html = html.replace(/<(\/?[\w\-]+)(\s[^>]*)?>/gi, '$& ');

  // Схлопываем множественные пробелы
  html = html.replace(/\s+/g, ' ').trim();

  let $ = cheerio.load(html);

  // Find all message divs
  $('.message.default').each((index, element) => {
    const $message = $(element);

    // Extract the date/time from the details title
    const $dateElement = $message.find('.date.details');
    const dateTitle = $dateElement.attr('title');

    // Extract the author name
    const author = $message.find('.from_name').text().trim();

    // Extract the message text using .text() method instead of .html()
    const text = $message.find('.text').text().trim();

    // Extract reply information
    const $replyTo = $message.find('.reply_to');
    let replyToMessageId = null;
    if ($replyTo.length > 0) {
      const replyLink = $replyTo.find('a').attr('href');
      if (replyLink) {
        // Extract message ID from href like "#go_to_message386532" or "messages327.html#go_to_message386501"
        const match = replyLink.match(/go_to_message(\d+)/);
        if (match) {
          replyToMessageId = match[1];
        }
      }
    }

    // Extract message ID
    const messageId = $message.attr('id');
    let numericMessageId = null;
    if (messageId) {
      const idMatch = messageId.match(/\d+/);
      if (idMatch) {
        numericMessageId = idMatch[0];
      }
    }

    if (author && text) {
      messages.push({
        id: messageId, // Get the message ID
        numericId: numericMessageId,
        time: dateTitle || null,
        author: author,
        text: text,
        replyTo: replyToMessageId
      });
    }
  });

  // Add conversation context to each message
  for (let i = 0; i < messages.length; i++) {
    // Only add conversation context if this message is not a reply
    let contextTexts = [];
    if (!messages[i].replyTo) {
      // Get the 4 previous messages as context
      const contextStartIndex = Math.max(0, i - 4);
      const contextMessages = messages.slice(contextStartIndex, i);

      // Extract just the text from context messages
      contextTexts = contextMessages.map(msg => msg.text);
    }

    // Find the replied-to message if this message has a reply
    let repliedToMessage = null;
    if (messages[i].replyTo) {
      repliedToMessage = messages.find(msg => {
        // Compare the replyTo ID with the message ID (remove 'message' prefix if present)
        const msgId = msg.id ? msg.id.replace('message', '') : '';
        return msgId === messages[i].replyTo;
      }) || repliedToMessages.get(String(messages[i].replyTo));
    }

    // Add context to the current message
    messages[i].context = contextTexts;
    messages[i].repliedToMessage = repliedToMessage;
  }

  html = null;
  $ = null;
  return messages;
}

// Function to convert messages to Markdown format
function convertToMarkdown(messages) {
  let markdown = '';

  messages.forEach((msg) => {
    markdown += `## My telegram message #${msg.numericId}\n`;
    markdown += `**Time:** ${msg.time || 'Unknown'}\n`;

    if (msg.numericId) {
      markdown += `**Link:** https://t.me/nest_ru/${msg.numericId}\n`;
    }

    // === 🔍 SECTION FOR EMBEDDING ===
    markdown += `\n### Semantic Search Content\n`;
    markdown += `This section is used ONLY for semantic search and understanding.\n\n`;

    // Добавляем Conversation Context
    if (msg.context && msg.context.length > 0 && !msg.repliedToMessage) {
      markdown += `Conversation context:\n`;
      msg.context.forEach((contextText, ctxIndex) => {
        markdown += `- ${contextText}\n`;
      });
      markdown += `\n`;
    }

    // Добавляем replied-to message контекст
    if (msg.repliedToMessage) {
      markdown += `Replied message context:\n`;
      markdown += `- ${msg.repliedToMessage.text}\n\n`;
    }

    // Основное сообщение
    markdown += `Main message:\n`;
    markdown += `${msg.text}\n`;

    // === 🧠 SECTION FOR ANSWER ===
    markdown += `\n---\n\n`;
    markdown += `### Author Message (Answer Source)\n`;
    markdown += `This section MUST be used to generate the final answer.\n\n`;
    markdown += `${msg.text}\n`;

    // Разделитель между сообщениями
    markdown += `\n--\n\n`;
  });

  return markdown;
}

// Main function to process all HTML files
function processAllFiles(repliedToMessages, skipSaveFiles = false) {
  const telegramDir = path.join('..', 'raw', 'telegram');
  const outputDir = path.join('..', 'sources', 'telegram');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Read all HTML files from the telegram directory
  const files = fs.readdirSync(telegramDir).filter(file => path.extname(file).toLowerCase() === '.html').sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || 0, 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || 0, 10);
    return numA - numB;
  });

  console.log(`Found ${files.length} HTML files to process...`);

  for (const file of files) {
    const filePath = path.join(telegramDir, file);
    console.log(`Processing file: ${file}`);

    try {
      let messages = parseTelegramFile(filePath,
        repliedToMessages
      );

      for (const msg of messages.filter(msg => msg.repliedToMessage)) {
        repliedToMessages.set(String(msg.repliedToMessage.numericId), msg.repliedToMessage);
      }

      console.log(`  - Found replied to messages in ${repliedToMessages.size}`);
      console.log(`  - Found ${messages.length} messages in ${file}`);


      // Filter messages by author "IL'shat Khamitov"
      let filteredMessages = messages.filter(msg =>
        msg.author.includes("IL'shat Khamitov") ||
        msg.author.includes("Ильшат Хамитов") ||
        msg.author.includes("Ils'hat Khamitov") ||
        msg.author.includes("Ilshat Khamitov")
      );

      console.log(`  - Found ${filteredMessages.length} messages from IL'shat Khamitov`);

      if (!skipSaveFiles) {
        // Create Markdown file with all filtered messages
        if (filteredMessages.length > 0) {
          const markdownContent = convertToMarkdown(filteredMessages);
          const outputPath = path.join(outputDir, file.replace('html', 'md'));

          fs.writeFileSync(outputPath, markdownContent, 'utf8');

          console.log(`\nSuccessfully created ${outputPath} with ${filteredMessages.length} messages.`);
        } else {
          console.log('\nNo messages found from IL\'shat Khamitov.');
        }
      }

      messages = null
      filteredMessages = null

    } catch (error) {
      console.error(`Error processing file ${file}:`, error.message);
    }
  }
}

// Run the main function
const repliedToMessages = new Map()
processAllFiles(repliedToMessages, true);
processAllFiles(repliedToMessages);