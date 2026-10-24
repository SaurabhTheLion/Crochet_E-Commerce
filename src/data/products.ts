export const categories = ["Home decor", "Flowers", "Keychains", "Hair decor","Ganpati Collection", "Bags & Essentials", "Wedding Collection"] as const;
export type Category = (typeof categories)[number];

export type Review = {
  id: number;
  name: string;
  rating: number; // 1 to 5
  title: string;
  date: string;
  text: string;
};

export type Product = {
  id: number;
  name: string;
  category: Category;
  price: number;
  image: string; // main photo, also used on tiles and in the cart
  alt: string;
  images: string[]; // gallery shown on the product page
  rating: number; // average out of 5
  ratingCount: number;
  breakdown: number[]; // % of ratings for 5, 4, 3, 2, 1 stars (adds up to 100)
  description: string;
  features: string[];
  reviews: Review[];
};

// Hard-coded sample images from Unsplash (free to use under the Unsplash License).
export const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

// Generates a dummy product photo (a yarn ball on a coloured background) as an SVG.
// Replace these with your real photos later.
const dummyPhoto = (label: string, bg: string, ball: string) => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">` +
    `<rect width="800" height="800" fill="${bg}"/>` +
    `<defs><pattern id="s" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">` +
    `<rect width="22" height="22" fill="${ball}"/><rect width="9" height="22" fill="rgba(0,0,0,0.14)"/></pattern></defs>` +
    `<circle cx="400" cy="380" r="210" fill="url(#s)"/>` +
    `<circle cx="330" cy="300" r="70" fill="rgba(255,255,255,0.35)"/>` +
    `<path d="M560 520c70 90 170 20 130-60s-130-60-100-10 120 50 110-10" stroke="${ball}" stroke-width="14" fill="none" stroke-linecap="round"/>` +
    `<text x="400" y="740" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#17324d" text-anchor="middle">${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const palette: [string, string][] = [
  ["#ffe9a8", "#ff7a6b"],
  ["#d6f5e8", "#5ed3a5"],
  ["#e6dcff", "#b79cff"],
  ["#ffd9d4", "#7cc6ee"],
];

// Main photo plus three dummy photos
const gallery = (main: string, seed: number): string[] => [
  main,
  ...[2, 3, 4].map((n, k) => {
    const [bg, ball] = palette[(seed + k) % palette.length];
    return dummyPhoto(`Dummy photo ${n}`, bg, ball);
  }),
];

// Short sample reviews for products that don't have hand-written ones
const reviewPool: [string, number, string, string][] = [
  ["Priya S.", 5, "Absolutely love it", "The {item} looks even better in person. The stitching is neat and the colours are lovely."],
  ["Rohan M.", 4, "Very nice, good value", "Well made and nicely packed. I would happily order the {item} again."],
  ["Ananya R.", 5, "Perfect gift", "Bought the {item} for a friend and she loved it. Soft, neat and cheerful."],
  ["Neha K.", 5, "Better than the photos", "The colours of the {item} are bright and happy. Arrived quickly and well wrapped."],
  ["Vikram T.", 4, "Good quality", "You can tell this is handmade with care. The {item} feels sturdy and soft."],
  ["Kavya P.", 5, "So pretty", "Got so many compliments on the {item}. Already thinking about my next order."],
];
const reviewDates = ["6 October 2026", "24 September 2026", "11 September 2026"];

const sampleReviews = (item: string, seed: number): Review[] =>
  [0, 1, 2].map((k) => {
    const [name, rating, title, text] = reviewPool[(seed + k * 2) % reviewPool.length];
    return { id: k + 1, name, rating, title, date: reviewDates[k], text: text.replace("{item}", item.toLowerCase()) };
  });

// Builds a product that uses only generated dummy photos
const dummyProduct = (
  id: number,
  name: string,
  category: Category,
  price: number,
  seed: number,
  rating: number,
  ratingCount: number,
  breakdown: number[],
  description: string,
  features: string[],
): Product => {
  const photos = [1, 2, 3, 4].map((n, k) => {
    const [bg, ball] = palette[(seed + k) % palette.length];
    return dummyPhoto(`Dummy photo ${n}`, bg, ball);
  });
  return {
    id, name, category, price,
    image: photos[0],
    alt: `${name} (dummy photo)`,
    images: photos,
    rating, ratingCount, breakdown, description, features,
    reviews: sampleReviews(name, seed),
  };
};

// All product details and reviews below are sample data.
export const products: Product[] = [
  {
    id: 1,
    name: "Sunflower Certain Hanging",
    category: "Home decor",
    price: 1199,
    image: unsplash("1782576417426-4ae01da20440", 600),
    alt: "Crochet sunflower certain hanging",
    images: gallery(unsplash("1782576417426-4ae01da20440", 1000), 0),
    rating: 4.6,
    ratingCount: 128,
    breakdown: [68, 22, 6, 2, 2],
    description:
      "A little sunshine for every corner of your home! ☀️Brighten up your space with our handmade Crochet Sunflower Curtain Hanging, beautifully crafted to bring warmth, charm, and a touch of nature to your home. With its delicate crochet petals and cheerful sunflower design, this lovely piece adds a cozy, aesthetic touch to your curtains, windows, or any special corner.",
    features: [
      "🌻 Handmade crochet sunflower hanging, made with love to add a cute touch to your space.",
      "📏 Length: ___ cm | Width: ___ cm",
      "🧺 Gently clean with a damp cloth and avoid harsh washing to keep it beautiful.",
      "🏡 Perfect for curtains, walls, bedrooms, or gifting to someone special. 💛",
    ],
    reviews: [
      { id: 1, name: "Priya S.", rating: 5, title: "A little sunshine for my home", date: "12 September 2026", text: "The sunflower hanging looks so cute on my curtains! It adds a cheerful touch to my room, and I love the handmade details." },
      { id: 2, name: "Rohan M.", rating: 5, title: "Customised to match my room perfectly", date: "18 October 2026", text: "I ordered the sunflower curtain hanging customised to match my room's vibe, and it looks even more beautiful than I imagined! The colours blend perfectly with my decor, and the handmade sunflower details make my room feel extra special." },
      { id: 3, name: "Ananya R.", rating: 4, title: "A unique gifting idea", date: "3 August 2026", text: "Bought this as a home decor gift idea, and the design is adorable. Perfect for anyone who appreciates cute handmade products." },
      { id: 3, name: "Roshani B.", rating: 4.5, title: "Beautiful handmade deco", date: "17 May 2026", text: "I love floral decor, and this sunflower hanging fits perfectly in my bedroom. Such a lovely way to brighten up a space." }
    ],
  },
  {
    id: 2,
    name: "Tulip",
    category: "Flowers",
    price: 199,
    image: unsplash("1782576417426-4ae01da20440", 600),
    alt: "crochet tulip flower",
    images: gallery(unsplash("1782576417426-4ae01da20440", 1000), 0),
    rating: 4.6,
    ratingCount: 128,
    breakdown: [68, 22, 6, 2, 2],
    description:
      "Bring everlasting spring into your space with our Ever Bloom Crochet Tulip. Carefully handcrafted with soft yarn and delicate petals, this charming tulip adds a touch of elegance and warmth to any room. Unlike fresh flowers, it stays beautiful without watering or maintenance.",
    features: [
      "Carefully crocheted with soft yarn for a unique and charming finish.",
      "📏 Length: ___ cm | Width: ___ cm",
      "Made with soft crochet yarn and a coordinating stem.",
      "A thoughtful choice for birthdays, anniversaries, Valentine's Day, and home décor.",
      "Gently dust with a soft brush. Keep dry and away from excessive sunlight and moisture."
    ],
    reviews: [
      { id: 1, name: "Ishita M.",rating: 5,title: "A sweet and thoughtful gift",date: "26 September 2026",text: "I ordered this crochet tulip as a gift, and it is such a cute alternative to fresh flowers. Its handmade charm makes it feel extra special." },
      { id: 2, name: "Kavya R.", rating: 5, title: "Even prettier than expected", date: "9 March 2026", text: "I absolutely love the handmade petals and neat finishing. It looks adorable in my room, and I love that I can enjoy it without worrying about it wilting." },
      { id: 3, name: "Neha J.", rating: 5, title: "Perfect for my bedside décor", date: "11 February 2026", text: "I ordered this tulip for my bedside décor in a customised colour to match my room, and it turned out so pretty! The colour looks perfect, and the handmade flower adds such a beautiful touch to my space."}
    ],
  },
  {
    id: 3,
    name: "Sunshine Crochet Sunflower",
    category: "Flowers",
    price: 299,
    image: unsplash("1782576417426-4ae01da20440", 600),
    alt: "Crochet sunflower",
    images: gallery(unsplash("1782576417426-4ae01da20440", 1000), 0),
    rating: 4.6,
    ratingCount: 128,
    breakdown: [68, 22, 6, 2, 2],
    description:
      "A little sunshine that never fades. 🌻 This cheerful sunflower adds a warm pop of color to your space, making it perfect for gifting or brightening up your favorite corner.",
    features: [
      "🌻 Handmade crochet sunflower hanging, made with love to add a cute touch to your space.",
      "📏 Length: ___ cm | Width: ___ cm",
      "🧺 Gently clean with a damp cloth and avoid harsh washing to keep it beautiful.",
      "🏡 Perfect for curtains, walls, bedrooms, or gifting to someone special. 💛",
    ],
    reviews: [
      {id: 1,name: "Sayali P.",rating: 5,title: "A little sunflower that brightens my room",date: "12 September 2026",text: "The sunflower is so cute and beautifully made. I placed it near my study table, and it adds such a cheerful touch to my room. I love that it won't wilt like real flowers."},
      {id: 2,name: "Rohan M.",rating: 4.5,title: "A lovely handmade gift",date: "7 August 2026",text: "Bought this for my mother's birthday, and she really liked it. The yellow petals look lovely, and the handmade design feels special. Would love to see more sizes available."},
      {id: 3,name: "Shradha T.",rating: 5,title: "A sunflower that stays beautiful",date: " 5 Jun 2026",text: "I love sunflowers, so this crochet version was perfect for me. The petals and centre give it a cheerful look, and it looks adorable in my bedroom. Great for people who love flowers."},
      {id: 4,name: "Neha G",rating: 4,title: "Simple and thoughtful gifting idea",date: "19 January 2026",text: "Got this as a small gift for my friend. It is cute, lightweight, and different from the usual gifts. The handmade touch makes it feel more personal."}
    ],
  },
   {
    id: 4,
    name: "Rose",
    category: "Flowers",
    price: 199,
    image: unsplash("1782576417426-4ae01da20440", 600),
    alt: "Handmade red crochet rose with delicate yarn petals and green stem",
    images: gallery(unsplash("1782576417426-4ae01da20440", 1000), 0),
    rating: 4.6,
    ratingCount: 128,
    breakdown: [68, 22, 6, 2, 2],
    description:
      "Express your love with our Everlasting Crochet Rose, beautifully handmade to capture the timeless charm of a classic rose. Its delicate layered petals make it a meaningful gift for someone special. Unlike fresh roses, this handcrafted bloom can be treasured as a lasting reminder of love, care, and beautiful memories.",
    features: [
      "Not just a rose, but a handmade memory that lasts. Make someone's day extra special with a flower crafted to be treasured.",
      "📏 Length: ___ cm | Width: ___ cm",
      "Gently dust with a soft brush. Keep dry and away from excessive sunlight and moisture.",
      "🏡 Perfect for curtains, walls, bedrooms, or gifting to someone special. 💛",
    ],
    reviews: [
      { id: 1, name: "Akash B.", rating: 5, title: "A beautiful surprise for Valentine's Day 🌹", date: "12 February 2026", text: "Ordered this crochet rose as a Valentine's surprise, and it was such a lovely choice. The detailing is beautiful, and it feels much more special than a regular flower because it lasts. Definitely a thoughtful gift!" },
      { id: 2, name: "Rohan M.", rating: 4, title: "Beautiful desk decoration", date: "13 August 2026", text: "I bought this rose to decorate my work desk, and it looks adorable. The colour adds a lovely touch to my space, and I don't have to worry about watering it." },
      { id: 3, name: "Nikhil S.", rating: 5, title: "Perfect for a romantic surprise 💕", date: "7 February 2026", text: "A great option for anyone looking for a unique Valentine's gift. It's thoughtful, cute, and lasts much longer than a fresh rose. Perfect for making a simple surprise feel special" },
    ],
  },
  {
    id: 5,
    name: "Lily Flower",
    category: "Flowers",
    price: 399,
    image: unsplash("1782576417426-4ae01da20440", 600),
    alt: "Crochet lily flower with graceful curved petals, yellow center, and green stem.",
    images: gallery(unsplash("1782576417426-4ae01da20440", 1000), 0),
    rating: 4.6,
    ratingCount: 128,
    breakdown: [68, 22, 6, 2, 2],
    description:
      "Inspired by the natural elegance of lilies, this Crochet Lily Flower captures their graceful, curved petals and delicate trumpet-like shape in a beautiful yarn creation. Lilies are admired for their elegance, purity, and timeless charm, making them a meaningful choice for both gifting and decoration. With its carefully shaped petals and soft, textured finish, this flower brings the beauty of nature into your home without the worry of wilting. Perfect for brightening your favorite space or making someone feel special.",
    features: [
      "Features graceful, curved petals inspired by the distinctive shape of a real lily flower.",
      "Length: ___ cm | Width: ___ cm",
      "Ideal for office desks, bedside tables, living rooms, bookshelves, and decorative vases.",
      "No watering required. Gently dust with a soft brush and keep away from moisture and excessive sunlight.",
    ],
    reviews: [
      { id: 1, name: "Sneha P.", rating: 5, title: "Elegant and easy to maintain", date: "2 October 2026", text: "The lily looks delicate and pretty on my bedside table. I like that it adds a floral touch without needing water or regular flower replacement. A lovely choice for bedrooms, desks, and small corners." },
      { id: 2, name: "Smita R.", rating: 4.5, title: "A unique and thoughtful gift", date: "16 July 2026", text: "Bought this lily as a gift for my colleague, and it was a lovely alternative to the usual gift options. The handmade design looks beautiful. Would love to see more colour combinations." }
    ],
  },
  {
    id: 6,
    name: "Open Tulip Flower",
    category: "Flowers",
    price: 399,
    image: unsplash("1782576417426-4ae01da20440", 600),
    alt: "Crochet sunflower",
    images: gallery(unsplash("1782576417426-4ae01da20440", 1000), 0),
    rating: 4.6,
    ratingCount: 128,
    breakdown: [68, 22, 6, 2, 2],
    description:
      "Inspired by the beauty of a real tulip in full bloom, the Open Tulip Flower showcases softly spread petals that open outward to reveal its delicate inner shape. Unlike a closed tulip bud, an open tulip has a wider, cup-like bloom that creates a fresh, cheerful, and eye-catching appearance. This crochet version captures that natural beauty with textured yarn petals and a graceful green stem, bringing the charm of a spring garden into your home. ",
    features: [
      "Designed to resemble a real tulip in full bloom, with outward-opening petals and a naturally rounded shape.",
      " Length: ___ cm | Width: ___ cm",
      " Gently remove dust with a soft cloth and keep in a clean, dry place to maintain its beauty.",
      " Perfect for office desks, bedside tables, bookshelves, window-side décor, or a vase of colorful flowers.",
    ],
    reviews: [
      { id: 1, name: "Priya K.", rating: 5, title: "Looks adorable in a little vas", date: "6 September 2026", text: "The open tulip design is so pretty! I put it in a small vase on my coffee table, and it gives the room a soft, cosy feel. Such a lovely alternative to fresh flowers" },
      { id: 2, name: "Tanamy S.", rating: 4.5, title: "A lovely gift for a flower lover", date: "23 July 2026", text: "Bought this for a friend who loves tulips, and the open petals make it look really charming. It's a thoughtful little gift that doesn't need any special care." },
      { id: 3, name: "Mitali S.", rating: 4, title: "", date: "3 August 2026", text: "The tulip looks lovely beside my books and candles. I like how it adds colour without making the space look crowded. I'm thinking of getting a few more in different colours." }
    ],
  },
  {
    id: 7,
    name: "Daisy Flower",
    category: "Flowers",
    price: 199,
    image: unsplash("1779433755935-991480f06b98", 600),
    alt: "Crochet Daisy Flowers",
    images: gallery(unsplash("1779433755935-991480f06b98", 1000), 1),
    rating: 4.8,
    ratingCount: 86,
    breakdown: [80, 14, 4, 1, 1],
    description:
      "Inspired by the cheerful beauty of a real daisy, this Crochet Daisy Flower features delicate white petals surrounding a bright yellow center. Known for symbolizing happiness, innocence, and new beginnings, daisies bring a fresh and joyful touch to any space.",
    features: [
      "White petals and a sunny yellow center inspired by the natural beauty of a real daisy.",
      " Length: ___ cm | Width: ___ cm",
      "Perfect for office desks, bedside tables, bookshelves, and decorative vases",
      "Gently remove dust with a soft cloth and keep in a clean, dry place."
    ],
    reviews: [
      { id: 1, name: "Shweta D.", rating: 4.5, title: "Lovely for a just-because gift", date: "6 October 2026", text: "ometimes the smallest gifts make people happiest. This daisy is simple, pretty, and perfect for surprising someone without a special occasion. The handmade touch makes it extra sweet." },
      { id: 2, name: "Priya Y.", rating: 5, title: "Simple decor with a handmade feel", date: "20 September 2026", text: "I love how this flower looks on my bedside table. It suits my minimal decor and adds a soft, cheerful touch. I'd definitely consider getting a bunch of these together." },
      { id: 3, name: "Om P.", rating: 5, title: "A sweet handmade keepsake", date: "30 July 2026", text: "I gifted this to my cousin, who loves handmade things. She really liked the daisy design. It's a cute keepsake and a nice alternative to flowers that fade after a few days." }
    ],
  },
  {
    id: 8,
    name: "Divine Sonchafa Flower",
    category: "Flowers",
    price:  119,
    image: unsplash("1779433755935-991480f06b98", 600),
    alt: "Handmade yellow crochet Sonchafa flower for Swami Samarth pooja.",
    images: gallery(unsplash("1779433755935-991480f06b98", 1000), 1),
    rating: 4.8,
    ratingCount: 86,
    breakdown: [80, 14, 4, 1, 1],
    description:
      "Inspired by the graceful beauty of Sonchafa, this handmade crochet flower brings a special touch of devotion to your pooja rituals.A lovely choice for Swami Samarth worship, it adds a floral accent to your home mandir and devotional arrangements.Bring home Sonchafa Shraddha and add a lasting floral touch to your daily devotion.",
    features: [
      "Ideal for Swami Samarth pooja and daily worship.",
      "Inspired by the graceful shape of the traditional flower.",
      "Enjoy it for repeated pooja use without worrying about wilting.",
      "Gently remove dust and spot-clean with a damp cloth if needed."
    ],
    reviews: [
      { id: 1, name: "Rekha Y.", rating: 5, title: "Perfect for my Swami Samarth pooja 🙏", date: "18 October 2026", text: "I bought this Sonchafa flower for my Shri Swami Samarth pooja, and it looks beautiful near Swamiji's photo. 🌼 It adds a lovely traditional touch to my mandir, and I love that I can reuse it for future pooja occasions. श्री स्वामी समर्थ 🙏" },
      { id: 2, name: "Lata S.", rating: 5, title: "A thoughtful gift for Aai", date: "11 September 2026", text: "I was looking for a small traditional gift for my mother, and this Sonchafa flower caught my attention. It is a sweet idea for someone who loves flowers, pooja decorations, and handmade creations." },
      { id: 3, name: "Shruti R.", rating: 4, title: "Lovely for festive hair styling", date: "2 September 2026", text: "I can imagine this flower looking beautiful on a hair bun for Ganesh festival, haldi-kumkum, or a family function. It has a traditional charm and is a lovely option for reusable floral styling." },
    ],
  },
  {
    id: 9,
    name: "EverBloom Hibiscus Flower",
    category: "Flowers",
    price:  149,
    image: unsplash("1779433755935-991480f06b98", 600),
    alt: "Handmade crochet hibiscus flower for Ganpati pooja.",
    images: gallery(unsplash("1779433755935-991480f06b98", 1000), 1),
    rating: 4.8,
    ratingCount: 86,
    breakdown: [80, 14, 4, 1, 1],
    description:
      "Add a beautiful handmade touch to your Ganpati pooja with our Crochet Hibiscus Flower. 🌺Inspired by the vibrant hibiscus, it is perfect for Ganpati offerings, your home mandir, and festive decorations.Unlike fresh flowers, it won’t wilt, making it a reusable choice for your devotional rituals.Bring home this everlasting floral charm and order your favourite colour today!",
    features: [
      "Ideal for Ganesh pooja and devotional decorations.",
      "Suitable for a home mandir, pooja thali, and festive décor",
      "Choose your favourite colour or request a custom combination to match your pooja décor.",
      "Gently remove dust and spot-clean with a damp cloth if needed. Avoid soaking or wringing, and air-dry completely."
    ],
    reviews: [
      { id: 1, name: "Rohit S.", rating: 5, title: "Perfect for festive decoration", date: "25 September 2026", text: "I wanted something different for my festive decorations, and this hibiscus was a lovely choice. It can be styled in a vase or used as part of a decorative arrangement. I'd love to see more colours!" },
      { id: 2, name: "Nishigandaha D.", rating: 4.5, title: "A beautiful flower for Ganpati Bappa 🙏", date: "3 September 2026", text: "I bought this crochet hibiscus especially for my Ganpati Bappa decoration, and it looks so beautiful near Bappa's murti. 🌺 Hibiscus is a traditional favourite for Ganpati pooja, and I love having this handmade flower to reuse for future festive decorations. Ganpati Bappa Morya! ❤️" },
      { id: 3, name: "Sandeep R.", rating: 4.5, title: "A lovely addition to my flower collection ", date: "23 August 2026", text: "I already have a few crochet flowers, and this hibiscus adds something different to my collection. Its bold flower shape looks beautiful on its own or paired with other handmade blooms." },
    ],
  },
  {
    id: 10,
    name: "Gajra",
    category: "Hair decor",
    price: 499,
    image: unsplash("1693387369575-df25ef8424e7", 600),
    alt: "Crochet flower gajra",
    images: gallery(unsplash("1693387369575-df25ef8424e7", 1000), 2),
    rating: 4.7,
    ratingCount: 203,
    breakdown: [74, 17, 6, 2, 1],
    description:
      "Add a touch of traditional elegance to your hairstyle with our Crochet Flower Gajra. Inspired by classic Indian floral adornments, this beautiful hair accessory is perfect for weddings, festivals, and special occasions. Pair it with your favorite ethnic outfit for a graceful and charming look.",
    features: [
      "Inspired by classic Indian gajras, adding a graceful touch to traditional and festive hairstyles.",
      "Designed to complement buns, braids, and other hairstyles, depending on the attachment style.",
      "Available in selected flower colors and designs to complement your outfit, subject to availability."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "1 October 2026", text: "" },
      { id: 2, name: "", rating: 5, title: "", date: "14 September 2026", text: "" },
      { id: 3, name: "", rating: 4, title: "", date: "22 August 2026", text: "" },
    ],
  },
  {
    id: 11,
    name: "Butterfly Hair Clip",
    category: "Hair decor",
    price: 299,
    image: unsplash("1693387347071-d3bf494cbe0e", 600),
    alt: "Colorful crochet butterfly hair clip ",
    images: gallery(unsplash("1782576417426-4ae01da20440", 1000), 0),
    rating: 4.5,
    ratingCount: 64,
    breakdown: [60, 26, 9, 3, 2],
    description:
      "Add a cute and colorful touch to your hairstyle with our Crochet Butterfly Hair Clip. Inspired by the delicate beauty of butterflies, this charming accessory features beautifully crocheted wings that bring a playful and elegant look to your hair. ",
    features: [
      "Choose your favorite colors or request a personalized color combination to match your outfit.",
      "Geat for securing small sections of hair or adding a decorative touch to ponytails and hairstyles, depending on the clip design.",
      "Easy to style with everyday outfits, dresses, and ethnic wear"
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" }
    ],
  },
  {
    id: 12,
    name: "Sunflower Hair Bow",
    category: "Hair decor",
    price: 149,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Crochet sunflower hair bow",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Featuring a lovely sunflower-inspired design with bright petals and a cute bow, this charming accessory brings a little sunshine to your everyday look.",
    features: [
      "Bright sunflower details paired with a pretty bow for a cute and eye-catching look.",
      "A sweet little gift for birthdays, friendship gifts, return gifts, or anyone who loves flowers.",
      "Choose your preferred shades or request a personalized color combination to match your outfit.",
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" }
    ],
  },
  {
    id: 13,
    name: "Daisy Flower Hair Bow",
    category: "Hair decor",
    price: 149,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Crochet Daisy hair bow",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Crochet Daisy Flower Hair Bow. Inspired by the beauty of daisies, this cute accessory features a charming floral design that brings a soft, playful look to your style.",
    features: [
      "A cute statement accessory that adds personality to simple ponytails, braids, and half-up hairstyles.",
      "Choose your preferred flower and bow colors to match your style.",
      "Enjoy the look of a daisy accessory without worrying about fresh petals wilting."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" }
    ],
  },
  {
    id: 14,
    name: "Rose Hair Bow",
    category: "Hair decor",
    price: 149,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Crochet rose bow hair accessory featuring a decorative yarn rose paired with a stylish bow.",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      " Featuring a beautiful rose-inspired design paired with a stylish bow, this accessory brings a romantic and elegant touch to any look. ",
    features: [
      " A charming rose design that adds a romantic floral touch to your hairstyle.",
      "Choose your preferred rose and bow colors to match your outfit or personal style.",
      "njoy a rose-inspired accessory without worrying about fresh petals wilting.",
      "Gently remove dust and store in a clean, dry place to help maintain its shape."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" }
    ],
  },
  {
    id: 15,
    name: "Tulip Twist Hair Bow",
    category: "Hair decor",
    price: 199,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Crochet rose bow hair accessory featuring a decorative yarn rose paired with a stylish bow.",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      " Inspired by the natural beauty of tulips, the Tulip Twist Hair Bow captures the flower’s signature cup-shaped bloom and smooth, gently curved petals. Just like real tulips that symbolize love, happiness, and fresh beginnings, this charming hair accessory adds a soft, cheerful touch to your style",
    features: [
      "Designed around the tulip’s iconic cup-shaped bloom and curved petals.",
      "Choose tulip and bow colors inspired by your favorite tulip shades, from soft pink and white to vibrant red, yellow, or purple.",
      "Gently remove dust and store in a clean, dry place to help maintain its shape."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" }
    ],
  },
  {
    id: 16,
    name: "Lily of the Valley Crochet Hair Bow",
    category: "Hair decor",
    price: 149,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Whispering Bells – Lily of the Valley Crochet Hair Bow",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      " Bring the beauty of a spring garden to your hairstyle with our Whispering Bells Crochet Hair Bow. Inspired by the graceful Lily of the Valley flower, this handmade accessory features delicate little bell-shaped blossoms and charming green details. Its romantic, fairy-inspired design adds a touch of elegance to everyday hairstyles, special occasions and picture-perfect moments",
    features: [
      "Customise the flower, bow and leaf colours to match your style.",
      "Beautiful with ponytails, half-up hairstyles, braids and buns.",
      "Gently spot-clean with a damp cloth, reshape the crochet flowers by hand and air-dry; avoid harsh rubbing and direct heat."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 17,
    name: "Love Knot Heart Keychain ❤️",
    category: "Keychains",
    price: 49,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Whispering Bells – Lily of the Valley Crochet Hair Bow",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      " Carry a little love wherever you go with our Heartfelt Hugs Crochet Heart Keychain. Carefully handmade with soft yarn, this adorable heart-shaped accessory is a charming way to personalise your keys, handbags, backpacks or purses. Its timeless heart design makes it a thoughtful little gift for someone special—or a lovely treat for yourself.",
    features: [
      "Easy to attach to keys, bags and backpacks.",
      "Choose your favourite shades or matching colour combinations.",
      "Gently spot-clean with a damp cloth, reshape by hand and air-dry; avoid soaking or harsh rubbing"
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 18,
    name: "Two-Tone Crochet Rose Keychain 🌹",
    category: "Keychains",
    price: 149,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Whispering Bells – Lily of the Valley Crochet Hair Bow",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      " rose keychain featuring a beautiful two-tone design, with one shade delicately layered inside another for a distinctive floral finish. A charming accessory for keys, handbags and backpacks, or a thoughtful gift for someone special.",
    features: [
      "Prfect for gifting on birthdays, anniversaries and special occasions",
      "Customisable inner and outer colour combinations",
      "Gently spot-clean with a damp cloth and air-dry to maintain its shape."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 19,
    name: "Sweetheart Bow Crochet Keychain 🎀",
    category: "Keychains",
    price: 149,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Whispering Bells – Lily of the Valley Crochet Hair Bow",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Add a touch of sweetness to your everyday essentials with our Sweetheart Bow Crochet Keychain. Featuring a charming heart-shaped design paired with a delicate crochet bow, this handmade accessory blends playful elegance with the beauty of handcrafted details.",
    features: [
      "A sweet gift for birthdays, anniversaries, Valentine's Day and friendship celebrations.",
      "Choose your preferred shades and colour combinations.",
      "A lovely combination of a crochet heart and decorative bow.",
      "Gently spot-clean with a damp cloth and air-dry naturally to maintain its shape"
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 20,
    name: "Cricket Craze – Custom IPL Player Keychain",
    category: "Keychains",
    price: 199,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Wsingle-colour crochet rose keychain",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Show your cricket passion wherever you go with our Cricket Craze IPL Player Keychain.Inspired by your favourite cricket stars.Celebrate your love for the game with popular player-inspired designs featuring Rohit Sharma, MS Dhoni and Virat Kohli. ",
    features: [
      "A personalised cricket-themed accessory to show off your team spirit.",
      "A memorable surprise for birthdays, match-day celebrations and fellow cricket lovers.",
      "Collect keychains of your favourite cricket stars or gift them to your cricket squad.",
      "Gently clean with a soft, slightly damp cloth and air-dry naturally."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 21,
    name: "Sunny Bloom – Sunflower Keychain 🌻",
    category: "Keychains",
    price: 149,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "sunflower keychain featuring bright yellow petals, a textured flower centre and a metal keyring.",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Bring a little sunshine to your everyday essentials with our Sunny Bloom Crochet Sunflower Keychain. Inspired by the cheerful beauty of sunflowers, this handmade floral charm features bright petals and a lovely centre, creating a delightful accessory for your keys, handbags and backpacks.",
    features: [
      "A cheerful sunflower charm to brighten your everyday essentials.",
      "A lightweight charm for keys, handbags, purses and backpacks.",
      "Pair it with other crochet flower accessories for a coordinated gift.",
      "Request personalised colours for a gift or matching accessory set."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 22,
    name: "Divine Feather – Morpankh Keychain 🦚",
    category: "Keychains",
    price: 149,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "crochet Morpankh peacock feather keychain in blue and green yarn with a metal keyring.",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      " Inspired by the graceful peacock feather, this handcrafted accessory features beautiful feather-inspired details in captivating shades of blue and green. Perfect for adorning your keys, handbags and backpacks, it makes a meaningful keepsake for those who appreciate Indian culture, devotional art and unique handmade creations",
    features: [
      "A beautiful design inspired by the iconic peacock feather.",
      "Blends Indian cultural inspiration with everyday styling.",
      "Ideal for Krishna devotees, festive gifting, birthdays and special occasions.",
      "equest your preferred colours or combinations.",
      "Gently spot-clean with a damp cloth and air-dry naturally."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 23,
    name: "Tiny Treasures – Toy Keychain 🧸",
    category: "Keychains",
    price: 199,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Crochet toy keychain",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      " Make your everyday accessories extra adorable with our Tiny Treasures Crochet Toy Keychain.Lovingly handcrafted with yarn, this miniature crochet charm brings together playful design and handmade creativity in one delightful accessory. Perfect for decorating your keys, handbags, backpacks or purses, it also makes a sweet little gift for friends, family and anyone who loves cute collectibles",
    features: [
      "Collect different toy designs to match your personality.",
      "Choose your favourite colours for a personalised look.",
      "Ideal for anyone who loves miniature toys and handmade accessories.",
      "Gently spot-clean with a damp cloth and air-dry naturally. Avoid pulling the attached details."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 24,
    name: "Lily of the Valley Crochet Hair Bow",
    category: "Bags & Essentials",
    price: 149,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Whispering Bells – Lily of the Valley Crochet Hair Bow",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      " Bring the beauty of a spring garden to your hairstyle with our Whispering Bells Crochet Hair Bow. Inspired by the graceful Lily of the Valley flower, this handmade accessory features delicate little bell-shaped blossoms and charming green details. Its romantic, fairy-inspired design adds a touch of elegance to everyday hairstyles, special occasions and picture-perfect moments",
    features: [
      "Customise the flower, bow and leaf colours to match your style.",
      "Beautiful with ponytails, half-up hairstyles, braids and buns.",
      "Gently spot-clean with a damp cloth, reshape the crochet flowers by hand and air-dry; avoid harsh rubbing and direct heat."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
  {
    id: 25,
    name: "Tiny Charm – Crochet Potli Pouch",
    category: "Bags & Essentials",
    price: 199,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Cute handmade crochet potli pouch for small everyday essentials.",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Add a little handmade charm to your everyday essentials with our adorable crochet potli pouch.Perfect for little girls and women to carry small items. Its cute potli-style design makes it a lovely accessory for outings, parties, and everyday use.Choose your favourite colours to create a pouch that matches your personal style.",
    features: [
      "A charming mini pouch with a traditional-inspired look.",
      "Holds small essentials like keys, earbuds, lip balm, and lipstick.",
      "Each pouch has its own handcrafted charm",
      "Easy to carry in a handbag or hold on its own.",
      "Gently spot-clean with mild soap and a damp cloth; air-dry completely. Avoid soaking or wringing."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 26,
    name: "Pocketful of Love – Custom Phone Bag",
    category: "Bags & Essentials",
    price: 299,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Custom Crochet Phone Bag for Everyday Use",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Keep your phone close and your hands free with our handmade crochet phone bag. ❤️Perfect for moms who love keeping their phones safe, handy, and easy to access throughout the day.Designed for everyday comfort, whether you're shopping, travelling, or spending time with family.",
    features: [
      "Customise colours to complement your wardrobe.",
      "Carry your phone comfortably wherever you go.",
      "Gently spot-clean with a damp cloth and mild soap; air-dry flat and avoid soaking or wringing."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 27,
    name: "Rose Royale – Pearl-Embellished Rose Bag",
    category: "Bags & Essentials",
    price: 3999,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Pearl-Embellished Crochet Rose Bag",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Introducing Rosé Royale, a premium handmade crochet bag adorned with beautiful 3D rose petals on both sides and elegant pearl embellishments. 🌹Designed to blend floral beauty with timeless elegance, it adds a luxurious touch to any outfit.Perfect for birthdays, anniversaries, weddings, date nights and other special occasions.A unique and thoughtful gift for someone who loves beautiful, handcrafted accessories.",
    features: [
     "Beautifully crafted rose petals on both sides create a rich, dimensional look from every angle.",
     "Delicate pearl accents add a graceful shimmer and elevate the bag's romantic, premium appearance.",
     "A thoughtful choice for birthdays, anniversaries, Valentine's Day, weddings and special celebrations.",
     "Request your preferred shades to complement an outfit, match an occasion or create a personalised gift. ",
     "Gently spot-clean with a soft cloth; avoid soaking or harsh rubbing to protect the rose petals and pearl embellishments."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
   {
    id: 28,
    name: "Royal Violet Pearl Mala",
    category: "Ganpati Collection",
    price: 499,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Handmade purple and white crochet Ganpati mala",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Adorn your beloved Bappa with the elegance of our Royal Violet Pearl Crochet Mala. Beautifully handcrafted with rich purple and white crochet flowers, pearl detailing, and golden accents, this mala creates a graceful traditional look. Its statement floral pendant adds a distinctive finishing touch. Perfect for Ganesh Chaturthi and festive mandir decoration.",
    features: [
      "Handcrafted purple and white crochet flowers.",  
      "Elegant pearl and golden bead detailing.",
      "Statement purple floral pendant with a long decorative drop.",
      "Traditional design for Ganpati idols and festive occasions.",
      "Custom colour combinations available on request."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
  {
    id: 29,
    name: "Pink Rose Pearl Ganpati Mala",
    category: "Ganpati Collection",
    price: 499,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Peach crochet rose Ganpati mala",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Celebrate devotion with our Pink Rose Elegance Crochet Ganpati Mala, designed with charming pink crochet roses and delicate pearl strings. Green crochet leaves add a natural floral touch, while the pearl detailing enhances its traditional appeal. This handmade mala brings colour and elegance to your Ganpati decoration. Ideal for home mandirs and festive celebrations.",
    features: [
      "Handcrafted peach-toned crochet roses with delicate green leaves.",
      "Elegant pearl detailing for a graceful, festive finish.",
      "Soft floral design that enhances Bappa’s traditional shringar.",
      "Beautifully arranged mala for Ganpati idols and festive pooja décor.",
      "Custom flower colours and pearl combinations available on request.",
      "Gently spot-clean with a damp cloth and mild soap; air-dry flat and avoid soaking or wringing."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
  {
    id: 30,
    name: "Peach Blossom Pearl Ganpati Mala",
    category: "Ganpati Collection",
    price: 499,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Crochet toy keychain",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "Add a soft and elegant floral accent to your Bappa's shringar with our Peach Blossom Pearl Crochet Mala. Featuring peach-toned crochet roses, rich green leaves, and beautiful pearl detailing, this design blends warmth with traditional charm. Its graceful arrangement makes it a lovely choice for festive Ganpati decoration.",
    features: [
      "Enjoy a flower-inspired design that won't wilt like fresh flowers, so you can preserve your varmala as a keepsake of your special day.",
      "Request a suitable garland length based on the bride's and groom's heights and preferred fit, for comfortable varmala exchange photographs and ceremonies.",
      "Custom designs available for Haldi, engagement, wedding and other special ceremonies, with colours and floral styles tailored to your occasion.",
      "Personalise the colour palette, flower combinations and design details to create a garland that feels truly yours."
    ],
    reviews: [
      { id: 1, name: "", rating: 5, title: "", date: "12 September 2026", text: "" },
      { id: 2, name: "", rating: 4, title: "", date: "28 August 2026", text: "" },
      { id: 3, name: "", rating: 5, title: "", date: "3 August 2026", text: "" },
    ],
  },
  {
    id: 31,
    name: "Forever in Bloom – Custom Wedding Varmala",
    category: "Wedding Collection",
    price: 4999,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Crochet toy keychain",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      " Every couple has a different story, and your varmala should be just as special. We customise the colours, floral details and overall design to complement the bride’s outfit.Unlike fresh flower garlands, our crochet varmalas are designed to retain their beauty without wilting, making them a lasting keepsake of your wedding memories. They are also washable with gentle care and can be made with adjustable lengths to suit the height and comfort of both the bride and groom.",
    features: [
      "Enjoy a flower-inspired design that won't wilt like fresh flowers, so you can preserve your varmala as a keepsake of your special day.",
      "Request a suitable garland length based on the bride's and groom's heights and preferred fit, for comfortable varmala exchange photographs and ceremonies.",
      "Custom designs available for Haldi, engagement, wedding and other special ceremonies, with colours and floral styles tailored to your occasion.",
      "Personalise the colour palette, flower combinations and design details to create a garland that feels truly yours."
    ],
    reviews: [
      { id: 1, name: "Nitin D.", rating: 5, title: "A beautiful memory of our special day ❤️", date: "18 October 2026", text: "We wanted something unique for our wedding, and our custom crochet varmala was such a lovely choice. The colours matched our outfits beautifully, and we can keep it as a memory of our special day for years." },
      { id: 2, name: "Roshani C.", rating: 4.5, title: "Exactly how we imagined our varmala", date: "5 October 2026", text: "I loved that we could customise the colours to match our wedding theme. The handmade look made our varmala feel extra special, and it is something we can preserve long after the wedding." },
      { id: 3, name: "Priti B.", rating: 5, title: "A memorable wedding gift                               ", date: "29 August 2026", text: "e gifted a customised crochet varmala to a couple getting married, and it was such a thoughtful idea. Unlike fresh garlands, it can be kept as a reminder of their wedding day." },
    ],
  },
  // dummyProduct(6, "Crochet sunflower bouquet", "Flowers", 599, 0, 4.7, 94, [72, 20, 5, 2, 1],
  //   "A bunch of cheerful crochet sunflowers that never wilt. Lovely on a desk, a shelf or as a gift.",
  //   ["Set of 5 stems, about 35 cm tall", "Wire stems hold their shape", "No water or sunlight needed", "Made to order, so petals can vary slightly"]),
  // dummyProduct(7, "Tulip stem set", "Flowers", 449, 1, 4.6, 58, [66, 24, 7, 2, 1],
  //   "Soft crochet tulips in spring colours. Arrange them in a vase and enjoy flowers all year round.",
  //   ["Set of 6 tulips in mixed colours", "About 30 cm tall with flexible stems", "Soft cotton yarn", "Great as a gift or table decoration"]),
  // dummyProduct(8, "Crochet crop top", "Clothes", 1199, 2, 4.4, 41, [52, 28, 12, 5, 3],
  //   "A light, breathable crochet top for sunny days. Pair it with high-waist jeans or a long skirt.",
  //   ["Soft cotton yarn, comfortable on skin", "Available in S, M and L", "Hand wash and dry flat", "Made to order in your chosen colour"]),
  // dummyProduct(9, "Granny square cardigan", "Clothes", 2499, 3, 4.8, 77, [78, 16, 4, 1, 1],
  //   "A colourful cardigan made from patchwork granny squares. Cosy on chilly evenings and a talking point everywhere.",
  //   ["Hand-crocheted granny square patchwork", "Relaxed fit, sizes S to XL", "Gentle hand wash recommended", "Each piece is one of a kind"]),
  // dummyProduct(10, "Scrunchie set of 3", "Hair decor", 299, 0, 4.7, 210, [76, 18, 4, 1, 1],
  //   "Three soft crochet scrunchies in matching colours. Gentle on hair and pretty on the wrist too.",
  //   ["Set of 3 in assorted colours", "Soft stretchy elastic inside", "Gentle on all hair types", "Machine washable in a laundry bag"]),
  // dummyProduct(11, "Flower hair clips", "Hair decor", 249, 1, 4.5, 133, [64, 24, 8, 3, 1],
  //   "Tiny crochet flowers on sturdy clips. Wear one, wear a few, or gift the whole set.",
  //   ["Set of 4 clips with crochet flowers", "Strong metal clip that stays put", "About 4 cm wide each", "Perfect for kids and adults"]),
  // dummyProduct(12, "Coaster set of 4", "Home decor", 349, 2, 4.6, 119, [70, 21, 6, 2, 1],
  //   "Round crochet coasters that protect your table and add a pop of colour to every cup of chai.",
  //   ["Set of 4 in mixed colours", "About 11 cm across", "Thick cotton soaks up drips", "Easy to wash and reuse"]),
  // dummyProduct(13, "Cushion cover", "Bed items", 649, 3, 4.7, 88, [74, 18, 5, 2, 1],
  //   "A textured crochet cover that turns a plain cushion into a cosy statement piece.",
  //   ["Fits a 40 x 40 cm cushion", "Hidden button closure", "Soft cotton yarn", "Cushion insert not included"]),
  // dummyProduct(14, "Amigurumi bunny", "Toys", 549, 0, 4.9, 167, [84, 12, 3, 1, 0],
  //   "A floppy-eared crochet bunny who loves cuddles. Soft, safe and made to be carried everywhere.",
  //   ["About 25 cm tall", "Stitched eyes, safe for little ones", "Stuffed with soft washable filling", "Spot clean or gentle hand wash"]),
];