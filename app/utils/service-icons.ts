// Stroke icon paths (24x24 viewBox) per service slug — used by service cards
// and detail pages in place of imagery.
const icons: Record<string, string> = {
  'custom-furniture': 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586M11 11a2 2 0 1 0 4 0 2 2 0 0 0-4 0z',
  'modular-furniture': 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  'wooden-wardrobe': 'M5 3h14a1 1 0 0 1 1 1v17H4V4a1 1 0 0 1 1-1zM12 3v18M9.5 12v2M14.5 12v2',
  'sliding-wardrobe': 'M4 3h16a1 1 0 0 1 1 1v17H3V4a1 1 0 0 1 1-1zM11 3v18M8 11v3M15 11v3',
  'bedroom-furniture': 'M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M3 18v2M21 18v2M6 10V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3',
  'living-room-furniture': 'M5 11V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M4 11a2 2 0 0 1 2 2v1h12v-1a2 2 0 0 1 4 0v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM6 19v2M18 19v2',
  'tv-unit': 'M3 5h18a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 21h8M12 17v4',
  'modular-kitchen': 'M3 9h18M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9M3 9l2-5h14l2 5M12 13v4M7 13v4M17 13v4',
  'dining-table': 'M4 7h16M6 7l1 13M18 7l-1 13M9 7V5h6v2M8 13h8',
  'wooden-partition': 'M5 3v18M12 3v18M19 3v18M5 8h7M12 15h7',
  'sofa-repair': 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7z',
  'furniture-repair': 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7z',
  'bed-repair': 'M3 18v-6a2 2 0 0 1 2-2h9M3 18h13M3 18v2M17 3l4 4-8 8h-4v-4z',
  'cupboard-repair': 'M5 3h10a1 1 0 0 1 1 1v8M5 3a1 1 0 0 0-1 1v16h8M5 3v14M17 13l4 4-6 6h-4v-4z',
  'polishing': 'M12 3l2 5.5L19.5 10 14 12l-2 5.5L10 12l-5.5-2L10 8.5zM19 17l1 2.5L22.5 20 20 21l-1 2.5-1-2.5-2.5-1L18 19z',
  'furniture-renovation': 'M3 12a9 9 0 0 1 15.5-6.2M21 12a9 9 0 0 1-15.5 6.2M18.5 2v4h-4M5.5 22v-4h4',
  'wooden-ceiling': 'M3 5h18M3 9h18M6 9v12M12 9v12M18 9v12',
  'wall-panel': 'M4 4h16v16H4zM9 4v16M14 4v16',
  'storage-cabinets': 'M4 4h16a1 1 0 0 1 1 1v15H3V5a1 1 0 0 1 1-1zM3 12h18M8 8h.01M8 16h.01',
  'study-table': 'M3 7h18M5 7v13M19 7v13M8 11h8v5H8zM12 3v4',
  'bookshelf': 'M4 3h16v18H4zM4 9h16M4 15h16M8 3v6M13 9v6M16 15v6',
  'pooja-unit': 'M12 3l7 6v12H5V9zM9 21v-6a3 3 0 0 1 6 0v6M12 8v2',
  'office-furniture': 'M4 21V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v13M2 21h20M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M9 12h6',
  'office-workstation': 'M3 6h18M5 6v12M19 6v12M9 10h6v4H9zM8 21h8M12 18v3',
  'reception-counter': 'M3 11h18v3H3zM5 14v7M19 14v7M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4',
  'commercial-furniture': 'M4 21V10l8-6 8 6v11M2 21h20M10 21v-5h4v5M9 12h6',
  'hotel-furniture': 'M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16M1 21h22M7 8h2M11 8h2M15 8h2M7 12h2M11 12h2M15 12h2M10 21v-4h4v4',
  'restaurant-furniture': 'M6 3v7a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3M8 3v18M17 3c-1.5 1.5-2.5 4-2.5 6.5 0 2 .8 3 2.5 3V21',
  'builder-furniture-work': 'M6 22V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v18M9 9h1M9 13h1M14 9h1M14 13h1M9 22v-4h6v4M2 22h20',
  'apartment-furniture-installation': 'M3 21V8l7-5 7 5M10 21v-6h4v6M17 11h4v10M2 21h20',
}

const fallback = 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586'

export function getServiceIcon(slug: string) {
  return icons[slug] || fallback
}
