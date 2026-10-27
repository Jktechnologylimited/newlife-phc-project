import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

// Run from the repository root. Preserve the full supplied crest, including its motto.
const original = await readFile(
  "public/images/school/school-logo-original.jpg",
);
const square = (size) =>
  sharp(original)
    .rotate()
    .resize(size, size, {
      fit: "contain",
      background: "#ffffff",
    })
    .ensureAlpha()
    .png()
    .toBuffer();
await writeFile("public/images/school/school-logo.png", await square(512));
await writeFile("src/app/icon.png", await square(256));
await writeFile("src/app/apple-icon.png", await square(180));

// ICO directory followed by PNG-encoded images at standard browser-tab sizes.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(square));
const directory = Buffer.alloc(6 + 16 * images.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(images.length, 4);
let offset = directory.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  directory.writeUInt8(sizes[index], entry);
  directory.writeUInt8(sizes[index], entry + 1);
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(image.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([directory, ...images]));
console.log(
  "Created school web crest, 256px icon, 180px Apple icon and 16/32/48px favicon.",
);
