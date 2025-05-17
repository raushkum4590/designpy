const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to clean
const dirsToClean = ['.next', 'node_modules/.cache'];

console.log('Starting clean rebuild process...');

// Delete the build directories
dirsToClean.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    console.log(`Removing ${dir}...`);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`Successfully removed ${dir}`);
    } catch (err) {
      console.error(`Error removing ${dir}:`, err);
    }
  } else {
    console.log(`${dir} does not exist, skipping`);
  }
});

// Run the build
try {
  // Ensure we have permission by closing any processes that might be locking files
  console.log('Terminating any Node.js processes that might be locking files...');
  try {
    execSync('taskkill /f /im node.exe', { stdio: 'ignore' });
  } catch (e) {
    // It's okay if this fails - it just means no node processes were running
    console.log('No node processes needed to be terminated');
  }
  
  console.log('Waiting a moment for file locks to clear...');
  // Wait a moment for file locks to clear
  setTimeout(() => {
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
    
    console.log('Building the application with no cache...');
    // Use --no-cache flag to ensure a completely fresh build
    execSync('npx next build --no-cache', { stdio: 'inherit' });
    
    console.log('Build completed successfully!');
  }, 2000);
} catch (err) {
  console.error('Error during build process:', err);
  process.exit(1);
}
