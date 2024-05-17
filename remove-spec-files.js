const fs = require('fs');
const path = require('path');

function removeSpecFiles(dir) {
    fs.readdirSync(dir).forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            removeSpecFiles(filePath);
        } else if (file.endsWith('.spec.ts')) {
            fs.unlinkSync(filePath);
            console.log(`Deleted: ${filePath}`);
        }
    });
}

const srcDir = path.join(__dirname, 'src');
removeSpecFiles(srcDir);
console.log('Spec files removed successfully.');
