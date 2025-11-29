const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');

if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

const images = [
    { name: 'hero_leather.svg', text: 'Leather Collection', color: '#8B4513' },
    { name: 'hero_neon.svg', text: 'Neon Series', color: '#FF1493' },
    { name: 'product_clear.svg', text: 'Clear Case', color: '#E0E0E0' },
    { name: 'product_leather.svg', text: 'Leather Wallet', color: '#A0522D' },
    { name: 'product_silicone.svg', text: 'Silicone Case', color: '#483D8B' },
    { name: 'product_rugged.svg', text: 'Rugged Armor', color: '#2F4F4F' },
    { name: 'product_abstract.svg', text: 'Abstract Art', color: '#FF6347' },
    { name: 'product_carbon.svg', text: 'Carbon Fiber', color: '#1C1C1C' },
    { name: 'product_eco.svg', text: 'Eco Case', color: '#556B2F' },
    { name: 'product_neon.svg', text: 'Neon Sand', color: '#00FF7F' },
    { name: 'feature_magsafe.svg', text: 'MagSafe Technology', color: '#4682B4' },
    { name: 'cat_leather.svg', text: 'Leather', color: '#8B4513' },
    { name: 'cat_clear.svg', text: 'Clear', color: '#D3D3D3' },
    { name: 'cat_rugged.svg', text: 'Rugged', color: '#2F4F4F' },
    { name: 'parallax_banner.svg', text: 'Upgrade Your Everyday', color: '#333333' }
];

const createSvg = (text, color) => `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${color}"/>
  <text x="50%" y="50%" font-family="Arial" font-size="40" fill="white" text-anchor="middle" dy=".3em">${text}</text>
</svg>
`;

images.forEach(img => {
    fs.writeFileSync(path.join(imagesDir, img.name), createSvg(img.text, img.color));
    console.log(`Generated ${img.name}`);
});
