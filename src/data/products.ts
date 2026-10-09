export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  alt: string;
};

// Hard-coded sample images from Unsplash (free to use under the Unsplash License).
export const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

// Sample products. Replace with your real products and photos later.
export const products: Product[] = [
  { id: 1, name: "Granny square throw", price: 1299, image: unsplash("1782576417426-4ae01da20440", 600), alt: "Colourful granny square crochet" },
  { id: 2, name: "Penguin plush set", price: 799, image: unsplash("1779433755935-991480f06b98", 600), alt: "Crocheted penguin toys" },
  { id: 3, name: "Cloud blanket", price: 1899, image: unsplash("1693387369575-df25ef8424e7", 600), alt: "Crocheted blanket on a bed" },
  { id: 4, name: "Cozy sofa throw", price: 1599, image: unsplash("1693387347071-d3bf494cbe0e", 600), alt: "Person holding a crocheted throw" },
  { id: 5, name: "Pastel baby blanket", price: 999, image: unsplash("1693387359607-f48d0a824b1e", 600), alt: "Soft crocheted blanket" },
];