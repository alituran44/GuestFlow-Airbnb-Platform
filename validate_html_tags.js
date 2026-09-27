const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Stack of opened tags
const selfClosing = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
const tagRegex = /<\/?([a-zA-Z0-9\-]+)([^>]*)>/g;
let match;
const stack = [];
let lineNum = 1;
let lastIndex = 0;

while ((match = tagRegex.exec(html)) !== null) {
  // calculate line number
  const chunk = html.substring(lastIndex, match.index);
  lineNum += (chunk.match(/\n/g) || []).length;
  lastIndex = match.index;

  const fullTag = match[0];
  const tagName = match[1].toLowerCase();
  const isClosing = fullTag.startsWith('</');
  const isSelf = fullTag.endsWith('/>') || selfClosing.has(tagName);

  if (isSelf) continue;

  if (!isClosing) {
    stack.push({ tag: tagName, line: lineNum, full: fullTag.substring(0, 40) });
  } else {
    if (stack.length === 0) {
      console.log(`EXTRA CLOSING TAG: </${tagName}> at line ${lineNum}`);
    } else {
      const top = stack.pop();
      if (top.tag !== tagName) {
        console.log(`MISMATCH: Opened <${top.tag}> at line ${top.line}, closed with </${tagName}> at line ${lineNum}`);
      }
    }
  }
}

console.log(`Unclosed tags remaining in stack: ${stack.length}`);
if (stack.length > 0) {
  stack.forEach(s => console.log(`Unclosed: <${s.tag}> from line ${s.line}`));
}
