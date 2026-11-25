CREATE TABLE `activityLog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`userId` int,
	`entity` varchar(50) NOT NULL,
	`entityId` int,
	`action` varchar(50) NOT NULL,
	`detail` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activityLog_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `assignments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vehicleId` int NOT NULL,
	`driverId` int NOT NULL,
	`assignedAt` date NOT NULL,
	`endedAt` date,
	`status` enum('Activa','Finalizada') NOT NULL DEFAULT 'Activa',
	CONSTRAINT `assignments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(180) NOT NULL,
	`nit` varchar(40),
	`contactEmail` varchar(320),
	`contactPhone` varchar(40),
	`city` varchar(100),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vehicleId` int NOT NULL,
	`type` varchar(80) NOT NULL,
	`documentNumber` varchar(80),
	`issuedAt` date,
	`expiresAt` date,
	`fileUrl` text,
	`status` enum('Vigente','Próximo a vencer','Vencido','Pendiente') NOT NULL DEFAULT 'Pendiente',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `documents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `drivers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`name` varchar(160) NOT NULL,
	`initials` varchar(4),
	`identificationType` varchar(30),
	`identificationNumber` varchar(40),
	`licenseNumber` varchar(40) NOT NULL,
	`licenseCategory` varchar(15),
	`licenseExpiry` date,
	`experienceYears` int NOT NULL DEFAULT 0,
	`phone` varchar(40),
	`email` varchar(320),
	`employmentStatus` enum('Activo','En licencia','Inactivo') NOT NULL DEFAULT 'Activo',
	`publicProfile` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `drivers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `incidents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vehicleId` int NOT NULL,
	`reportedBy` int,
	`reportedAt` timestamp NOT NULL DEFAULT (now()),
	`description` text NOT NULL,
	`priority` enum('Baja','Media','Alta','Crítica') NOT NULL DEFAULT 'Media',
	`photoUrl` text,
	`status` enum('Reportada','En revisión','Resuelta') NOT NULL DEFAULT 'Reportada',
	CONSTRAINT `incidents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inspections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vehicleId` int NOT NULL,
	`inspectionDate` date NOT NULL,
	`nextDate` date,
	`result` varchar(80),
	`notes` text,
	`inspector` varchar(160),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `inspections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `maintenances` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vehicleId` int NOT NULL,
	`type` enum('Preventivo','Correctivo','Inspección general') NOT NULL,
	`performedAt` date,
	`nextDate` date,
	`nextMileage` int,
	`description` text NOT NULL,
	`responsible` varchar(160),
	`cost` decimal(12,2),
	`status` enum('Programado','En progreso','Realizado','Atrasado') NOT NULL DEFAULT 'Programado',
	`observations` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `maintenances_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`type` varchar(50) NOT NULL,
	`title` varchar(180) NOT NULL,
	`detail` text,
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `passengerReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`vehicleId` int NOT NULL,
	`driverId` int,
	`rating` int NOT NULL,
	`comment` text,
	`reviewedAt` timestamp NOT NULL DEFAULT (now()),
	`moderationStatus` enum('Pendiente','Publicada','Rechazada') NOT NULL DEFAULT 'Pendiente',
	CONSTRAINT `passengerReviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`plate` varchar(16) NOT NULL,
	`brand` varchar(80) NOT NULL,
	`model` varchar(80) NOT NULL,
	`year` int NOT NULL,
	`type` varchar(50) NOT NULL,
	`vin` varchar(64) NOT NULL,
	`mileage` int NOT NULL DEFAULT 0,
	`capacity` int NOT NULL,
	`qrCode` varchar(80) NOT NULL,
	`status` enum('Operativo','En mantenimiento','Revisión requerida') NOT NULL DEFAULT 'Operativo',
	`publicVisible` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `vehicles_id` PRIMARY KEY(`id`),
	CONSTRAINT `vehicles_plate_unique` UNIQUE(`plate`),
	CONSTRAINT `vehicles_vin_unique` UNIQUE(`vin`),
	CONSTRAINT `vehicles_qrCode_unique` UNIQUE(`qrCode`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','admin','maintenance','driver') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `companyId` int;