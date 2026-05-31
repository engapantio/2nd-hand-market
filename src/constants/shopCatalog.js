// src/constants/shopCatalog.js

export const SHOPS = [
  {
    id: 'restyleHub',
    name: 'ReStyle Hub',
    location: '23A Gran Via',
    workHours: 'MO - FR: 9AM - 8PM | SA - SU: 9AM - 8PM',
    deliveryTime: '1-3 working days',
    freeShippingFrom: '€ 34,00',
  },
  {
    id: 'trendTraders',
    name: 'TrendTraders',
    location: 'Strada degli Arcobaleni',
    workHours: 'MO - FR: 9AM - 5PM | SA - SU: 11AM - 5PM',
    deliveryTime: '1-5 working days',
    freeShippingFrom: '€ 50,00',
  },
];

export const pickRandomShop = () => SHOPS[Math.floor(Math.random() * SHOPS.length)];

/**
 * Returns the reservation range: 3 days starting from Tuesday of next week.
 * start = next Tuesday 00:00 UTC, end = next Thursday 23:59:59 UTC.
 */
export const getNextWeekReservationRange = () => {
  const now = new Date();
  const day = now.getUTCDay();

  const daysUntilNextWednesday = (3 - day + 7) % 7 || 7;

  const start = new Date(now);
  start.setUTCDate(now.getUTCDate() + daysUntilNextWednesday);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 2);
  end.setUTCHours(23, 59, 59, 999);

  return {
    start: start.toISOString(),
    end: end.toISOString(),
  };
};
