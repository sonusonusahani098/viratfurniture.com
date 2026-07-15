export const business = {
  name: 'Virat Furniture',
  tagline: 'Furniture Making & Interior Wood Work in Surat',
  phone: '+91 97257 13944',
  phoneRaw: '919725713944',
  email: 'service@viratfurniture.com',
  address: 'Shop Number G109, Gaurav Path Road, Palanpur, Surat, Gujarat 395009',
  addressShort: 'Palanpur, Surat',
  hours: {
    weekdays: 'Monday – Saturday: 9:00 AM – 7:00 PM',
    sunday: 'Sunday: By Appointment',
  },
  mapEmbedSrc:
    'https://www.google.com/maps?q=Gaurav+Path+Road+Palanpur+Surat+Gujarat+395009&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Shop+Number+G109+Gaurav+Path+Road+Palanpur+Surat+Gujarat+395009',
  whatsappLink: (message = "Hi Virat Furniture, I'd like to get a free furniture estimate.") =>
    `https://wa.me/919725713944?text=${encodeURIComponent(message)}`,
  yearsExperience: 20,
  teamSize: 15,
}

export interface ServiceNavItem {
  name: string
  slug: string
  group: 'Home Furniture' | 'Office & Commercial' | 'Repair & Renovation'
}

export const services: ServiceNavItem[] = [
  { name: 'Custom Furniture', slug: 'custom-furniture', group: 'Home Furniture' },
  { name: 'Modular Furniture', slug: 'modular-furniture', group: 'Home Furniture' },
  { name: 'Wooden Wardrobe', slug: 'wooden-wardrobe', group: 'Home Furniture' },
  { name: 'Sliding Wardrobe', slug: 'sliding-wardrobe', group: 'Home Furniture' },
  { name: 'Bedroom Furniture', slug: 'bedroom-furniture', group: 'Home Furniture' },
  { name: 'Living Room Furniture', slug: 'living-room-furniture', group: 'Home Furniture' },
  { name: 'TV Unit', slug: 'tv-unit', group: 'Home Furniture' },
  { name: 'Modular Kitchen', slug: 'modular-kitchen', group: 'Home Furniture' },
  { name: 'Dining Table', slug: 'dining-table', group: 'Home Furniture' },
  { name: 'Wooden Partition', slug: 'wooden-partition', group: 'Home Furniture' },
  { name: 'Wooden Ceiling', slug: 'wooden-ceiling', group: 'Home Furniture' },
  { name: 'Wall Panel', slug: 'wall-panel', group: 'Home Furniture' },
  { name: 'Storage Cabinets', slug: 'storage-cabinets', group: 'Home Furniture' },
  { name: 'Study Table', slug: 'study-table', group: 'Home Furniture' },
  { name: 'Bookshelf', slug: 'bookshelf', group: 'Home Furniture' },
  { name: 'Pooja Unit', slug: 'pooja-unit', group: 'Home Furniture' },
  { name: 'Office Furniture', slug: 'office-furniture', group: 'Office & Commercial' },
  { name: 'Office Workstation', slug: 'office-workstation', group: 'Office & Commercial' },
  { name: 'Reception Counter', slug: 'reception-counter', group: 'Office & Commercial' },
  { name: 'Commercial Furniture', slug: 'commercial-furniture', group: 'Office & Commercial' },
  { name: 'Hotel Furniture', slug: 'hotel-furniture', group: 'Office & Commercial' },
  { name: 'Restaurant Furniture', slug: 'restaurant-furniture', group: 'Office & Commercial' },
  { name: 'Builder Furniture Work', slug: 'builder-furniture-work', group: 'Office & Commercial' },
  { name: 'Apartment Furniture Installation', slug: 'apartment-furniture-installation', group: 'Office & Commercial' },
  { name: 'Sofa Repair', slug: 'sofa-repair', group: 'Repair & Renovation' },
  { name: 'Furniture Repair', slug: 'furniture-repair', group: 'Repair & Renovation' },
  { name: 'Bed Repair', slug: 'bed-repair', group: 'Repair & Renovation' },
  { name: 'Cupboard Repair', slug: 'cupboard-repair', group: 'Repair & Renovation' },
  { name: 'Polishing', slug: 'polishing', group: 'Repair & Renovation' },
  { name: 'Furniture Renovation', slug: 'furniture-renovation', group: 'Repair & Renovation' },
]

export interface AreaNavItem {
  name: string
  slug: string
}

export const areas: AreaNavItem[] = [
  { name: 'Adajan', slug: 'adajan' },
  { name: 'Pal', slug: 'pal' },
  { name: 'Palanpur', slug: 'palanpur' },
  { name: 'Vesu', slug: 'vesu' },
  { name: 'Piplod', slug: 'piplod' },
  { name: 'City Light', slug: 'city-light' },
  { name: 'VIP Road', slug: 'vip-road' },
  { name: 'Althan', slug: 'althan' },
  { name: 'Bhatar', slug: 'bhatar' },
  { name: 'Udhna', slug: 'udhna' },
  { name: 'Katargam', slug: 'katargam' },
  { name: 'Varachha', slug: 'varachha' },
  { name: 'Yogichowk', slug: 'yogichowk' },
  { name: 'Mota Varachha', slug: 'mota-varachha' },
  { name: 'Amroli', slug: 'amroli' },
  { name: 'Dindoli', slug: 'dindoli' },
  { name: 'Parvat Patiya', slug: 'parvat-patiya' },
  { name: 'Godadara', slug: 'godadara' },
  { name: 'Jahangirpura', slug: 'jahangirpura' },
  { name: 'Rander', slug: 'rander' },
  { name: 'Nanpura', slug: 'nanpura' },
  { name: 'Athwalines', slug: 'athwalines' },
  { name: 'Ghod Dod Road', slug: 'ghod-dod-road' },
  { name: 'New City Light', slug: 'new-city-light' },
  { name: 'Sarthana', slug: 'sarthana' },
  { name: 'Canal Road', slug: 'canal-road' },
  { name: 'Bhimrad', slug: 'bhimrad' },
  { name: 'Magdalla', slug: 'magdalla' },
  { name: 'Sachin', slug: 'sachin' },
  { name: 'Pandesara', slug: 'pandesara' },
  { name: 'Puna', slug: 'puna' },
  { name: 'Limbayat', slug: 'limbayat' },
  { name: 'Gaurav Path Road', slug: 'gaurav-path-road' },
]

export const blogCategories = [
  'Furniture Tips',
  'Furniture Repair',
  'Interior Ideas',
  'Wardrobe Guide',
  'Bedroom Design',
  'Furniture Maintenance',
  'Surat Home Ideas',
]

export const mainNav = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Services', to: '/services' },
  { name: 'Areas We Serve', to: '/areas' },
  { name: 'Projects', to: '/projects' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Blog', to: '/blog' },
  { name: 'Contact', to: '/contact' },
]
