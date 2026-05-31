// src/components/orders/shopUtils.js

export const SHOP_META = {
  restyleHub: {
    name: 'ReStyle Hub',
    location: '23A Gran Via',
    workHours: 'MO – FR: 9AM – 8PM · SA – SU: 9AM – 8PM',
    deliveryTime: '1–3 working days',
    freeShippingFrom: '€ 34,00',
  },
  trendTraders: {
    name: 'TrendTraders',
    location: 'Strada degli Arcobaleni',
    workHours: 'MO – FR: 9AM – 5PM · SA – SU: 11AM – 5PM',
    deliveryTime: '1–5 working days',
    freeShippingFrom: '€ 50,00',
  },
};

export const DEFAULT_SHOP_META = {
  name: 'Shop',
  location: '',
  workHours: '',
  deliveryTime: '1–5 working days',
  freeShippingFrom: '€ 50,00',
};

export const getShopKeyAndMeta = (item) => {
  const rawName = item.shopName || '';
  const normalized = rawName.toLowerCase().replace(/\s+/g, '');

  const key = item.shopId || (SHOP_META[normalized] ? normalized : 'default-shop');

  const baseMeta = SHOP_META[key] || DEFAULT_SHOP_META;

  const meta = {
    ...baseMeta,
    name: item.shopName || baseMeta.name,
    location: item.shopLocation || item.location || baseMeta.location,
    workHours: item.workHours || baseMeta.workHours,
  };

  return { shopKey: key, shopMeta: meta };
};

export const groupByShop = (items = []) => {
  const groups = {};

  items.forEach((item) => {
    const key = item.shopId || 'unknown';

    if (!groups[key]) {
      groups[key] = {
        shopKey: key,
        shopName: item.shopName || 'Shop',
        shopLocation: item.shopLocation || '',
        workHours: item.workHours || '',
        shopMeta: {
          deliveryTime: item.deliveryTime,
          freeShippingFrom: item.freeShippingFrom,
        },
        reservedRange: item.reservedRange || null,
        purchaseDate: item.purchaseDate || null,
        products: [],
      };
    }

    groups[key].products.push(item.product);
  });

  return Object.values(groups);
};
