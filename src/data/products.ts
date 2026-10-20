export const categories = ["Home decor", "Flowers", "Clothes", "Hair decor", "Bed items", "Toys","abc"] as const;
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
    name: "Sunflower",
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
      { id: 1, name: "Priya S.", rating: 5, title: "Bright and so cheerful", date: "12 September 2026", text: "The colours are even prettier in person. It sits on my sofa and everyone asks where it is from." },
      { id: 2, name: "Rohan M.", rating: 4, title: "Lovely, a little smaller than I expected", date: "28 August 2026", text: "Beautiful stitching and very soft. I wish it was a bit wider, but my mother loved it as a gift." },
      { id: 3, name: "Ananya R.", rating: 5, title: "Perfect housewarming gift", date: "3 August 2026", text: "Arrived neatly packed and the colours are vibrant. Already planning to order another one." },
    ],
  },
  {
    id: 2,
    name: "Ever Bloom Crochet Tulip",
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
      { id: 1, name: "Priya S.", rating: 5, title: "Bright and so cheerful", date: "12 September 2026", text: "The colours are even prettier in person. It sits on my sofa and everyone asks where it is from." },
      { id: 2, name: "Rohan M.", rating: 4, title: "Lovely, a little smaller than I expected", date: "28 August 2026", text: "Beautiful stitching and very soft. I wish it was a bit wider, but my mother loved it as a gift." },
      { id: 3, name: "Ananya R.", rating: 5, title: "Perfect housewarming gift", date: "3 August 2026", text: "Arrived neatly packed and the colours are vibrant. Already planning to order another one." },
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
      { id: 1, name: "Priya S.", rating: 5, title: "Bright and so cheerful", date: "12 September 2026", text: "The colours are even prettier in person. It sits on my sofa and everyone asks where it is from." },
      { id: 2, name: "Rohan M.", rating: 4, title: "Lovely, a little smaller than I expected", date: "28 August 2026", text: "Beautiful stitching and very soft. I wish it was a bit wider, but my mother loved it as a gift." },
      { id: 3, name: "Ananya R.", rating: 5, title: "Perfect housewarming gift", date: "3 August 2026", text: "Arrived neatly packed and the colours are vibrant. Already planning to order another one." },
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
      { id: 1, name: "Priya S.", rating: 5, title: "Bright and so cheerful", date: "12 September 2026", text: "The colours are even prettier in person. It sits on my sofa and everyone asks where it is from." },
      { id: 2, name: "Rohan M.", rating: 4, title: "Lovely, a little smaller than I expected", date: "28 August 2026", text: "Beautiful stitching and very soft. I wish it was a bit wider, but my mother loved it as a gift." },
      { id: 3, name: "Ananya R.", rating: 5, title: "Perfect housewarming gift", date: "3 August 2026", text: "Arrived neatly packed and the colours are vibrant. Already planning to order another one." },
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
      { id: 1, name: "Priya S.", rating: 5, title: "Bright and so cheerful", date: "12 September 2026", text: "The colours are even prettier in person. It sits on my sofa and everyone asks where it is from." },
      { id: 2, name: "Rohan M.", rating: 4, title: "Lovely, a little smaller than I expected", date: "28 August 2026", text: "Beautiful stitching and very soft. I wish it was a bit wider, but my mother loved it as a gift." },
      { id: 3, name: "Ananya R.", rating: 5, title: "Perfect housewarming gift", date: "3 August 2026", text: "Arrived neatly packed and the colours are vibrant. Already planning to order another one." },
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
      { id: 1, name: "Priya S.", rating: 5, title: "Bright and so cheerful", date: "12 September 2026", text: "The colours are even prettier in person. It sits on my sofa and everyone asks where it is from." },
      { id: 2, name: "Rohan M.", rating: 4, title: "Lovely, a little smaller than I expected", date: "28 August 2026", text: "Beautiful stitching and very soft. I wish it was a bit wider, but my mother loved it as a gift." },
      { id: 3, name: "Ananya R.", rating: 5, title: "Perfect housewarming gift", date: "3 August 2026", text: "Arrived neatly packed and the colours are vibrant. Already planning to order another one." },
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
      { id: 1, name: "Neha K.", rating: 5, title: "My daughter named all five", date: "5 October 2026", text: "They are tiny, soft and so well made. She carries one of them everywhere now." },
      { id: 2, name: "Vikram T.", rating: 5, title: "Great quality for the price", date: "19 September 2026", text: "The stitching is neat and the colours are fun. Bought two sets for birthday gifts." },
      { id: 3, name: "Sana A.", rating: 4, title: "Cute, just a little small", date: "30 August 2026", text: "Really adorable and well finished. I expected them a bit bigger, but I would still buy again." },
    ],
  },
  {
    id: 8,
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
      { id: 1, name: "Kavya P.", rating: 5, title: "Warm without being heavy", date: "1 October 2026", text: "Exactly the cosy feel I wanted. It looks lovely at the foot of my bed." },
      { id: 2, name: "Arjun D.", rating: 5, title: "Worth every rupee", date: "14 September 2026", text: "You can see the time and care in every row. Very soft and holds its shape." },
      { id: 3, name: "Meera J.", rating: 4, title: "Gorgeous, takes a little time to arrive", date: "22 August 2026", text: "It is made to order, so I waited a few days. The blanket itself is beautiful." },
    ],
  },
  {
    id: 9,
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
      { id: 1, name: "Ishita G.", rating: 5, title: "My favourite corner of the house", date: "26 September 2026", text: "Looks great on my sofa and feels lovely. Got compliments the first day." },
      { id: 2, name: "Rahul B.", rating: 4, title: "Nice and soft", date: "9 September 2026", text: "Good quality and nicely finished. I would have liked one more colour option." },
      { id: 3, name: "Divya N.", rating: 4, title: "Very pretty texture", date: "17 August 2026", text: "The stitch pattern looks beautiful in photos and even better in person." },
    ],
  },
  {
    id: 10,
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
      { id: 1, name: "Pooja L.", rating: 5, title: "So gentle for the baby", date: "8 October 2026", text: "Soft, light and the pastel colours are lovely. It is now my go-to for stroller walks." },
      { id: 2, name: "Aditya V.", rating: 5, title: "Best baby shower gift", date: "20 September 2026", text: "My sister cried a little when she opened it. Beautifully made." },
      { id: 3, name: "Shruti C.", rating: 5, title: "Beautiful and so soft", date: "2 September 2026", text: "Washes well and still feels like new. I have ordered a second one for my friend." },
    ],
  },
  {
    id: 11,
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
      { id: 1, name: "Pooja L.", rating: 5, title: "So gentle for the baby", date: "8 October 2026", text: "Soft, light and the pastel colours are lovely. It is now my go-to for stroller walks." },
      { id: 2, name: "Aditya V.", rating: 5, title: "Best baby shower gift", date: "20 September 2026", text: "My sister cried a little when she opened it. Beautifully made." },
      { id: 3, name: "Shruti C.", rating: 5, title: "Beautiful and so soft", date: "2 September 2026", text: "Washes well and still feels like new. I have ordered a second one for my friend." },
    ],
  },
  {
    id: 11,
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
      { id: 1, name: "Pooja L.", rating: 5, title: "So gentle for the baby", date: "8 October 2026", text: "Soft, light and the pastel colours are lovely. It is now my go-to for stroller walks." },
      { id: 2, name: "Aditya V.", rating: 5, title: "Best baby shower gift", date: "20 September 2026", text: "My sister cried a little when she opened it. Beautifully made." },
      { id: 3, name: "Shruti C.", rating: 5, title: "Beautiful and so soft", date: "2 September 2026", text: "Washes well and still feels like new. I have ordered a second one for my friend." },
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