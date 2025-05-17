const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories to clean
const dirsToClean = [
  '.next',
  'node_modules',
  '.vercel'
];

console.log('Starting deep cleanup process...');

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
  console.log('Clearing npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  
  console.log('Installing dependencies from scratch...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('Building the application...');
  execSync('npx next build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (err) {
  console.error('Error during build process:', err);
  process.exit(1);
}
