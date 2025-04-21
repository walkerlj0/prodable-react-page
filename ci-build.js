// CI Build Script
// This script temporarily replaces App.js with App.ci.js during the build process
// and then restores the original file afterward

const fs = require('fs');
const path = require('path');

const appJsPath = path.join(__dirname, 'src', 'App.js');
const appCiJsPath = path.join(__dirname, 'src', 'App.ci.js');
const appJsBackupPath = path.join(__dirname, 'src', 'App.js.bak');

console.log('Starting CI build process...');

// Check if App.ci.js exists
if (!fs.existsSync(appCiJsPath)) {
  console.error('Error: App.ci.js not found!');
  process.exit(1);
}

// Backup original App.js
console.log('Backing up original App.js...');
fs.copyFileSync(appJsPath, appJsBackupPath);

// Replace App.js with App.ci.js
console.log('Replacing App.js with CI version...');
fs.copyFileSync(appCiJsPath, appJsPath);

// Run the build command
console.log('Running build command...');
const { execSync } = require('child_process');
try {
  execSync('react-scripts build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
} finally {
  // Restore original App.js
  console.log('Restoring original App.js...');
  fs.copyFileSync(appJsBackupPath, appJsPath);
  fs.unlinkSync(appJsBackupPath);
  console.log('CI build process completed.');
}
