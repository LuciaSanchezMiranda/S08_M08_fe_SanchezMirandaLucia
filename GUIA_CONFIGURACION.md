# 📱 Guía de Configuración - Sistema de Solicitud de Citas

## 🔧 Configuración de la URL del Backend

El servicio Angular se conecta a tu backend Spring Boot. Debes configurar la URL correctamente en el archivo:

**Archivo:** `src/app/services/solicitud-cita.service.ts`

```typescript
private apiUrl = 'http://localhost:8080/api/solicitudes';
```

### Cambiar la URL según tu entorno:

- **Desarrollo local:** `http://localhost:8080/api/solicitudes`
- **Servidor de prueba:** `http://tu-servidor:puerto/api/solicitudes`
- **Producción:** `https://tu-dominio.com/api/solicitudes`

---

## 🌐 Configuración de CORS en el Backend

Para que Angular pueda comunicarse con tu Spring Boot, debes permitir CORS. Asegúrate de que tu controlador `SolicitudCitaRest` tenga:

```java
@CrossOrigin(origins = "*")  // Permite acceso desde cualquier origen
@RestController
@RequestMapping("/api/solicitudes")
public class SolicitudCitaRest { ... }
```

O configura CORS globalmente en tu proyecto Spring Boot:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200", "tu-dominio.com"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

---

## 📋 Estructura de la Solicitud de Cita

El formulario envía los siguientes datos al backend:

```json
{
  "nombreCompleto": "Juan Pérez",
  "correo": "juan@correo.com",
  "telefono": "+51 999 999 999",
  "nombreMascota": "Rocky",
  "servicio": "Consulta Veterinaria",
  "mensaje": "Mi perro tiene dolor en la pata",
  "estado": "Pendiente",
  "fechaCreacion": "2024-04-24T15:30:00"
}
```

---

## 🎯 Cómo Usar la Aplicación

### 1️⃣ Página de Inicio
- Accede a `http://localhost:4200`
- Verás todos los servicios de la empresa
- Desplázate hasta la sección "Agenda una cita para tu mascota"

### 2️⃣ Crear una Solicitud de Cita
- Completa el formulario con:
  - ✅ Nombre completo
  - ✅ Correo electrónico
  - ✅ Teléfono
  - ✅ Nombre de la mascota
  - ✅ Servicio requerido
  - ✅ Mensaje con detalles
- Haz clic en "Enviar solicitud"
- Verás un mensaje de confirmación si se envió correctamente

### 3️⃣ Acceder al CRUD de Solicitudes
Hay dos formas:

**Opción A:** Desde el formulario
- Haz clic en el botón rojo "Ver todas mis solicitudes"

**Opción B:** Directamente
- Accede a `http://localhost:4200/crud`

### 4️⃣ Gestionar Solicitudes (CRUD)

#### 🔍 Ver Detalles
- Haz clic en el botón azul de "ojo" en cualquier solicitud
- Se abrirá un modal con todos los detalles

#### ✏️ Editar
- Haz clic en el botón naranja de "lápiz"
- Modifica los campos que necesites
- Haz clic en "Guardar"

#### 🗑️ Eliminar (Soft Delete)
- Haz clic en el botón rojo de "papelera"
- Confirma la acción
- La solicitud se marcará como eliminada (no se borra de la BD)

#### 🔄 Restaurar
- Las solicitudes eliminadas aparecen con opacidad reducida
- Haz clic en el botón verde de "restaurar"
- La solicitud volverá a aparecer como activa

#### 🔎 Buscar y Filtrar
- **Búsqueda:** Escribe en el campo de búsqueda para filtrar por:
  - Nombre de mascota
  - Nombre del propietario
  - Correo electrónico
- **Filtro por Estado:** Selecciona un estado para ver solo esas solicitudes

---

## 🚀 Iniciar el Proyecto

### 1. Backend (Spring Boot)
```bash
cd tu-proyecto-backend
mvn spring-boot:run
```

El backend debe estar corriendo en `http://localhost:8080`

### 2. Frontend (Angular)
```bash
cd tu-proyecto-angular
npm install  # Solo la primera vez
ng serve
```

El frontend estará disponible en `http://localhost:4200`

---

## 📊 Flujo de Datos

```
┌─────────────────┐
│  Formulario     │  Usuario completa y envía
│  (Home page)    │
└────────┬────────┘
         │
         │ POST /api/solicitudes
         │
         ▼
┌─────────────────┐
│  Backend        │  Spring Boot guarda en BD
│  (Spring)       │
└────────┬────────┘
         │
         │ Confirmación
         │
         ▼
┌─────────────────┐
│  CRUD Panel     │  Angular muestra listado
│  (/crud)        │  y permite editar/eliminar
└─────────────────┘
```

---

## ⚠️ Posibles Problemas y Soluciones

### Error: "Failed to connect to localhost:8080"
**Solución:** Asegúrate de que el backend está corriendo en el puerto 8080

### Error: "CORS policy blocked"
**Solución:** Configura CORS en tu Spring Boot (ver sección anterior)

### Error: "No se cargaron las solicitudes"
**Solución:** Verifica que la URL del API sea correcta en el servicio

### Error: "Solicitud no encontrada"
**Solución:** Asegúrate de que el ID existe en la BD

---

## 📝 Notas Importantes

- ✅ Las eliminaciones son **soft deletes** (no se borran de la BD)
- ✅ Se pueden restaurar solicitudes eliminadas
- ✅ Los formularios tienen validación en el cliente
- ✅ El backend maneja validación adicional
- ✅ Las timestamps se registran automáticamente

---

## 🎨 Personalización

### Cambiar estilos
- Colores: Busca en los archivos `.css` de los componentes
- Servicios: Actualiza el array en `Contact.ts`

### Cambiar campos del formulario
1. Abre `contact.ts`
2. Modifica la validación en `this.fb.group()`
3. Abre `contact.html` y ajusta el formulario

---

## 📞 Datos de Contacto
Para más ayuda, contacta al equipo de desarrollo.

**Última actualización:** 24/04/2024
