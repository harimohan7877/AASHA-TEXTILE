# Direct Update Guide (Simple)

Is project me aap bina admin panel ke bhi direct update kar sakte ho:

## File
- `direct-updates.js`

## Auto YouTube Channel Sync
`direct-updates.js` me ye value set karein:
```js
youtubeChannelUrl: "https://youtube.com/@aasarextile"
```

Website channel ke latest videos auto fetch karne ki koshish karegi.
Note: Ye API-key free RSS based method hai, network/CORS ki wajah se kabhi-kabhi fallback videos दिख सकते हैं.

## Products add/edit ka simple tarika
1. `direct-updates.js` open karo
2. `products` array me ek object copy-paste karo
3. Values बदलो
4. Save karo
5. Website refresh karo

## Product object format
```js
{
  id: 260001,
  date: "2026-04-26",        // YYYY-MM-DD
  name: "Rayon Premium",
  nameEn: "Rayon Premium",
  variety: "Printed",
  rate: "₹360/KG",
  cut: "Standard",
  panna: '60"',
  info: "Soft fabric",
  image: "https://...jpg"
}
```

## Notes
- `name` mandatory hai.
- `rate` me `/KG` likhna best hai.
- `image` me direct public URL dein.
- Same `name + date` sheet me already ho to duplicate prevent hota hai.

## YouTube video add
`youtube` array me link डालो:
```js
youtube: [
  "https://www.youtube.com/watch?v=VIDEO_ID"
]
```

## Data priority
Website me data order:
1. Google Sheet
2. `direct-updates.js` products
3. Admin/Firebase products

