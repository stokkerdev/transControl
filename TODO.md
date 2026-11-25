# TODO — TransControl

## 1. Identidad visual, navegación y superficies públicas

- [ ] La plataforma está completamente en español y usa la identidad TransControl con azul oscuro, azul eléctrico, blanco, grises claros, bordes ligeramente redondeados, sombras sutiles, iconografía consistente y tipografía legible.
- [ ] La aplicación es responsive en computador, tablet y teléfono.
- [ ] Existe una landing comercial en `/` con hero, problema, solución, funcionalidades, cómo funciona, beneficios, llamado a la acción y footer con logo, navegación, contacto demo y derechos reservados.
- [ ] Existe `/login` con inicio de sesión real usando Manus OAuth y una indicación clara de que la demo requiere acceso.
- [ ] Existe `/consulta/:codigo` como portal público independiente del panel y solo muestra información autorizada del vehículo, conductor, empresa y servicio.
- [ ] Existe `/manus-routes.json` con todas las rutas públicas, administrativas y dinámicas, sin incluir APIs ni assets.

## 2. Panel administrativo y acceso por roles

- [ ] Las rutas administrativas están protegidas por sesión y muestran navegación lateral, encabezado con logo, usuario, notificaciones, configuración y área principal dinámica.
- [ ] Se contemplan roles de administrador de empresa, personal de mantenimiento y conductor, con permisos de lectura y mutación coherentes.
- [ ] La información de una empresa queda aislada de otra y la información sensible del conductor no se expone en el portal público.

## 3. Dashboard principal

- [ ] `/dashboard` muestra KPIs de vehículos registrados, operativos, documentos próximos a vencer, documentos vencidos, mantenimientos pendientes y realizados, conductores registrados y activos.
- [ ] El dashboard muestra gráficos de vehículos por estado, mantenimientos por mes, vencimientos documentales y distribución por marca/modelo.
- [ ] El dashboard muestra alertas navegables de revisiones, seguros, documentos vencidos, mantenimientos programados, fallas y vehículos que requieren revisión.
- [ ] KPIs, gráficas y alertas se alimentan de registros persistentes y se actualizan después de mutaciones.

## 4. Vehículos y fichas técnicas

- [ ] `/vehiculos` muestra tabla con placa, marca, modelo, año, tipo, conductor, kilometraje, estado documental, estado técnico y estado operativo.
- [ ] El listado permite buscar por placa, filtrar por marca/modelo/estado, ordenar columnas, paginar y ejecutar visualizar, editar y eliminar.
- [ ] El registro/edición valida placa, VIN, año, kilometraje, capacidad, fechas, conductor y fotografía; eliminar exige confirmación.
- [ ] `/vehiculos/:id` contiene pestañas de información general, documentación, revisiones técnico-mecánicas, historial de mantenimiento, fallas, conductor asignado e historial de cambios.
- [ ] La ficha muestra línea de tiempo y estados verde, amarillo, rojo o gris basados en registros; el modelo/año no se usa como diagnóstico automático de seguridad.

## 5. Documentos y revisiones

- [ ] `/documentos` permite registrar, asociar, consultar, actualizar y filtrar documentos de revisión técnico-mecánica, SOAT, tarjeta de propiedad, pólizas y otros.
- [ ] Los documentos almacenan fechas de expedición y vencimiento, estado calculado por vigencia, historial y referencia a PDF/imagen cuando exista.
- [ ] Se generan alertas de 30, 15 y 7 días, además de vencidos, visibles en dashboard y módulo documental.

## 6. Mantenimientos y fallas

- [ ] `/mantenimientos` permite registrar mantenimientos preventivos, correctivos e inspecciones generales con vehículo, fechas, kilometraje, descripción, responsable, costo, observaciones, próxima fecha/kilometraje y estado.
- [ ] El módulo muestra programación, pendientes, realizados, vista calendario y tabla histórica por vehículo.
- [ ] Los conductores pueden registrar novedades/fallas con vehículo, fecha, descripción, prioridad, fotografía opcional y estado; estas aparecen en el panel administrativo.
- [ ] El estado de mantenimiento y fallas se puede actualizar y refleja alertas y KPIs relacionados.

## 7. Conductores y asignaciones

- [ ] `/conductores` muestra foto, nombre, licencia/categoría/vigencia, experiencia, estado y vehículo asignado; la identificación solo aparece para usuarios autorizados.
- [ ] El formulario de conductor cubre identidad, foto, licencia, vigencias, contacto, vinculación, experiencia y estado laboral con validaciones.
- [ ] `/conductores/:id` muestra información profesional, experiencia, licencias, historial de vehículos/asignaciones y evaluaciones públicas autorizadas sin datos sensibles.
- [ ] `/asignaciones` permite seleccionar vehículo/conductor, fecha de asignación y finalización, consultar activas e históricas y evita asignaciones duplicadas o contradictorias.

## 8. Portal público, QR y evaluaciones

- [ ] Cada vehículo demo tiene código único consultable por `/consulta/:codigo` y una representación QR utilizable en la interfaz.
- [ ] La consulta pública muestra placa, marca, modelo, año, foto, estado documental general, última revisión, foto/nombre/experiencia autorizada del conductor, vinculación, empresa y contacto oficial.
- [ ] El portal no muestra documentos privados, identificaciones, teléfonos personales, direcciones ni información administrativa interna.
- [ ] El pasajero puede calificar de 1 a 5 estrellas y enviar comentario opcional; las evaluaciones quedan como pendientes de moderación y no determinan automáticamente capacidad o seguridad.

## 9. Reportes, notificaciones y configuración

- [ ] `/reportes` incluye reportes generales de vehículos, documentación vencida/próxima, mantenimientos realizados/pendientes, fallas, conductores y asignaciones.
- [ ] Los reportes filtran por fechas, vehículos, conductores, estado y tipo de mantenimiento, y ofrecen exportación cuando sea posible.
- [ ] `/notificaciones` muestra alertas documentales, mantenimientos, fallas, próximas actividades y cambios importantes, con estado de lectura.
- [ ] `/configuracion` permite editar empresa, administrar usuarios, roles/permisos, parámetros de alertas, perfil y registros de actividad.

## 10. Datos, persistencia y entrega

- [ ] La base relacional contempla empresas, usuarios, roles, vehículos, documentos, revisiones, mantenimientos, fallas, conductores, asignaciones, evaluaciones, notificaciones e historial de actividad.
- [ ] Se cargan datos ficticios realistas relacionados: una empresa demo, entre 10 y 15 vehículos, entre 8 y 12 conductores, diferentes estados documentales, mantenimientos, fallas, asignaciones y evaluaciones.
- [ ] Las operaciones CRUD producen cambios reales en los datos demo y se reflejan en vistas relacionadas; las validaciones evitan duplicados y relaciones inconsistentes.
- [ ] La documentación de entrega indica las credenciales o método de acceso de demostración sin exponer secretos reales.
- [ ] `pnpm check`, `pnpm build`, migraciones, manifiesto de rutas y recorrido de los módulos quedan verificados antes del checkpoint.
