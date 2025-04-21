// CI Build Script
// This script temporarily replaces App.js with App.ci.js during the build process
// and then restores the original file afterward

const fs = require('fs');
const path = require('path');

// Backup the original App.js
console.log('Backing up original App.js...');
const appJsPath = path.join(__dirname, 'src', 'App.js');
const appJsBackupPath = path.join(__dirname, 'src', 'App.js.bak');

if (fs.existsSync(appJsPath)) {
  fs.copyFileSync(appJsPath, appJsBackupPath);
  console.log('Original App.js backed up to App.js.bak');
}

// Copy the CI version of App.js
console.log('Copying CI version of App.js...');
const appCiJsPath = path.join(__dirname, 'src', 'App.ci.js');
fs.copyFileSync(appCiJsPath, appJsPath);
console.log('CI version of App.js copied to App.js');

// Run the build
console.log('Running build...');
const { execSync } = require('child_process');
try {
  execSync('react-scripts build', { stdio: 'inherit' });
  console.log('Build completed successfully');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} finally {
  // Restore the original App.js
  console.log('Restoring original App.js...');
  if (fs.existsSync(appJsBackupPath)) {
    fs.copyFileSync(appJsBackupPath, appJsPath);
    fs.unlinkSync(appJsBackupPath);
    console.log('Original App.js restored');
  }
}
