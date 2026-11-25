# TransControl

React / Express / tRPC / Drizzle starter, adapted from the Sandbox web-db-user template.

- `pnpm dev`: development server; honors `PORT` (default 3000).
- `pnpm build` / `pnpm start`: build and serve `dist/index.js` and `dist/public/`.
- `pnpm db:migrate`: apply checked-in migrations. `pnpm db:push`: generate and apply new schema changes.
- `pnpm check` / `pnpm test`: types and application tests.

Start with the Webdev skill's default-template guide. Platform login, storage, payments and service contracts live in its shared references; read the relevant capability before extending its helper.

`server/_core/publicConfig.ts` exposes only named public runtime values. Private keys stay server-side. The platform serves managed `/manus-storage/` assets; the application does not register a second proxy.

Platform configuration is readable and editable through `webdev.config`. Default settings are initial values, not enforced constraints. The agent may modify the files, commands and configuration or follow the flexible guide for another stack.

## Acceso demo

Abre `/login` y selecciona **Transportes Andinos S.A.S. — Administrador · Datos de demostración**. Este acceso carga una sesión demo local para recorrer el panel sin credenciales reales. El botón **Iniciar con cuenta Manus** conserva el flujo OAuth del starter para una integración autenticada real.

## Recorrido recomendado

Desde el dashboard puedes revisar KPIs, alertas y mantenimientos. En `/vehiculos` puedes buscar por placa, abrir la ficha rápida, registrar un vehículo y eliminarlo con confirmación. `/conductores` y `/mantenimientos` tienen formularios y cambios de estado que persisten en el navegador durante la demo. `/consulta/TC-TCT042` muestra el portal público asociado al QR de un vehículo, sin datos privados, e incluye una calificación pendiente de moderación.

## Datos y arquitectura

El frontend usa React, TypeScript, Wouter, Tailwind CSS y Lucide. El starter mantiene Express, tRPC, Manus OAuth y Drizzle ORM. `drizzle/schema.ts` contiene empresas, usuarios, vehículos, conductores, documentos, inspecciones, mantenimientos, fallas, asignaciones, evaluaciones, notificaciones y actividad; la migración inicial está en `drizzle/0001_charming_proemial_gods.sql`. Los datos de presentación son realistas y relacionados, y se conservan en `localStorage` para que el MVP sea recorrible aun sin cargar una sesión administrativa.

TransControl es una herramienta de apoyo a la gestión y prevención. No diagnostica automáticamente la seguridad mecánica ni certifica la habilitación de un vehículo; esas decisiones corresponden a personal competente y a las autoridades pertinentes.

## Comandos

```bash
pnpm check
pnpm build
pnpm db:push
```

El runtime de Preview se declara en `webdev.config` con `pnpm dev` en el puerto 3000. El manifiesto de páginas está en `client/public/manus-routes.json`.
