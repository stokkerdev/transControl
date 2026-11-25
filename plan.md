# Plan de implementación — TransControl

## Alcance y enfoque

TransControl será un MVP SaaS navegable para apoyar la gestión preventiva de empresas de transporte público. La aplicación tendrá dos superficies relacionadas pero separadas: una experiencia pública comercial y de consulta por código, y un panel administrativo protegido para administrar la operación. El MVP usará datos ficticios realistas y persistentes en la base de datos administrada, con seed idempotente para que reinicios o despliegues no sobrescriban cambios posteriores.

La primera versión cubrirá el recorrido de demostración completo: landing, login con Manus OAuth, dashboard, CRUD de vehículos y conductores, documentación y alertas, mantenimientos, asignaciones, reportes, notificaciones, configuración básica, ficha detallada de vehículo, perfil de conductor y portal público `/consulta/:codigo` con evaluación moderada. Todos los datos que se muestran en tarjetas, tablas y gráficas saldrán de la misma capa de datos para que las operaciones produzcan cambios visibles entre módulos.

## Arquitectura y estructura

- `client/src/App.tsx`: enrutamiento público y administrativo, con rutas dinámicas y fallback 404.
- `client/src/pages/`: landing, login, dashboard, vehículos, detalle de vehículo, documentos, mantenimientos, conductores, detalle de conductor, asignaciones, reportes, notificaciones, configuración y consulta pública.
- `client/src/components/`: shell administrativo, navegación lateral responsive, encabezado, tarjetas KPI, estados, tablas, modales y formularios reutilizables.
- `client/src/lib/`: cliente tRPC, datos de presentación y utilidades de formato/exportación.
- `server/routers.ts`: procedimientos tRPC públicos y protegidos para dashboard, vehículos, documentos, mantenimientos, conductores, asignaciones, fallas, evaluaciones y configuración.
- `server/db.ts`: consultas tipadas, seed idempotente y operaciones de persistencia.
- `drizzle/schema.ts`: entidades relacionales de empresa, usuarios, vehículos, documentos, revisiones, mantenimientos, fallas, conductores, asignaciones, evaluaciones, notificaciones y actividad.
- `drizzle/`: migraciones aditivas y reproducibles.
- `public/manus-routes.json`: manifiesto de rutas completo para Preview.

Se conservará la autenticación Manus OAuth del starter y el nombre de cookie `webdev_app_session`. Las rutas de administración requerirán sesión; la ruta pública de consulta solo expondrá campos autorizados. Los roles de administrador, mantenimiento y conductor se almacenarán en la aplicación y limitarán mutaciones y datos sensibles.

## Diseño visual

### Dirección elegida: “Centro de control azul eléctrico”

- **Movimiento:** SaaS operativo inspirado en paneles de control de flota, con una superficie clara, sidebar grafito y acentos azul eléctrico.
- **Principios:** lectura rápida, estados visibles sin depender solo del color, densidad empresarial cómoda y acciones cercanas al registro que modifican.
- **Paleta:** `#0066FF` como firma de TransControl; `#1E232A` para navegación y encabezados; fondos `#F5F7FA`; superficies blancas; verde/ámbar/rojo/gris para estados documentales y técnicos. El azul comunica control y confianza; los estados se reservan para alertas accionables.
- **Layout:** shell de aplicación con navegación lateral persistente en escritorio y drawer en móvil; páginas con encabezado contextual, acciones primarias alineadas a la derecha, bloques de información y tablas de seguimiento.
- **Elementos distintivos:** marca con isotipo de ruta/escudo basada en el logo oficial disponible en el mockup; chips semaforizados; tarjetas KPI con barra lateral de color; línea de tiempo en fichas.
- **Interacción:** acciones CRUD abren formularios en modal o panel lateral, validan campos, muestran toast de éxito/error y actualizan la consulta asociada sin recargar toda la aplicación. Eliminar exige confirmación.
- **Animación:** transiciones cortas para sidebar, modales, tabs y estados; evitar movimiento decorativo en tablas y dashboard.
- **Tipografía:** Inter o equivalente sans-serif legible; títulos de página compactos, KPIs grandes y etiquetas de tabla de alto contraste.
- **Esencia de marca:** control preventivo para empresas de transporte que necesitan convertir documentos, mantenimientos y asignaciones en decisiones trazables. Personalidad: clara, responsable y operativa.
- **Voz:** directa y preventiva. Ejemplos: “Revisa antes de que venza” y “La habilitación depende de la inspección competente, no solo del dato del vehículo”.

### Datos y reglas de producto

Los datos demo incluirán 12 vehículos, 10 conductores, documentos vigentes/próximos/vencidos, mantenimientos pendientes/realizados, fallas y asignaciones consistentes. La antigüedad, marca o modelo no determinará automáticamente seguridad o inseguridad. Los indicadores de riesgo dependerán de documentos, inspecciones, mantenimientos y fallas registradas; cualquier habilitación o retiro quedará descrito como decisión de personal competente. El portal público no mostrará identificación, teléfono, correo privado, documentos internos ni información administrativa.

## Fases de implementación

1. **Base navegable y marca:** limpiar starter, crear tema visual, shell responsive, landing, login, rutas, manifiesto y datos demo iniciales.
2. **Operación de flota:** dashboard con KPIs/gráficas/alertas, listado y CRUD de vehículos, ficha con pestañas y timeline.
3. **Control técnico:** documentos/revisiones, alertas de vencimiento, mantenimientos, calendario, fallas y actualización de estados.
4. **Personas y relaciones:** conductores, perfiles, asignaciones con validación de duplicados e historial.
5. **Transparencia y análisis:** consulta pública por QR, evaluaciones moderadas, reportes filtrables/exportables, notificaciones y configuración.
6. **Validación y entrega:** typecheck, build, verificación de rutas y recorrido responsive en Preview; checkpoint en `origin/main` del repositorio canónico cuando la versión esté lista.

## Flujo de desarrollo y entrega

El proceso se ejecutará desde `/home/ubuntu/transctrl`. El servidor se declarará mediante `webdev.config` en `runtime/dev-commands`, escuchando en el puerto 3000, y se verificará mediante `/api/health` y las rutas de aplicación. Las migraciones se generarán con Drizzle y se aplicarán de forma aditiva. Antes del checkpoint se comprobarán diagnósticos TypeScript, build y el manifiesto de rutas. No se publicará automáticamente porque la configuración actual mantiene `auto_publish: false`; el checkpoint se guardará en el repositorio canónico del proyecto una vez concluida la implementación.
