# TransControl

Aplicación web local-first para la gestión operativa de una flota de transporte público. El MVP permite administrar vehículos, conductores, mantenimientos y asignaciones desde el navegador, sin depender de una base de datos para esas operaciones.

## Comandos

- `pnpm dev`: servidor de desarrollo; respeta `PORT` (por defecto 3000).
- `pnpm build` / `pnpm start`: compilar y servir la aplicación.
- `pnpm check`: comprobación de tipos TypeScript.
- `pnpm test`: pruebas disponibles del proyecto.
- `git diff --check`: detectar errores de espacios en el diff.

El starter conserva Express, tRPC y Drizzle/MySQL heredados, junto con `drizzle/schema.ts` y sus migraciones, pero los flujos operativos de este MVP no leen ni escriben esa base de datos. La fuente de verdad de vehículos, conductores, mantenimientos y asignaciones es el `localStorage` del navegador.

## Acceso demo

Abre `/login` y usa:

- Correo: `admin@transcontrol.demo`
- Contraseña: `TransControl2026!`

La sesión de demostración también se conserva localmente en el navegador.

## Gestión local-first

Desde el panel autenticado:

- `/vehiculos` permite registrar vehículos con placa, tipo, marca, modelo, año, capacidad, kilometraje y VIN. También permite consultar su ficha, eliminar registros y generar su QR.
- `/conductores` permite registrar conductores con licencia, categoría, vencimiento, experiencia, teléfono y correo.
- `/mantenimientos` permite programar actividades, filtrarlas por estado, cambiar su estado y eliminarlas.
- `/asignaciones` permite vincular o desvincular un conductor de un vehículo. La aplicación evita que un conductor quede asignado a dos vehículos y mantiene sincronizados ambos registros.

Las colecciones se guardan en estas claves locales: `transcontrol:vehicles`, `transcontrol:drivers`, `transcontrol:maintenances` y `transcontrol:session`. Por diseño, los cambios permanecen en el navegador y equipo donde se realizaron; no se sincronizan automáticamente con otros dispositivos ni constituyen un respaldo remoto. Limpiar los datos del sitio elimina la información local.

## Flujo QR y consulta de pasajeros

Cada vehículo tiene un código corto, por ejemplo `TC-TCT042`. Desde la ficha del vehículo, el administrador puede abrir **Ver QR público**, copiar el enlace o abrir la consulta. El QR contiene una URL relativa como `/consulta/TC-TCT042`.

El pasajero escanea el código con la cámara del teléfono y entra directamente a `/consulta/:codigo`, sin iniciar sesión. El portal público toma el código, busca el vehículo en los datos disponibles del navegador y muestra únicamente la información autorizada para pasajeros: identificación pública del vehículo, estado general, empresa, datos profesionales permitidos del conductor asignado y canal oficial de contacto. No muestra documentos privados, identificaciones, teléfonos personales, correos privados, direcciones ni información administrativa.

En una instalación completamente local, la consulta pública debe abrirse en el mismo origen y contexto donde estén disponibles los datos locales. Si el QR se escanea desde otro teléfono o dispositivo, ese dispositivo no comparte automáticamente el `localStorage` del administrador; para operar entre dispositivos se necesitaría posteriormente una API, sincronización o base de datos, algo que queda fuera del alcance actual.

## Recorrido recomendado

1. Inicia sesión en `/login`.
2. Registra un vehículo y un conductor.
3. Programa un mantenimiento.
4. Asigna el conductor al vehículo.
5. Recarga la página para comprobar que los cambios sobreviven.
6. Abre la ficha del vehículo, genera el QR y entra a la consulta pública.

El portal `/consulta/TC-TCT042` es público y no requiere login. Las evaluaciones de pasajeros, cuando están disponibles en el demo, quedan pendientes de moderación.

## Rutas y configuración

El manifiesto de páginas está en `client/public/manus-routes.json`. La configuración de Preview se declara mediante `webdev.config`. El logo oficial se encuentra en `client/public/transcontrol-logo.png` y su metadata en `app.config.ts`.

TransControl es una herramienta de apoyo a la gestión y prevención. No diagnostica automáticamente la seguridad mecánica ni certifica la habilitación de un vehículo; esas decisiones corresponden a personal competente y a las autoridades pertinentes.
