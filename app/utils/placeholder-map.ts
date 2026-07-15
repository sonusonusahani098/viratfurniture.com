const serviceImageMap: Record<string, string> = {
  'custom-furniture': 'service-generic',
  'modular-furniture': 'category-storage',
  'wooden-wardrobe': 'category-wardrobe',
  'sliding-wardrobe': 'category-sliding-wardrobe',
  'bedroom-furniture': 'hero-bedroom',
  'living-room-furniture': 'hero-living-room',
  'tv-unit': 'category-tv-unit',
  'modular-kitchen': 'category-kitchen',
  'dining-table': 'category-dining',
  'wooden-partition': 'category-interior-wood-work',
  'wooden-ceiling': 'category-wooden-ceiling',
  'wall-panel': 'category-wall-panel',
  'storage-cabinets': 'category-storage',
  'study-table': 'category-study-table',
  'bookshelf': 'category-bookshelf',
  'pooja-unit': 'category-pooja-unit',
  'office-furniture': 'category-office',
  'office-workstation': 'category-workstation',
  'reception-counter': 'category-reception',
  'commercial-furniture': 'category-builder-projects',
  'hotel-furniture': 'category-hotel',
  'restaurant-furniture': 'category-hotel',
  'builder-furniture-work': 'category-builder-projects',
  'apartment-furniture-installation': 'category-apartment',
  'sofa-repair': 'category-repair',
  'furniture-repair': 'category-repair',
  'bed-repair': 'category-repair',
  'cupboard-repair': 'category-repair',
  'polishing': 'category-luxury-wood',
  'furniture-renovation': 'category-repair',
}

export function getServiceImage(slug: string) {
  const key = serviceImageMap[slug] || 'service-generic'
  return `/images/placeholders/${key}.svg`
}

export function getAreaImage() {
  return '/images/placeholders/area-generic.svg'
}
