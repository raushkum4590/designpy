const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cleanup directories
const dirsToClean = [
  '.next',
  'node_modules/.cache',
  '.vercel/output'
];

// Delete package-lock.json to force a clean install
const filesToDelete = [
  'package-lock.json'
];

console.log('Starting complete project reset...');

// Delete the directories
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
  }
});

// Delete files
filesToDelete.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`Removing ${file}...`);
    try {
      fs.unlinkSync(fullPath);
      console.log(`Successfully removed ${file}`);
    } catch (err) {
      console.error(`Error removing ${file}:`, err);
    }
  }
});

// Run clean install and build
try {
  console.log('Cleaning npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  
  console.log('Installing dependencies with a clean slate...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Building the application...');
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (err) {
  console.error('Error during build process:', err);
  process.exit(1);
}
