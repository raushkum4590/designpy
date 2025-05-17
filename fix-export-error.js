const fs = require('fs');
const path = require('path');

// Path to the page file that's causing issues
const pagePath = path.join(__dirname, 'app', '(routes)', 'design', '[designId]', 'page.jsx');

console.log(`Checking content of ${pagePath}...`);

// Read the file content
try {
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Check for export statements
  const exportLines = content.match(/export.*useCanvasHook.*/g) || [];
  
  if (exportLines.length > 0) {
    console.log('Found export statements involving useCanvasHook:');
    exportLines.forEach(line => console.log(`- ${line}`));
    
    // Remove the export statements
    content = content.replace(/export.*useCanvasHook.*\n/g, '');
    
    // Write the modified content back
    fs.writeFileSync(pagePath, content, 'utf8');
    console.log('Removed export statements from the file.');
  } else {
    console.log('No explicit export statements for useCanvasHook found in the file.');
  }
  
  // Check for imports
  const importLines = content.match(/import.*useCanvasHook.*/g) || [];
  
  if (importLines.length > 0) {
    console.log('Found import statements involving useCanvasHook:');
    importLines.forEach(line => console.log(`- ${line}`));
  }
  
  console.log('All done! Try building again.');
} catch (err) {
  console.error('Error processing file:', err);
}
