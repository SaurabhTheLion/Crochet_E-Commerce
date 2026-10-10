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

// All product details and reviews below are sample data.
export const products: Product[] = [
  {
    id: 1,
    name: "Granny square throw",
    price: 1299,
    image: unsplash("1782576417426-4ae01da20440", 600),
    alt: "Colourful granny square crochet",
    images: gallery(unsplash("1782576417426-4ae01da20440", 1000), 0),
    rating: 4.6,
    ratingCount: 128,
    breakdown: [68, 22, 6, 2, 2],
    description:
      "A patchwork throw made from hand-crocheted granny squares in bright, happy colours. Light enough for summer evenings and cosy enough for the sofa.",
    features: [
      "Hand-crocheted from soft cotton blend yarn",
      "Size about 120 x 150 cm",
      "Gentle machine wash, dry flat",
      "Every piece is made to order, so colours can vary slightly",
    ],
    reviews: [
      { id: 1, name: "Priya S.", rating: 5, title: "Bright and so cheerful", date: "12 September 2026", text: "The colours are even prettier in person. It sits on my sofa and everyone asks where it is from." },
      { id: 2, name: "Rohan M.", rating: 4, title: "Lovely, a little smaller than I expected", date: "28 August 2026", text: "Beautiful stitching and very soft. I wish it was a bit wider, but my mother loved it as a gift." },
      { id: 3, name: "Ananya R.", rating: 5, title: "Perfect housewarming gift", date: "3 August 2026", text: "Arrived neatly packed and the colours are vibrant. Already planning to order another one." },
    ],
  },
  {
    id: 2,
    name: "Penguin plush set",
    price: 799,
    image: unsplash("1779433755935-991480f06b98", 600),
    alt: "Crocheted penguin toys",
    images: gallery(unsplash("1779433755935-991480f06b98", 1000), 1),
    rating: 4.8,
    ratingCount: 86,
    breakdown: [80, 14, 4, 1, 1],
    description:
      "Five tiny crochet penguins, each in its own colour. Soft, squishy and just the right size for small hands, shelves and desks.",
    features: [
      "Set of 5 penguins, about 12 cm tall each",
      "Stuffed with soft, washable filling",
      "Stitched eyes, so no loose parts",
      "Comes in a gift-ready bag",
    ],
    reviews: [
      { id: 1, name: "Neha K.", rating: 5, title: "My daughter named all five", date: "5 October 2026", text: "They are tiny, soft and so well made. She carries one of them everywhere now." },
      { id: 2, name: "Vikram T.", rating: 5, title: "Great quality for the price", date: "19 September 2026", text: "The stitching is neat and the colours are fun. Bought two sets for birthday gifts." },
      { id: 3, name: "Sana A.", rating: 4, title: "Cute, just a little small", date: "30 August 2026", text: "Really adorable and well finished. I expected them a bit bigger, but I would still buy again." },
    ],
  },
  {
    id: 3,
    name: "Cloud blanket",
    price: 1899,
    image: unsplash("1693387369575-df25ef8424e7", 600),
    alt: "Crocheted blanket on a bed",
    images: gallery(unsplash("1693387369575-df25ef8424e7", 1000), 2),
    rating: 4.7,
    ratingCount: 203,
    breakdown: [74, 17, 6, 2, 1],
    description:
      "A chunky, cloud-soft blanket for the end of the bed or a lazy afternoon. Thick stitches make it warm without feeling heavy.",
    features: [
      "Chunky hand-crocheted knit, very soft to touch",
      "Size about 130 x 170 cm",
      "Works as a bed runner or a sofa blanket",
      "Made to order in small batches",
    ],
    reviews: [
      { id: 1, name: "Kavya P.", rating: 5, title: "Warm without being heavy", date: "1 October 2026", text: "Exactly the cosy feel I wanted. It looks lovely at the foot of my bed." },
      { id: 2, name: "Arjun D.", rating: 5, title: "Worth every rupee", date: "14 September 2026", text: "You can see the time and care in every row. Very soft and holds its shape." },
      { id: 3, name: "Meera J.", rating: 4, title: "Gorgeous, takes a little time to arrive", date: "22 August 2026", text: "It is made to order, so I waited a few days. The blanket itself is beautiful." },
    ],
  },
  {
    id: 4,
    name: "Cozy sofa throw",
    price: 1599,
    image: unsplash("1693387347071-d3bf494cbe0e", 600),
    alt: "Person holding a crocheted throw",
    images: gallery(unsplash("1693387347071-d3bf494cbe0e", 1000), 3),
    rating: 4.5,
    ratingCount: 64,
    breakdown: [60, 26, 9, 3, 2],
    description:
      "A relaxed everyday throw to drape over the sofa or a chair. Light, textured and easy to carry from room to room.",
    features: [
      "Hand-crocheted in a soft textured stitch",
      "Size about 110 x 150 cm",
      "Fringe-free edges that stay neat after washing",
      "Gentle hand wash recommended",
    ],
    reviews: [
      { id: 1, name: "Ishita G.", rating: 5, title: "My favourite corner of the house", date: "26 September 2026", text: "Looks great on my sofa and feels lovely. Got compliments the first day." },
      { id: 2, name: "Rahul B.", rating: 4, title: "Nice and soft", date: "9 September 2026", text: "Good quality and nicely finished. I would have liked one more colour option." },
      { id: 3, name: "Divya N.", rating: 4, title: "Very pretty texture", date: "17 August 2026", text: "The stitch pattern looks beautiful in photos and even better in person." },
    ],
  },
  {
    id: 5,
    name: "Pastel baby blanket",
    price: 999,
    image: unsplash("1693387359607-f48d0a824b1e", 600),
    alt: "Soft crocheted blanket",
    images: gallery(unsplash("1693387359607-f48d0a824b1e", 1000), 0),
    rating: 4.9,
    ratingCount: 152,
    breakdown: [88, 9, 2, 1, 0],
    description:
      "A gentle little blanket in soft pastel shades, made for prams, cots and newborn photos. Smooth stitches with no scratchy bits.",
    features: [
      "Super soft, baby-friendly yarn",
      "Size about 75 x 90 cm",
      "Smooth stitches with no loose threads",
      "A thoughtful gift for new parents",
    ],
    reviews: [
      { id: 1, name: "Pooja L.", rating: 5, title: "So gentle for the baby", date: "8 October 2026", text: "Soft, light and the pastel colours are lovely. It is now my go-to for stroller walks." },
      { id: 2, name: "Aditya V.", rating: 5, title: "Best baby shower gift", date: "20 September 2026", text: "My sister cried a little when she opened it. Beautifully made." },
      { id: 3, name: "Shruti C.", rating: 5, title: "Beautiful and so soft", date: "2 September 2026", text: "Washes well and still feels like new. I have ordered a second one for my friend." },
    ],
  },
];