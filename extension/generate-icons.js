/**
 * Simple icon generator script
 * Run with: node generate-icons.js
 * Requires: npm install canvas (or use the HTML generator instead)
 */

// For now, this is a placeholder. Use generate-icons.html in a browser instead.
// Or install canvas: npm install canvas, then uncomment the code below.

console.log('Icon Generator');
console.log('==============');
console.log('');
console.log('Option 1: Open generate-icons.html in your browser and download the icons');
console.log('Option 2: Install canvas library: npm install canvas');
console.log('         Then uncomment the code in this file and run: node generate-icons.js');
console.log('');

// Uncomment below if you have canvas installed:
/*
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];
const iconsDir = path.join(__dirname, 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

function drawIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    
    // Draw rounded rectangle background
    const radius = size * 0.15;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(radius, 0);
    ctx.lineTo(size - radius, 0);
    ctx.quadraticCurveTo(size, 0, size, radius);
    ctx.lineTo(size, size - radius);
    ctx.quadraticCurveTo(size, size, size - radius, size);
    ctx.lineTo(radius, size);
    ctx.quadraticCurveTo(0, size, 0, size - radius);
    ctx.lineTo(0, radius);
    ctx.quadraticCurveTo(0, 0, radius, 0);
    ctx.closePath();
    ctx.fill();
    
    // Draw "AI" text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.4}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    if (size >= 48) {
        ctx.fillText('AI', size / 2, size / 2);
    } else {
        ctx.fillText('A', size / 2, size / 2);
    }
    
    return canvas;
}

sizes.forEach(size => {
    const canvas = drawIcon(size);
    const buffer = canvas.toBuffer('image/png');
    const filepath = path.join(iconsDir, `icon${size}.png`);
    fs.writeFileSync(filepath, buffer);
    console.log(`✓ Created ${filepath}`);
});

console.log('\nAll icons generated successfully!');
*/
