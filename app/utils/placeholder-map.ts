// Maps service/area slugs to illustrated scene art in /public/images/art.
// Swap any file for a real photograph with the same name to upgrade a slot.
const serviceSceneMap: Record<string, string> = {
  'custom-furniture': 'workshop',
  'modular-furniture': 'storage',
  'wooden-wardrobe': 'wardrobe',
  'sliding-wardrobe': 'sliding-wardrobe',
  'bedroom-furniture': 'bedroom',
  'living-room-furniture': 'living-room',
  'tv-unit': 'tv-unit',
  'modular-kitchen': 'kitchen',
  'dining-table': 'dining',
  'wooden-partition': 'woodwork',
  'wooden-ceiling': 'woodwork',
  'wall-panel': 'woodwork',
  'storage-cabinets': 'storage',
  'study-table': 'study',
  'bookshelf': 'bookshelf',
  'pooja-unit': 'pooja',
  'office-furniture': 'office',
  'office-workstation': 'office',
  'reception-counter': 'reception',
  'commercial-furniture': 'showroom',
  'hotel-furniture': 'hotel',
  'restaurant-furniture': 'restaurant',
  'builder-furniture-work': 'building',
  'apartment-furniture-installation': 'building',
  'sofa-repair': 'workshop',
  'furniture-repair': 'workshop',
  'bed-repair': 'workshop',
  'cupboard-repair': 'workshop',
  'polishing': 'workshop',
  'furniture-renovation': 'workshop',
}

export function getServiceImage(slug: string) {
  const scene = serviceSceneMap[slug] || 'living-room'
  return `/images/art/${scene}.svg`
}

export function getAreaImage() {
  return '/images/art/building.svg'
}
