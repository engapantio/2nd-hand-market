// src/utils/categoryLabel.js
import { SIDEBAR_CATEGORIES } from '../constants/categoryMap.js';

const buildLabelMap = () => {
  const map = {};
  SIDEBAR_CATEGORIES.forEach((cat) => {
    if (cat.slug) map[cat.slug] = cat.label;
    cat.sub?.forEach((sub) => {
      if (sub.slug) map[sub.slug] = sub.label;
    });
  });
  return map;
};

const LABEL_MAP = buildLabelMap();

export const getCategoryLabel = (slug) => {
  if (!slug) return '—';
  return LABEL_MAP[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

export const getStatus = (product) => {
  const statuses = ['In Sale', 'In Progress', 'Reserved', 'Sold', 'Locked', 'Closed Out'];
  return statuses[product.id % statuses.length];
};
