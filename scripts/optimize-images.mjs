// Creates small copies of the avatar so phones don't download the full-size file.
// Usage:  npm i -D sharp   then   npm run optimize:images
import sharp from 'sharp'
import { existsSync } from 'node:fs'

const input = 'public/images/Portfolioo.webp'
const widths = [120, 240, 360] // must match AVATAR_WIDTHS in ProfileHeader.tsx

if (!existsSync(input)) {
  console.error(`Not found: ${input}`)
  process.exit(1)
}

for (const w of widths) {
  const output = `public/images/Portfolioo-${w}.webp`
  const info = await sharp(input)
    .resize(w, w, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78, effort: 6 })
    .toFile(output)
  console.log(`${output}  ${(info.size / 1024).toFixed(1)} KB`)
}