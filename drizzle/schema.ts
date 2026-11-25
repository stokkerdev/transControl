import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, date, boolean } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"), email: varchar("email", { length: 320 }), loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "maintenance", "driver"]).default("user").notNull(),
  companyId: int("companyId"), createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(), lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const companies = mysqlTable("companies", {
  id: int("id").autoincrement().primaryKey(), name: varchar("name", { length: 180 }).notNull(), nit: varchar("nit", { length: 40 }),
  contactEmail: varchar("contactEmail", { length: 320 }), contactPhone: varchar("contactPhone", { length: 40 }), city: varchar("city", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const vehicles = mysqlTable("vehicles", {
  id: int("id").autoincrement().primaryKey(), companyId: int("companyId").notNull(), plate: varchar("plate", { length: 16 }).notNull().unique(),
  brand: varchar("brand", { length: 80 }).notNull(), model: varchar("model", { length: 80 }).notNull(), year: int("year").notNull(), type: varchar("type", { length: 50 }).notNull(),
  vin: varchar("vin", { length: 64 }).notNull().unique(), mileage: int("mileage").default(0).notNull(), capacity: int("capacity").notNull(), qrCode: varchar("qrCode", { length: 80 }).notNull().unique(),
  status: mysqlEnum("status", ["Operativo", "En mantenimiento", "Revisión requerida"]).default("Operativo").notNull(), publicVisible: boolean("publicVisible").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const drivers = mysqlTable("drivers", {
  id: int("id").autoincrement().primaryKey(), companyId: int("companyId").notNull(), name: varchar("name", { length: 160 }).notNull(), initials: varchar("initials", { length: 4 }),
  identificationType: varchar("identificationType", { length: 30 }), identificationNumber: varchar("identificationNumber", { length: 40 }), licenseNumber: varchar("licenseNumber", { length: 40 }).notNull(),
  licenseCategory: varchar("licenseCategory", { length: 15 }), licenseExpiry: date("licenseExpiry"), experienceYears: int("experienceYears").default(0).notNull(),
  phone: varchar("phone", { length: 40 }), email: varchar("email", { length: 320 }), employmentStatus: mysqlEnum("employmentStatus", ["Activo", "En licencia", "Inactivo"]).default("Activo").notNull(), publicProfile: boolean("publicProfile").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const documents = mysqlTable("documents", {
  id: int("id").autoincrement().primaryKey(), vehicleId: int("vehicleId").notNull(), type: varchar("type", { length: 80 }).notNull(), documentNumber: varchar("documentNumber", { length: 80 }),
  issuedAt: date("issuedAt"), expiresAt: date("expiresAt"), fileUrl: text("fileUrl"), status: mysqlEnum("status", ["Vigente", "Próximo a vencer", "Vencido", "Pendiente"]).default("Pendiente").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const inspections = mysqlTable("inspections", {
  id: int("id").autoincrement().primaryKey(), vehicleId: int("vehicleId").notNull(), inspectionDate: date("inspectionDate").notNull(), nextDate: date("nextDate"), result: varchar("result", { length: 80 }), notes: text("notes"), inspector: varchar("inspector", { length: 160 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const maintenances = mysqlTable("maintenances", {
  id: int("id").autoincrement().primaryKey(), vehicleId: int("vehicleId").notNull(), type: mysqlEnum("type", ["Preventivo", "Correctivo", "Inspección general"]).notNull(),
  performedAt: date("performedAt"), nextDate: date("nextDate"), nextMileage: int("nextMileage"), description: text("description").notNull(), responsible: varchar("responsible", { length: 160 }), cost: decimal("cost", { precision: 12, scale: 2 }),
  status: mysqlEnum("status", ["Programado", "En progreso", "Realizado", "Atrasado"]).default("Programado").notNull(), observations: text("observations"), createdAt: timestamp("createdAt").defaultNow().notNull(), updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const incidents = mysqlTable("incidents", {
  id: int("id").autoincrement().primaryKey(), vehicleId: int("vehicleId").notNull(), reportedBy: int("reportedBy"), reportedAt: timestamp("reportedAt").defaultNow().notNull(), description: text("description").notNull(), priority: mysqlEnum("priority", ["Baja", "Media", "Alta", "Crítica"]).default("Media").notNull(), photoUrl: text("photoUrl"), status: mysqlEnum("status", ["Reportada", "En revisión", "Resuelta"]).default("Reportada").notNull(),
});

export const assignments = mysqlTable("assignments", {
  id: int("id").autoincrement().primaryKey(), vehicleId: int("vehicleId").notNull(), driverId: int("driverId").notNull(), assignedAt: date("assignedAt").notNull(), endedAt: date("endedAt"), status: mysqlEnum("status", ["Activa", "Finalizada"]).default("Activa").notNull(),
});

export const passengerReviews = mysqlTable("passengerReviews", {
  id: int("id").autoincrement().primaryKey(), vehicleId: int("vehicleId").notNull(), driverId: int("driverId"), rating: int("rating").notNull(), comment: text("comment"), reviewedAt: timestamp("reviewedAt").defaultNow().notNull(), moderationStatus: mysqlEnum("moderationStatus", ["Pendiente", "Publicada", "Rechazada"]).default("Pendiente").notNull(),
});

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(), companyId: int("companyId").notNull(), type: varchar("type", { length: 50 }).notNull(), title: varchar("title", { length: 180 }).notNull(), detail: text("detail"), readAt: timestamp("readAt"), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const activityLog = mysqlTable("activityLog", {
  id: int("id").autoincrement().primaryKey(), companyId: int("companyId").notNull(), userId: int("userId"), entity: varchar("entity", { length: 50 }).notNull(), entityId: int("entityId"), action: varchar("action", { length: 50 }).notNull(), detail: text("detail"), createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Vehicle = typeof vehicles.$inferSelect;
export type Driver = typeof drivers.$inferSelect;
export type Maintenance = typeof maintenances.$inferSelect;
