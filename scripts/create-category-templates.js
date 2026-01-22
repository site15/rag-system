const fs = require('fs');
const path = require('path');

// Read the category-prompts.ts file
const filePath = '/home/endy/Projects/site15/rag-system/backend/src/llm/category-prompts.ts';
const content = fs.readFileSync(filePath, 'utf8');

// Split by category patterns to extract each template
const categoryPattern = /\[Category\.(\w+)\]: `([\s\S]*?)`,/g;
const matches = [...content.matchAll(categoryPattern)];

console.log(`Found ${matches.length} categories`);

// Create constants directory if it doesn't exist
const constantsDir = '/home/endy/Projects/site15/rag-system/constants';
if (!fs.existsSync(constantsDir)) {
  fs.mkdirSync(constantsDir);
}

// Process each match
matches.forEach((match, index) => {
  const categoryName = match[1];
  const templateContent = match[2].trim();
  
  // Create filename
  const fileName = `CategoryPrompt_${categoryName}.txt`;
  const fullPath = path.join(constantsDir, fileName);
  
  // Write template file
  fs.writeFileSync(fullPath, templateContent);
  console.log(`Created: ${fileName}`);
});

console.log('All category template files created successfully!');