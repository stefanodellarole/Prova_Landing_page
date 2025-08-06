#!/usr/bin/env node

/**
 * 🔍 Splinter Pre-Import Check Script
 * Verifica che il progetto sia pronto per l'import in Lovable
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Splinter - Lovable Pre-Import Check\n');

const checks = [];
let passedChecks = 0;
let totalChecks = 0;

function addCheck(name, passed, message) {
  totalChecks++;
  checks.push({ name, passed, message });
  if (passed) passedChecks++;
  
  const status = passed ? '✅' : '❌';
  console.log(`${status} ${name}: ${message}`);
}

// 1. File Structure Check
console.log('📁 Checking file structure...');

const requiredFiles = [
  'App.tsx',
  'main.tsx', 
  'index.html',
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'styles/globals.css',
  'lovable.config.json'
];

requiredFiles.forEach(file => {
  const exists = fs.existsSync(file);
  addCheck(`File: ${file}`, exists, exists ? 'Found' : 'Missing');
});

// 2. Package.json Check
console.log('\n📦 Checking package.json...');

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  addCheck('Package name', !!packageJson.name, packageJson.name || 'Missing');
  addCheck('React version', packageJson.dependencies?.react?.includes('18'), packageJson.dependencies?.react || 'Missing');
  addCheck('TypeScript', !!packageJson.devDependencies?.typescript, packageJson.devDependencies?.typescript || 'Missing');
  addCheck('Vite', !!packageJson.devDependencies?.vite, packageJson.devDependencies?.vite || 'Missing');
  addCheck('Tailwind CSS', !!packageJson.devDependencies?.tailwindcss, packageJson.devDependencies?.tailwindcss || 'Missing');
  
} catch (error) {
  addCheck('Package.json parse', false, 'Invalid JSON');
}

// 3. Components Check
console.log('\n🧩 Checking components...');

const requiredComponents = [
  'components/Header.tsx',
  'components/HeroSection.tsx', 
  'components/FeaturesSection.tsx',
  'components/BenefitsSection.tsx',
  'components/ContactSection.tsx',
  'components/Footer.tsx',
  'components/VideoModal.tsx',
  'components/PrivacyPolicyPage.tsx',
  'components/TermsOfServicePage.tsx',
  'components/GDPRCompliancePage.tsx'
];

requiredComponents.forEach(component => {
  const exists = fs.existsSync(component);
  addCheck(`Component: ${path.basename(component)}`, exists, exists ? 'Found' : 'Missing');
});

// 4. Context Check
console.log('\n🌐 Checking contexts...');

const exists = fs.existsSync('contexts/LanguageContext.tsx');
addCheck('LanguageContext', exists, exists ? 'Found' : 'Missing');

// 5. TypeScript Check
console.log('\n🔍 Checking TypeScript...');

try {
  execSync('npm run type-check', { stdio: 'pipe' });
  addCheck('TypeScript compilation', true, 'No errors');
} catch (error) {
  addCheck('TypeScript compilation', false, 'Errors found - run npm run type-check');
}

// 6. Build Check
console.log('\n🏗️ Checking build...');

try {
  execSync('npm run build', { stdio: 'pipe' });
  addCheck('Build process', true, 'Build successful');
  
  // Check if dist folder was created
  const distExists = fs.existsSync('dist');
  addCheck('Build output', distExists, distExists ? 'dist/ folder created' : 'No build output');
  
} catch (error) {
  addCheck('Build process', false, 'Build failed - run npm run build');
}

// 7. Lint Check
console.log('\n📏 Checking code quality...');

try {
  execSync('npm run lint', { stdio: 'pipe' });
  addCheck('ESLint', true, 'No linting errors');
} catch (error) {
  addCheck('ESLint', false, 'Linting errors found - run npm run lint');
}

// 8. Design System Check
console.log('\n🎨 Checking design system...');

try {
  const globalsCSS = fs.readFileSync('styles/globals.css', 'utf8');
  
  addCheck('Teal color variables', globalsCSS.includes('--primary: 158 65% 45%'), 'Primary teal color defined');
  addCheck('Font imports', globalsCSS.includes('Manrope') && globalsCSS.includes('DM+Sans'), 'Google Fonts imported');
  addCheck('Dark mode support', globalsCSS.includes('.dark'), 'Dark mode CSS defined');
  
} catch (error) {
  addCheck('Globals CSS', false, 'Cannot read globals.css');
}

// 9. Lovable Config Check
console.log('\n⚙️ Checking Lovable configuration...');

try {
  const lovableConfig = JSON.parse(fs.readFileSync('lovable.config.json', 'utf8'));
  
  addCheck('Lovable config name', !!lovableConfig.name, lovableConfig.name || 'Missing');
  addCheck('Framework detection', lovableConfig.framework === 'react', lovableConfig.framework || 'Missing');
  addCheck('Build tool', lovableConfig.buildTool === 'vite', lovableConfig.buildTool || 'Missing');
  addCheck('TypeScript flag', lovableConfig.typescript === true, 'TypeScript enabled');
  
} catch (error) {
  addCheck('Lovable config', false, 'Cannot read lovable.config.json');
}

// 10. Git Check
console.log('\n📝 Checking Git status...');

try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  addCheck('Git status', gitStatus.trim() === '', gitStatus.trim() === '' ? 'Working directory clean' : 'Uncommitted changes');
  
  const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  addCheck('Git branch', currentBranch === 'main' || currentBranch === 'master', `Current branch: ${currentBranch}`);
  
} catch (error) {
  addCheck('Git repository', false, 'Not a git repository or git not available');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('📊 SUMMARY');
console.log('='.repeat(50));

const percentage = Math.round((passedChecks / totalChecks) * 100);
const status = percentage >= 90 ? '🎉 EXCELLENT' : percentage >= 75 ? '👍 GOOD' : percentage >= 50 ? '⚠️ NEEDS WORK' : '❌ CRITICAL ISSUES';

console.log(`${status} - ${passedChecks}/${totalChecks} checks passed (${percentage}%)\n`);

if (percentage >= 90) {
  console.log('🚀 Your project is ready for Lovable import!');
  console.log('📋 Next steps:');
  console.log('   1. Push to GitHub: git push origin main');
  console.log('   2. Go to lovable.dev');
  console.log('   3. Import from GitHub');
  console.log('   4. Follow LOVABLE_IMPORT.md guide');
} else if (percentage >= 75) {
  console.log('👍 Your project is mostly ready, but fix these issues first:');
  checks.filter(check => !check.passed).forEach(check => {
    console.log(`   ❌ ${check.name}: ${check.message}`);
  });
} else {
  console.log('⚠️ Several issues need to be fixed before import:');
  checks.filter(check => !check.passed).forEach(check => {
    console.log(`   ❌ ${check.name}: ${check.message}`);
  });
  console.log('\n💡 Run the following commands to fix common issues:');
  console.log('   npm install');
  console.log('   npm run type-check');
  console.log('   npm run lint --fix');
  console.log('   npm run build');
}

console.log('\n📚 For detailed help, see:');
console.log('   - LOVABLE_IMPORT.md');
console.log('   - README.md');
console.log('   - docs/COMPONENTS.md');

process.exit(percentage >= 75 ? 0 : 1);