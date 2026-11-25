export type VehicleStatus = "Operativo" | "En mantenimiento" | "Revisión requerida";
export type DocumentStatus = "Vigente" | "Próximo a vencer" | "Vencido" | "Pendiente";
export type MaintenanceStatus = "Programado" | "En progreso" | "Realizado" | "Atrasado";

export type Vehicle = {
  id: string; plate: string; brand: string; model: string; year: number; type: string;
  driver: string; mileage: number; documents: DocumentStatus; technical: DocumentStatus;
  status: VehicleStatus; vin: string; capacity: number; lastInspection: string; qrCode: string;
};
export type Driver = {
  id: string; name: string; initials: string; license: string; category: string;
  expiry: string; experience: number; status: "Activo" | "En licencia" | "Inactivo";
  vehicle: string; phone: string; email: string; publicProfile: boolean;
};
export type Maintenance = {
  id: string; vehicle: string; type: "Preventivo" | "Correctivo" | "Inspección general";
  date: string; nextDate: string; responsible: string; status: MaintenanceStatus;
  description: string; cost: number;
};
export type AlertItem = { id: string; title: string; detail: string; type: "warning" | "danger" | "info"; date: string };

export const initialVehicles: Vehicle[] = [
  { id: "v1", plate: "TCT-042", brand: "Chevrolet", model: "NPR", year: 2021, type: "Buseta", driver: "María Fernanda López", mileage: 86420, documents: "Vigente", technical: "Vigente", status: "Operativo", vin: "9GCNPR21TCT04201", capacity: 28, lastInspection: "18 nov 2026", qrCode: "TC-TCT042" },
  { id: "v2", plate: "TCT-118", brand: "Volvo", model: "B270F", year: 2020, type: "Bus", driver: "Carlos Andrés Mejía", mileage: 132850, documents: "Próximo a vencer", technical: "Vigente", status: "Operativo", vin: "9BV270FTCT11820", capacity: 42, lastInspection: "06 nov 2026", qrCode: "TC-TCT118" },
  { id: "v3", plate: "TCT-207", brand: "Mercedes-Benz", model: "Sprinter", year: 2022, type: "Microbús", driver: "Julián Cárdenas", mileage: 55340, documents: "Vigente", technical: "Vigente", status: "Operativo", vin: "WDBSPRTCT20722", capacity: 19, lastInspection: "21 nov 2026", qrCode: "TC-TCT207" },
  { id: "v4", plate: "TCT-315", brand: "Hino", model: "FC9J", year: 2019, type: "Buseta", driver: "Laura Marcela Gil", mileage: 178240, documents: "Vencido", technical: "Vencido", status: "Revisión requerida", vin: "JHFC9JTCT31519", capacity: 30, lastInspection: "12 oct 2026", qrCode: "TC-TCT315" },
  { id: "v5", plate: "TCT-366", brand: "Chevrolet", model: "NPR", year: 2023, type: "Buseta", driver: "Andrés Felipe Ríos", mileage: 38750, documents: "Vigente", technical: "Próximo a vencer", status: "Operativo", vin: "9GCNPR23TCT36601", capacity: 28, lastInspection: "02 oct 2026", qrCode: "TC-TCT366" },
  { id: "v6", plate: "TCT-402", brand: "Volkswagen", model: "Delivery", year: 2018, type: "Bus", driver: "Sin asignar", mileage: 201110, documents: "Vigente", technical: "Pendiente", status: "En mantenimiento", vin: "9VWDLV18TCT402", capacity: 38, lastInspection: "28 sep 2026", qrCode: "TC-TCT402" },
  { id: "v7", plate: "TCT-447", brand: "Volvo", model: "B270F", year: 2021, type: "Bus", driver: "Diana Patricia Mora", mileage: 109430, documents: "Vigente", technical: "Vigente", status: "Operativo", vin: "9BV270FTCT44721", capacity: 42, lastInspection: "15 nov 2026", qrCode: "TC-TCT447" },
  { id: "v8", plate: "TCT-509", brand: "Hino", model: "FC9J", year: 2020, type: "Buseta", driver: "Ricardo Gómez", mileage: 145600, documents: "Próximo a vencer", technical: "Vigente", status: "Operativo", vin: "JHFC9JTCT50920", capacity: 30, lastInspection: "09 nov 2026", qrCode: "TC-TCT509" },
  { id: "v9", plate: "TCT-566", brand: "Mercedes-Benz", model: "Sprinter", year: 2022, type: "Microbús", driver: "Sin asignar", mileage: 49010, documents: "Vigente", technical: "Vigente", status: "Operativo", vin: "WDBSPRTCT56622", capacity: 19, lastInspection: "19 nov 2026", qrCode: "TC-TCT566" },
  { id: "v10", plate: "TCT-611", brand: "Chevrolet", model: "NPR", year: 2017, type: "Buseta", driver: "Sergio Pineda", mileage: 243900, documents: "Vigente", technical: "Próximo a vencer", status: "Revisión requerida", vin: "9GCNPR17TCT611", capacity: 28, lastInspection: "25 oct 2026", qrCode: "TC-TCT611" },
  { id: "v11", plate: "TCT-704", brand: "Volvo", model: "B270F", year: 2019, type: "Bus", driver: "Natalia Suárez", mileage: 189300, documents: "Vigente", technical: "Vigente", status: "Operativo", vin: "9BV270FTCT70419", capacity: 42, lastInspection: "11 nov 2026", qrCode: "TC-TCT704" },
  { id: "v12", plate: "TCT-788", brand: "Hino", model: "FC9J", year: 2023, type: "Buseta", driver: "Sin asignar", mileage: 28100, documents: "Vigente", technical: "Pendiente", status: "En mantenimiento", vin: "JHFC9JTCT78823", capacity: 30, lastInspection: "03 nov 2026", qrCode: "TC-TCT788" },
];

export const initialDrivers: Driver[] = [
  { id: "d1", name: "María Fernanda López", initials: "ML", license: "C2-10482", category: "C2", expiry: "22 feb 2028", experience: 12, status: "Activo", vehicle: "TCT-042", phone: "310 555 0182", email: "maria.lopez@transcontrol.demo", publicProfile: true },
  { id: "d2", name: "Carlos Andrés Mejía", initials: "CM", license: "C2-11930", category: "C2", expiry: "14 ene 2027", experience: 9, status: "Activo", vehicle: "TCT-118", phone: "315 555 0231", email: "carlos.mejia@transcontrol.demo", publicProfile: true },
  { id: "d3", name: "Julián Cárdenas", initials: "JC", license: "C2-08821", category: "C2", expiry: "09 ago 2029", experience: 15, status: "Activo", vehicle: "TCT-207", phone: "300 555 0427", email: "julian.cardenas@transcontrol.demo", publicProfile: true },
  { id: "d4", name: "Laura Marcela Gil", initials: "LG", license: "C2-11571", category: "C2", expiry: "18 dic 2026", experience: 7, status: "Activo", vehicle: "TCT-315", phone: "312 555 0931", email: "laura.gil@transcontrol.demo", publicProfile: true },
  { id: "d5", name: "Andrés Felipe Ríos", initials: "AR", license: "C2-12902", category: "C2", expiry: "30 sep 2027", experience: 6, status: "Activo", vehicle: "TCT-366", phone: "316 555 0761", email: "andres.rios@transcontrol.demo", publicProfile: true },
  { id: "d6", name: "Diana Patricia Mora", initials: "DM", license: "C2-09666", category: "C2", expiry: "12 jun 2028", experience: 11, status: "Activo", vehicle: "TCT-447", phone: "301 555 0610", email: "diana.mora@transcontrol.demo", publicProfile: true },
  { id: "d7", name: "Ricardo Gómez", initials: "RG", license: "C2-11048", category: "C2", expiry: "05 mar 2027", experience: 8, status: "Activo", vehicle: "TCT-509", phone: "318 555 0892", email: "ricardo.gomez@transcontrol.demo", publicProfile: true },
  { id: "d8", name: "Sergio Pineda", initials: "SP", license: "C2-07541", category: "C2", expiry: "17 nov 2026", experience: 18, status: "En licencia", vehicle: "TCT-611", phone: "311 555 0144", email: "sergio.pineda@transcontrol.demo", publicProfile: true },
  { id: "d9", name: "Natalia Suárez", initials: "NS", license: "C2-13122", category: "C2", expiry: "26 oct 2028", experience: 5, status: "Activo", vehicle: "TCT-704", phone: "313 555 0560", email: "natalia.suarez@transcontrol.demo", publicProfile: true },
  { id: "d10", name: "Miguel Ángel Torres", initials: "MT", license: "C2-10027", category: "C2", expiry: "11 jul 2027", experience: 10, status: "Activo", vehicle: "Sin asignar", phone: "302 555 0478", email: "miguel.torres@transcontrol.demo", publicProfile: true },
];

export const initialMaintenances: Maintenance[] = [
  { id: "m1", vehicle: "TCT-042", type: "Preventivo", date: "24 nov 2026", nextDate: "24 feb 2027", responsible: "Taller Central", status: "Programado", description: "Cambio de aceite y filtros", cost: 420000 },
  { id: "m2", vehicle: "TCT-118", type: "Inspección general", date: "21 nov 2026", nextDate: "21 dic 2026", responsible: "Carlos Méndez", status: "En progreso", description: "Revisión de sistema de frenos", cost: 280000 },
  { id: "m3", vehicle: "TCT-315", type: "Correctivo", date: "12 nov 2026", nextDate: "12 dic 2026", responsible: "Taller Central", status: "Atrasado", description: "Reparación de luces traseras", cost: 760000 },
  { id: "m4", vehicle: "TCT-366", type: "Preventivo", date: "05 nov 2026", nextDate: "05 feb 2027", responsible: "Taller Central", status: "Realizado", description: "Mantenimiento preventivo completo", cost: 980000 },
  { id: "m5", vehicle: "TCT-788", type: "Inspección general", date: "27 nov 2026", nextDate: "27 dic 2026", responsible: "Ana Torres", status: "Programado", description: "Inspección de ingreso a flota", cost: 150000 },
];

export const initialAlerts: AlertItem[] = [
  { id: "a1", title: "SOAT próximo a vencer", detail: "TCT-118 · vence en 12 días", type: "warning", date: "Hoy" },
  { id: "a2", title: "Documento vencido", detail: "TCT-315 · revisión técnico-mecánica", type: "danger", date: "Ayer" },
  { id: "a3", title: "Mantenimiento programado", detail: "TCT-042 · 24 nov 2026", type: "info", date: "Ayer" },
  { id: "a4", title: "Falla reportada", detail: "TCT-611 · ruido en sistema de suspensión", type: "danger", date: "23 nov" },
];

export function loadCollection<T>(key: string, initial: T[]): T[] {
  try { const stored = localStorage.getItem(`transcontrol:${key}`); return stored ? JSON.parse(stored) : initial; } catch { return initial; }
}
export function saveCollection<T>(key: string, data: T[]) { try { localStorage.setItem(`transcontrol:${key}`, JSON.stringify(data)); } catch {} }
export const currency = (value: number) => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
