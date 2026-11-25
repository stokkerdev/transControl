# Plan de implementación — TransControl

## Alcance y enfoque

TransControl es un MVP local-first para apoyar la gestión preventiva de empresas de transporte público. Tiene dos superficies relacionadas pero separadas: un panel administrativo protegido por una sesión demo local y un portal público de consulta por código QR.

La operación nueva no depende de una base de datos: vehículos, conductores, mantenimientos y asignaciones se gestionan en React y se persisten en `localStorage`. El starter conserva Express, tRPC, Drizzle/MySQL y su esquema heredado para no romper la base del proyecto, pero esas dependencias no participan en las mutaciones locales del MVP.

El recorrido cubre landing, login con correo y contraseña demo, dashboard, CRUD local de vehículos y conductores, mantenimientos, asignaciones, ficha de vehículo, QR y portal público `/consulta/:codigo`. El acceso administrativo requiere sesión local; el portal público no requiere autenticación.

## Arquitectura y estructura

- `client/src/App.tsx`: enrutamiento, sesión demo, estado centralizado y mutaciones locales de vehículos, conductores, mantenimientos, asignaciones y consulta QR.
- `client/src/pages/`: páginas y superficies de landing, login, dashboard, vehículos, mantenimientos, conductores, asignaciones, reportes, notificaciones, configuración y consulta pública.
- `client/src/components/`: shell administrativo, navegación, tarjetas, tablas, estados, modales y formularios.
- `client/src/lib/demoData.ts`: tipos, datos demo iniciales y helpers `loadCollection`/`saveCollection` para `localStorage`.
- `client/public/manus-routes.json`: manifiesto de rutas públicas, administrativas y dinámicas.
- `client/public/transcontrol-logo.png`: logo oficial de la marca.
- `server/`, `drizzle/`: starter heredado; se mantienen disponibles, pero no son la fuente de verdad de la operación local-first.

Las colecciones operativas usan las claves `transcontrol:vehicles`, `transcontrol:drivers`, `transcontrol:maintenances` y `transcontrol:session`. El estado se centraliza en `App` para que una mutación se refleje en fichas, dashboard, mantenimientos, conductores, asignaciones y consulta QR sin duplicar estado interno.

## Reglas de producto local-first

- Un vehículo se crea localmente con placa, tipo, marca, modelo, año, capacidad, kilometraje y VIN.
- Un conductor se crea localmente con licencia, categoría, vencimiento, experiencia, teléfono y correo.
- Un mantenimiento se programa, filtra, actualiza y elimina localmente.
- Una asignación vincula un conductor con un vehículo, evita duplicidades y sincroniza `vehicle.driver` con `driver.vehicle`; seleccionar “Sin asignar” retira el vínculo.
- Recargar el navegador conserva los cambios del mismo equipo. No existe sincronización entre dispositivos ni respaldo remoto en este alcance.

## Flujo QR y privacidad

Cada vehículo recibe un código como `TC-TCT042`. El administrador genera desde la ficha un QR que contiene una URL como `/consulta/TC-TCT042`, y puede copiarla o abrirla. El pasajero escanea el código y accede sin login a un portal independiente.

La consulta pública solo expone datos autorizados para pasajeros: identificación pública del vehículo, estado general, empresa, información profesional permitida del conductor asignado y contacto oficial. Nunca expone documentos privados, identificaciones, teléfonos personales, correos privados, direcciones ni datos administrativos. Como los datos son locales, un QR abierto en otro dispositivo no puede leer automáticamente el `localStorage` del administrador; la sincronización multi-dispositivo queda como evolución posterior mediante API, sincronización o base de datos.

## Diseño visual

### Dirección elegida: “Centro de control azul eléctrico”

- **Movimiento:** SaaS operativo inspirado en paneles de control de flota, con superficie clara, sidebar grafito y acentos azul eléctrico.
- **Principios:** lectura rápida, estados visibles sin depender solo del color, densidad empresarial cómoda y acciones cercanas al registro.
- **Paleta:** `#0066FF` como firma de TransControl; `#1E232A` para navegación y encabezados; fondos `#F5F7FA`; superficies blancas; verde/ámbar/rojo/gris para estados.
- **Layout:** shell con navegación lateral persistente en escritorio y adaptación responsive en pantallas pequeñas; páginas con encabezado contextual, acción primaria y tablas operativas.
- **Elementos distintivos:** logo oficial, chips semaforizados, tarjetas KPI, fichas de vehículo y modal QR con enlace copiable.
- **Interacción:** formularios locales con validación, actualización inmediata, confirmación al eliminar y navegación pública QR sin login.
- **Animación:** transiciones cortas para sidebar, modales, tabs y estados; sin movimiento decorativo en tablas.
- **Tipografía:** Inter o equivalente sans-serif legible; títulos compactos, KPIs grandes y etiquetas de alto contraste.
- **Esencia de marca:** control preventivo para empresas de transporte que necesitan convertir documentos, mantenimientos y asignaciones en decisiones trazables. Personalidad: clara, responsable y operativa.
- **Voz:** directa y preventiva. Ejemplos: “Revisa antes de que venza” y “Consulta autorizada para pasajeros”.

## Datos demo y límites

Los datos iniciales incluyen 12 vehículos, 10 conductores, mantenimientos y asignaciones relacionadas. La antigüedad, marca o modelo no determina automáticamente seguridad o inseguridad. Los indicadores dependen de registros documentales, técnicos y de mantenimiento; cualquier habilitación o retiro corresponde a personal competente. El portal público no muestra información sensible.

## Estado de implementación

1. **Base navegable y marca:** completada.
2. **Operación de flota local:** completada para vehículos, conductores, mantenimientos y asignaciones.
3. **QR público:** completado con generación local mediante `qrcode`, enlace copiable y ruta sin login.
4. **Validación:** `pnpm check`, `pnpm build` y `git diff --check` deben ejecutarse antes de la entrega.
5. **Evolución futura:** autenticación real, sincronización multi-dispositivo, respaldo remoto y persistencia de servidor, si el producto deja de ser estrictamente local-first.

## Flujo de desarrollo

El proyecto se ejecuta desde `/home/ubuntu/transctrl` con `pnpm dev` en el puerto 3000. Antes de cualquier entrega se revisan diagnósticos TypeScript, build, manifiesto de rutas y estado del diff. El remoto canónico del proyecto y el remoto GitHub del usuario se mantienen separados; un commit o push solo se realiza cuando el usuario lo solicita explícitamente.
