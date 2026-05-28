import React from 'react';

const crumb = (isFirst) => ({
  display: 'inline',
  fontSize: 14,
  color: isFirst ? '#ff2d55' : '#333',
  fontWeight: isFirst ? 600 : 400,
});
const sep = { margin: '0 6px', color: '#a1a1a1', fontSize: 14 };

const Breadcrumbs = ({ items = [] }) => (
  <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }}>
    {items.map((item, i) => (
      <span key={`${item}-${i}`}>
        {i > 0 && <span style={sep}>›</span>}
        <span style={crumb(i === 0)}>{item}</span>
      </span>
    ))}
  </nav>
);

export default Breadcrumbs;
