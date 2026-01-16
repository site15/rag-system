const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio'); // For HTML processing
const { randomUUID } = require('crypto');

// Supported file extensions
const SUPPORTED_EXTENSIONS = ['.txt', '.md', '.html', '.htm'];

// Function to convert HTML to Markdown-like format
function htmlToMarkdown(html, isMd) {
  if (!cheerio) {
    // If cheerio is not available, return raw HTML
    console.warn('cheerio not available, returning raw HTML');
    return html;
  }

  const codes = new Map();
  const headers = [];

  const $ = cheerio.load(html);
  let text = html;

  if (!isMd) {
    $('code').each((i, elem) => {
      const text = $(elem).text();
      const uuid = randomUUID();
      codes.set(uuid, text);
      $(elem).replaceWith(uuid);
    });


    // Remove script and style elements
    $('script, style, nav, footer, header').remove();

    for (let i = 1; i <= 6; i++) {
      if ($(`h${i}`).length > 0) {
        headers.push(i);
      }
    }


    // Convert HTML elements to Markdown equivalents
    $('h1').each((i, elem) => $(elem).replaceWith(`# ${$(elem).text()}\n\n`));
    $('h2').each((i, elem) => $(elem).replaceWith(`## ${$(elem).text()}\n\n`));
    $('h3').each((i, elem) => $(elem).replaceWith(`### ${$(elem).text()}\n\n`));
    $('h4').each((i, elem) => $(elem).replaceWith(`#### ${$(elem).text()}\n\n`));
    $('h5').each((i, elem) => $(elem).replaceWith(`##### ${$(elem).text()}\n\n`));
    $('h6').each((i, elem) => $(elem).replaceWith(`###### ${$(elem).text()}\n\n`));

    $('p').each((i, elem) => $(elem).replaceWith(`${$(elem).text()}\n\n`));
    $('br').each((i, elem) => $(elem).replaceWith('\n'));
    $('hr').each((i, elem) => $(elem).replaceWith('---\n\n'));

    $('strong, b').each((i, elem) => $(elem).replaceWith(`**${$(elem).text()}**`));
    $('em, i').each((i, elem) => $(elem).replaceWith(`*${$(elem).text()}*`));

    $('a').each((i, elem) => $(elem).replaceWith(`[${$(elem).text()}](${$(elem).attr('href')})`));

    $('img').each((i, elem) => $(elem).replaceWith(`![${$(elem).attr('alt')}](${$(elem).attr('src')})`));

    $('li').each((i, elem) => $(elem).replaceWith(`- ${$(elem).text()}\n`));
    $('ul, ol').each((i, elem) => $(elem).replaceWith(`${$(elem).text()}\n`));

    // Get the processed text content
    text = $.html();
  } else {
    for (let i = 1; i <= 6; i++) {
      if (`\n${text}`.split(`\n${new Array().fill('#').join('')} `).length > 0) {
        headers.push(i);
      }
    }
  }


  // Clean up extra whitespace
  text = text.replace(/\n\s*\n/g, '\n\n');
  text = text.replace(/<[^>]*>/g, ''); // Remove any remaining HTML tags
  text = text.trim();

  // Now add the required separators based on header levels
  if (headers.length === 2) {
    for (let i = headers.length - 1; i >= 1; i--) {
      let len = headers[i];
      if (len === 5) {
        text = text.replace(/(^|\n)(##### )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
      if (len === 4) {
        text = text.replace(/(^|\n)(#### )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
      if (len === 3) {
        text = text.replace(/(^|\n)(### )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
      if (len === 2) {
        text = text.replace(/(^|\n)(## )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
      if (len === 1) {
        text = text.replace(/(^|\n)(# )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
    }
  } else if (headers.length > 2) {
    for (let i = headers.length - 1; i >= 2; i--) {
      let len = headers[i];
      if (len === 5) {
        text = text.replace(/(^|\n)(##### )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
      if (len === 4) {
        text = text.replace(/(^|\n)(#### )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
      if (len === 3) {
        text = text.replace(/(^|\n)(### )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
      if (len === 2) {
        text = text.replace(/(^|\n)(## )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
      if (len === 1) {
        text = text.replace(/(^|\n)(# )/g, (match, before, headerMarker) => {
          return `${before}\n--\n\n${headerMarker}`;
        });
      }
    }
  }

  for (let [uuid, innerText] of codes) {
    if (innerText.includes('\n')) {
      text = text.split(uuid).join("\n```\n" + innerText + "```\n");
    } else {
      innerText = innerText.split('\`').join('\\\`')
      text = text.split(uuid).join("`" + innerText + "`");
    }
  }

  // Strip leading whitespace (spaces and tabs) from the beginning of lines
  text = text.replace(/^[ \t]+/gm, '');

  // Reduce multiple consecutive empty lines to a single empty line
  text = text.replace(/\n{3,}/g, '\n\n');

  return text;
}

// Function to process a single file
function processFile(inputPath, outputPath) {
  console.log(`Processing: ${inputPath}`);

  const ext = path.extname(inputPath).toLowerCase();
  let content = fs.readFileSync(inputPath, 'utf8');

  // Convert content based on file type
  if (ext === '.html' || ext === '.htm' || ext === '.md') {
    content = htmlToMarkdown(content, ext === '.md');
  }
  // For .txt and .md files, we can use the content as is, potentially with minor adjustments

  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the Markdown content to the output file
  fs.writeFileSync(outputPath, content);
  console.log(`Saved: ${outputPath}`);
}

// Function to recursively process directories
function processDirectory(inputDir, outputDir, rm) {
  console.log(`Processing directory: ${inputDir}`);

  // Create output directory if it doesn't exist
  if (rm && fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const items = fs.readdirSync(inputDir);

  for (const item of items) {
    const inputPath = path.join(inputDir, item);
    const outputPath = path.join(outputDir, item);

    const stat = fs.statSync(inputPath);

    if (stat.isDirectory()) {
      // Recursively process subdirectory
      if (!inputPath.endsWith('/telegram')) {
        processDirectory(inputPath, outputPath, true);
      }
    } else {
      // Process file
      const ext = path.extname(inputPath).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        // Change the extension to .md for the output file
        const outputFilePath = outputPath.replace(path.extname(outputPath), '.md');
        processFile(inputPath, outputFilePath);
      } else {
        console.log(`Skipping unsupported file: ${inputPath}`);
      }
    }
  }
}

// Main function
function main() {
  const inputDir = '../raw';
  const outputDir = '../sources';

  console.log('Starting conversion to Markdown format...');
  console.log(`Input directory: ${inputDir}`);
  console.log(`Output directory: ${outputDir}`);

  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory does not exist: ${inputDir}`);
    return;
  }

  processDirectory(inputDir, outputDir);

  console.log('Conversion completed!');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  htmlToMarkdown,
  processFile,
  processDirectory,
  main
};
