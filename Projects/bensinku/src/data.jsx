// Mock data — currency IDR, volume in liters, distance in km

export const VEHICLES = [
  {
    id: 'civic',
    make: 'Honda', model: 'Civic', year: 2020, plate: 'B 1234 GAS',
    tank: 47, color: '#2D4A6B',
    odometer: 68420,
    avgKmL: 12.4,
    photoTone: 'linear-gradient(135deg, #2D4A6B 0%, #1a2d42 100%)',
  },
  {
    id: 'avanza',
    make: 'Toyota', model: 'Avanza', year: 2018, plate: 'B 7788 KU',
    tank: 45, color: '#7A2D2D',
    odometer: 92110,
    avgKmL: 10.1,
    photoTone: 'linear-gradient(135deg, #7A2D2D 0%, #4a1818 100%)',
  },
];

// Fuel logs — each entry tagged with vehicleId
export const FUEL_LOGS = [
  { id: 'f9', vehicleId: 'civic', date: '2026-05-14', day: 'Kam',  liters: 38.2, total: 496600, ppl: 13000, brand: 'Pertamax', station: 'SPBU Sudirman',  odo: 68420, kmSince: 412, kmL: 10.8, status: 'normal' },
  { id: 'f8', vehicleId: 'civic', date: '2026-05-06', day: 'Rab',  liters: 41.5, total: 539500, ppl: 13000, brand: 'Pertamax', station: 'Shell Senayan',  odo: 68008, kmSince: 498, kmL: 12.0, status: 'hemat'  },
  { id: 'f7', vehicleId: 'civic', date: '2026-04-28', day: 'Sel',  liters: 32.0, total: 416000, ppl: 13000, brand: 'Pertamax', station: 'SPBU Tomang',    odo: 67510, kmSince: 388, kmL: 12.1, status: 'hemat'  },
  { id: 'f6', vehicleId: 'civic', date: '2026-04-19', day: 'Min',  liters: 35.8, total: 465400, ppl: 13000, brand: 'Pertamax', station: 'SPBU Tomang',    odo: 67122, kmSince: 442, kmL: 12.3, status: 'hemat'  },
  { id: 'f5', vehicleId: 'civic', date: '2026-04-09', day: 'Kam',  liters: 28.4, total: 369200, ppl: 13000, brand: 'Pertamax', station: 'Shell Senayan',  odo: 66680, kmSince: 360, kmL: 12.7, status: 'hemat'  },
  { id: 'f4', vehicleId: 'civic', date: '2026-04-01', day: 'Rab',  liters: 40.1, total: 521300, ppl: 13000, brand: 'Pertamax', station: 'SPBU Kuningan',  odo: 66320, kmSince: 520, kmL: 13.0, status: 'hemat'  },
  { id: 'f3', vehicleId: 'civic', date: '2026-03-22', day: 'Min',  liters: 39.0, total: 507000, ppl: 13000, brand: 'Pertamax', station: 'BP Casablanca',  odo: 65800, kmSince: 470, kmL: 12.1, status: 'hemat'  },
  { id: 'f2', vehicleId: 'civic', date: '2026-03-12', day: 'Kam',  liters: 43.2, total: 561600, ppl: 13000, brand: 'Pertamax', station: 'SPBU Sudirman',  odo: 65330, kmSince: 380, kmL:  8.8, status: 'boros'  },
  { id: 'f1', vehicleId: 'civic', date: '2026-03-02', day: 'Sen',  liters: 36.5, total: 474500, ppl: 13000, brand: 'Pertamax', station: 'Shell Senayan',  odo: 64950, kmSince: 410, kmL: 11.2, status: 'normal' },
];

export const MONTHLY = [
  { m: 'Des', total: 1620000, kmL: 11.4 },
  { m: 'Jan', total: 1780000, kmL: 11.1 },
  { m: 'Feb', total: 1450000, kmL: 11.8 },
  { m: 'Mar', total: 1543100, kmL: 10.7 },
  { m: 'Apr', total: 1771900, kmL: 12.5 },
  { m: 'Mei', total: 1036100, kmL: 11.4 },
];

export const DAILY = Array.from({ length: 30 }, (_, i) => {
  const seed = Math.sin(i * 1.7) * 0.5 + 0.5;
  const v = i % 8 === 0 ? 350000 + seed * 250000 : seed * 40000;
  return Math.round(v);
});

export const MAINTENANCE = [
  { id: 'm5', date: '2026-04-10', odo: 67200, cost: 850000,  category: 'Servis Berkala', desc: 'Ganti oli mesin + filter udara',        station: 'Honda Pondok Indah'  },
  { id: 'm4', date: '2025-10-15', odo: 61800, cost: 1250000, category: 'Servis Berkala', desc: 'Servis 60.000 km — tune up lengkap',     station: 'Honda Pondok Indah'  },
  { id: 'm3', date: '2025-07-02', odo: 58100, cost: 320000,  category: 'Ban',            desc: 'Rotasi ban + balancing',                 station: 'Bridgestone Senayan' },
  { id: 'm2', date: '2025-04-20', odo: 54700, cost: 780000,  category: 'Servis Berkala', desc: 'Ganti oli mesin + brake pad',            station: 'Honda Pondok Indah'  },
  { id: 'm1', date: '2024-12-05', odo: 49200, cost: 2400000, category: 'Aki & Listrik',  desc: 'Ganti aki + cek alternator',            station: 'Shop & Drive'        },
];

export const UPCOMING_SERVICE = {
  category: 'Servis Berkala 70.000 km',
  due: '~2,580 km lagi',
  dueDate: 'Estimasi 22 Jun 2026',
  progress: 0.74,
};

export const fmtIDR = (n) => {
  if (n >= 1_000_000) return 'Rp ' + (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2).replace(/\.?0+$/, '') + ' jt';
  return 'Rp ' + n.toLocaleString('id-ID');
};
export const fmtIDRfull = (n) => 'Rp ' + n.toLocaleString('id-ID');
export const fmtDate = (iso) => {
  const d = new Date(iso);
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};
export const fmtDateShort = (iso) => {
  const d = new Date(iso);
  const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
  return `${d.getDate()} ${months[d.getMonth()]}`;
};
