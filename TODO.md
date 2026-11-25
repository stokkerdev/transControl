# TODO — TransControl

## 1. Identidad visual, navegación y superficies públicas

- [ ] La plataforma está completamente en español y usa la identidad TransControl con azul oscuro, azul eléctrico, blanco, grises claros, bordes ligeramente redondeados, sombras sutiles, iconografía consistente y tipografía legible.
- [ ] La aplicación es responsive en computador, tablet y teléfono.
- [ ] Existe una landing comercial en `/` con hero, problema, solución, funcionalidades, cómo funciona, beneficios, llamado a la acción y footer con logo, navegación, contacto demo y derechos reservados.
- [x] Existe `/login` con campos de correo electrónico y contraseña, validación de credenciales demo y una indicación clara de que el acceso administra la flota de la empresa.
- [x] Existe `/consulta/:codigo` como portal público independiente del panel y solo muestra información autorizada del vehículo, conductor, empresa y servicio.
- [x] Existe `/manus-routes.json` con todas las rutas públicas, administrativas y dinámicas, sin incluir APIs ni assets.

## 2. Panel administrativo y acceso por roles

- [x] Las rutas administrativas están protegidas por sesión demo local y muestran navegación lateral, encabezado con logo, usuario, notificaciones, configuración y área principal dinámica.
- [ ] Se contemplan roles de administrador de empresa, personal de mantenimiento y conductor, con permisos de lectura y mutación coherentes.
- [ ] La información de una empresa queda aislada de otra y la información sensible del conductor no se expone en el portal público.

## 3. Dashboard principal

- [x] `/dashboard` muestra KPIs de vehículos registrados, operativos, documentos próximos a vencer, documentos vencidos, mantenimientos pendientes y realizados, conductores registrados y activos.
- [x] El dashboard muestra gráficos de vehículos por estado, mantenimientos por mes, vencimientos documentales y distribución por marca/modelo.
- [x] El dashboard muestra alertas navegables de revisiones, seguros, documentos vencidos, mantenimientos programados, fallas y vehículos que requieren revisión.
- [x] KPIs, gráficas y alertas se alimentan de registros locales y se actualizan después de mutaciones compatibles con el MVP.

## 4. Vehículos y fichas técnicas

- [x] `/vehiculos` muestra tabla con placa, marca, modelo, año, tipo, conductor, kilometraje, estado documental, estado técnico y estado operativo.
- [x] El listado permite buscar por placa, marca o conductor y ejecutar visualizar y eliminar; los filtros avanzados, ordenamiento y paginación quedan como evolución.
- [x] El registro local valida y conserva placa, VIN, año, kilometraje, capacidad, tipo, marca, modelo y conductor; eliminar exige confirmación.
- [x] La ficha local muestra información general, documentos, mantenimiento, asignación actual y acceso al QR público.
- [x] La ficha muestra estados verde, amarillo, rojo o gris basados en registros; el modelo/año no se usa como diagnóstico automático de seguridad.

## 5. Documentos y revisiones

- [ ] `/documentos` permite registrar, asociar, consultar, actualizar y filtrar documentos de revisión técnico-mecánica, SOAT, tarjeta de propiedad, pólizas y otros.
- [ ] Los documentos almacenan fechas de expedición y vencimiento, estado calculado por vigencia, historial y referencia a PDF/imagen cuando exista.
- [ ] Se generan alertas de 30, 15 y 7 días, además de vencidos, visibles en dashboard y módulo documental.

## 6. Mantenimientos y fallas

- [x] `/mantenimientos` permite registrar localmente actividades preventivas, correctivas e inspecciones generales con vehículo, fecha, descripción, responsable, costo y estado.
- [x] El módulo muestra agenda, contadores de pendientes/realizados y tabla histórica local con filtros Todas, Pendientes y Realizadas.
- [ ] Los conductores pueden registrar novedades/fallas con vehículo, fecha, descripción, prioridad, fotografía opcional y estado; estas aparecen en el panel administrativo.
- [x] El estado de mantenimiento se puede actualizar y los registros se pueden eliminar localmente; los cambios sobreviven a la recarga del navegador.

## 7. Conductores y asignaciones

- [x] `/conductores` muestra nombre, licencia/categoría/vigencia, experiencia, estado y vehículo asignado; los datos privados quedan fuera del portal público.
- [x] El formulario local de conductor cubre nombre, licencia, categoría, vencimiento, experiencia, teléfono y correo.
- [ ] `/conductores/:id` muestra información profesional completa, historial de vehículos/asignaciones y evaluaciones públicas autorizadas sin datos sensibles.
- [x] `/asignaciones` permite seleccionar vehículo y conductor o “Sin asignar”; evita asignaciones duplicadas, sincroniza ambos lados y conserva el resultado en `localStorage`.

## 8. Portal público, QR y evaluaciones

- [x] Cada vehículo tiene código único consultable por `/consulta/:codigo` y una representación QR real generada en la interfaz con `qrcode`.
- [x] Desde la ficha del vehículo, el administrador puede generar el QR, copiar el enlace `/consulta/:codigo` y abrir la consulta pública.
- [x] La consulta pública muestra únicamente placa, vehículo, estado general, empresa, datos profesionales autorizados del conductor y canal oficial disponible.
- [x] El portal no muestra documentos privados, identificaciones, teléfonos personales, direcciones ni información administrativa interna.
- [ ] El pasajero puede calificar de 1 a 5 estrellas y enviar comentario opcional; las evaluaciones quedan como pendientes de moderación y no determinan automáticamente capacidad o seguridad.
- [x] La documentación explica que el pasajero consulta sin iniciar sesión y que el `localStorage` no se sincroniza automáticamente entre dispositivos.

## 9. Reportes, notificaciones y configuración

- [ ] `/reportes` incluye reportes generales de vehículos, documentación vencida/próxima, mantenimientos realizados/pendientes, fallas, conductores y asignaciones.
- [ ] Los reportes filtran por fechas, vehículos, conductores, estado y tipo de mantenimiento, y ofrecen exportación cuando sea posible.
- [ ] `/notificaciones` muestra alertas documentales, mantenimientos, fallas, próximas actividades y cambios importantes, con estado de lectura.
- [ ] `/configuracion` permite editar empresa, administrar usuarios, roles/permisos, parámetros de alertas, perfil y registros de actividad.

## 10. Datos locales, persistencia y entrega

- [x] Los flujos de creación y gestión de vehículos, conductores, mantenimientos y asignaciones no dependen de una base de datos y usan `localStorage` en el navegador.
- [x] Las claves locales operativas son `transcontrol:vehicles`, `transcontrol:drivers`, `transcontrol:maintenances` y `transcontrol:session`.
- [x] Se cargan datos ficticios realistas relacionados: una empresa demo, 12 vehículos, 10 conductores, diferentes estados documentales, mantenimientos y asignaciones.
- [x] Las mutaciones locales producen cambios visibles en vistas relacionadas y evitan duplicidades o relaciones contradictorias de conductor–vehículo.
- [x] La documentación indica credenciales demo, el alcance sin base de datos, la persistencia por navegador y la limitación de no sincronizar entre dispositivos.
- [ ] Crear commit y push al remoto canónico y al repositorio GitHub del usuario cuando el usuario lo solicite explícitamente.
- [x] `pnpm check`, `pnpm build`, `git diff --check` y el manifiesto de rutas quedan verificados antes del checkpoint.
