const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to delete
const dirsToDelete = [
  '.next',
  'node_modules/.cache'
];

console.log('Cleaning build artifacts...');

// Delete the directories
dirsToDelete.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  try {
    if (fs.existsSync(fullPath)) {
      console.log(`Removing ${fullPath}...`);
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`Successfully removed ${fullPath}`);
    } else {
      console.log(`Directory ${fullPath} does not exist, skipping`);
    }
  } catch (err) {
    console.error(`Error removing ${fullPath}:`, err);
  }
});

console.log('Running npm install...');
try {
  execSync('npm install', { stdio: 'inherit' });
} catch (err) {
  console.error('Error during npm install:', err);
  process.exit(1);
}

console.log('Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (err) {
  console.error('Error during build:', err);
  process.exit(1);
}

console.log('Build completed successfully!');
