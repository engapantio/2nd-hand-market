// src/constants/categoryMap.js

// Top filter → list of DummyJSON category slugs
export const TOP_FILTER_MAP = {
  Women: ['womens-dresses', 'womens-shoes', 'womens-bags', 'womens-jewellery', 'womens-watches'],
  Men: ['mens-shirts', 'mens-shoes', 'mens-watches'],
  Unisex: ['tops', 'sunglasses', 'sports-accessories'],
  Children: ['tops'], // DummyJSON has no dedicated kids category — closest match
  New: [], // handled client-side: filter by meta.createdAt within last 60 days
};

// Sidebar category → sub-items → DummyJSON slug
export const SIDEBAR_CATEGORIES = [
  {
    label: 'Shoes',
    slug: null, // parent — clicking expands only
    sub: [
      { label: "Women's Shoes", slug: 'womens-shoes' },
      { label: "Men's Shoes", slug: 'mens-shoes' },
    ],
  },
  {
    label: 'Apparel',
    slug: null,
    sub: [
      { label: 'Dresses', slug: 'womens-dresses' },
      { label: "Men's Tops", slug: 'mens-shirts' },
      { label: 'Tops', slug: 'tops' },
    ],
  },
  {
    label: 'Accessories',
    slug: null,
    sub: [
      { label: 'Bags', slug: 'womens-bags' },
      { label: 'Jewellery', slug: 'womens-jewellery' },
      { label: 'Sunglasses', slug: 'sunglasses' },
      { label: 'Watches', slug: 'womens-watches' },
    ],
  },
  {
    label: 'Sport',
    slug: null,
    sub: [{ label: 'Sports Accessories', slug: 'sports-accessories' }],
  },
  {
    label: 'Beauty',
    slug: 'beauty',
    sub: [{ label: 'Skin Care', slug: 'skin-care' }],
  },
];
