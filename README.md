## Inicialización del Proyecto

Para poner en marcha el proyecto, sigue estos pasos:

### 1. Clonar el Repositorio

Si aún no lo has hecho, clona el repositorio en tu máquina local:

 
- **git clone https://github.com/FabianEmp18/ProT4_42097752.git** 


O descargar, recordar que al descargar se debe eliminar la extensión .zip.

### 2. Descargar dependencias

npm install


### 3. Inicializar el servidor: 

node src/index.js


### 4. Verificar el Funcionamiento

Una vez que el servidor esté en marcha, deberías ver un mensaje en la consola indicando que se está ejecutando en el puerto 5000 y ya se podría probar en POSTMAN u otro de preferencia.

-------------------------------------------------------------------------------------------------------------------

# API de Gestión de Libros

## Endpoints

### 1. Obtener Todos los Libros
- **Método:** `GET`
- **URL:** `http://localhost:5000/libros`
- **Descripción:** Obtiene una lista de todos los libros en la base de datos.

### 2. Obtener un Libro por ID
- **Método:** `GET`
- **URL:** `http://localhost:5000/libro/:id` "ejemplo": http://localhost:5000/libro/:2 
- **Parámetro en la URL:** `id` (ID del libro, debe ser un número entero)
- **Descripción:** Obtiene un libro específico por su ID.

### 3. Obtener un Libro por Parámetro de Consulta
- **Método:** `GET`
- **URL:** `http://localhost:5000/libro/id` "ejemplo": http://localhost:5000/libro/1 
- **Parámetro en el Cuerpo:** 
  ```json
  {
    "id": 2
  }


### Obtener un libro específico usando el ID enviado en el cuerpo de la solicitud.
4. Agregar un Nuevo Libro
Método: POST
URL: http://localhost:5000/libro
Ejemplo: http://localhost:5000/libro
Cuerpo de la Solicitud:

{
  "id": 3,
  "nombre": "Nuevo Libro",
  "autor": "Autor Ejemplo",
  "categoria": "Categoría Ejemplo",
  "ano_publicacion": "2023-01-01",
  "isbn": "9781234567890"
}

### Agrega un nuevo libro a la base de datos.
5. Actualizar un Libro Existente
Método: PUT
URL: http://localhost:5000/libro
Ejemplo: http://localhost:5000/libro
Cuerpo de la Solicitud:

{
  "id": 2,
  "nombre": "Libro Actualizado",
  "autor": "Autor Actualizado",
  "categoria": "Categoría Actualizada",
  "ano_publicacion": "2024-01-01",
  "isbn": "9780987654321"
}


###  Actualiza los detalles de un libro existente.
6. Eliminar un Libro por ISBN
Método: DELETE
URL: http://localhost:5000/libro/:isbn
Ejemplo: http://localhost:5000/libro/9781234567890
Parámetro en la URL: isbn (ISBN del libro a eliminar)

### Elimina un libro específico usando el ISBN.

7. Eliminar un Libro por Parámetro de Consulta
Método: DELETE
URL: http://localhost:5000/libro
Ejemplo: http://localhost:5000/libro
Cuerpo de la Solicitud:ejemplo
{
  "isbn": "isbn"
}

`libros` (`id`, `nombre`, `autor`, `categoria`, `ano_publicacion`, `isbn`) VALUES
(1, 'La Sombra del Viento', 'Carlos Ruiz Zafón', 'Novela', '2001-10-15', '9788408170594'),
(2, 'Cien Años de Soledad', 'Gabriel García Márquez', 'Realismo Mágico', '1967-06-05', '9780307474728'),
(3, '1984', 'George Orwell', 'Distopía', '1949-06-08', '9780451524935'),
(4, 'Matar a un Ruiseñor', 'Harper Lee', 'Ficción', '1960-07-11', '9780060935467'),
(5, 'Orgullo y Prejuicio', 'Jane Austen', 'Romántico', '1813-01-28', '9780486284736');