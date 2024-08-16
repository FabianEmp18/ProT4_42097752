import { pool } from "./database.js";

class LibroController { 
    async getAll(req, res) {
        try {
            const [rows] = await pool.query("SELECT * FROM libros");
            if (rows.length === 0) {
                return res.status(404).json({ message: "No hay libros en la base de datos" });
            }
            console.log('Trayendo todos los libros...');
            console.log('Libros recibidos:', rows);
            res.json(rows);
        } catch (error) {
            console.error('Error al recibir libros:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async getOneByPathname(req, res) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id) || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'El id debe ser un entero' });
            }
            const [rows] = await pool.query("SELECT * FROM libros WHERE id = ?", [id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: `No se encontró el libro con id ${id}` });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error('Error al recibir el libro:', error);
            res.status(500).json({ error: error.message });
        }
    }
    
    async getOneByQuery(req, res) {
        try {
            const id = parseInt(req.body.id);
            if (isNaN(id) || !Number.isInteger(id)) {
                return res.status(400).json({ message: 'El id debe ser un entero' });
            }
            const [rows] = await pool.query("SELECT * FROM libros WHERE id = ?", [id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: `No se encontró el libro con id ${id}` });
            }
            res.json(rows[0]);
        } catch (error) {
            console.error('Error al recibir el libro:', error);
            res.status(500).json({ error: error.message });
        }
    }
    
    async add(req, res) {
        try {
            const libro = req.body;
            const fields = ["nombre", "autor", "categoria", "ano_publicacion", "isbn"];
            const invalidFields = Object.keys(libro).filter(field => !fields.includes(field));
            if (invalidFields.length > 0) {
                return res.status(400).json({
                    message: `Los campos ${invalidFields.join(", ")} no son válidos. Los únicos permitidos son: ${fields.join(", ")}`
                });
            }

            if (Object.values(libro).some(value => !value || value.trim() === '')) {
                return res.status(400).json({ message: "No se permiten strings vacíos o con espacios en blanco" });
            }

            const [isbnRows] = await pool.query("SELECT * FROM libros WHERE ISBN = ?", [libro.isbn]);
            if (isbnRows.length > 0) {
                return res.status(400).json({ message: "El ISBN ya está registrado" });
            }

            const fecha = libro.ano_publicacion.split("T")[0];
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!regex.test(fecha)) {
                return res.status(400).json({ message: "El formato de la fecha es inválido. Debe ser 'aaaa-mm-dd'" });
            }
            const fechaActual = new Date();
            const fechaLibro = new Date(fecha);
            if (fechaLibro > fechaActual) {
                return res.status(400).json({ message: "La fecha del libro no puede ser posterior a la fecha actual" });
            }

            const [result] = await pool.query(
                "INSERT INTO libros (nombre, autor, categoria, ano_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)",
                [libro.nombre, libro.autor, libro.categoria, fecha, libro.isbn]
            );
            res.json({ id: result.insertId, ...libro });
        } catch (error) {
            console.error('Error al agregar libro:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const libro = req.body;
            const fields = ["id", "nombre", "autor", "categoria", "ano_publicacion", "isbn"];
            const invalidFields = Object.keys(libro).filter(field => !fields.includes(field));
            if (invalidFields.length > 0) {
                return res.status(400).json({
                    message: `Los campos ${invalidFields.join(", ")} no son válidos. Los únicos permitidos son: ${fields.join(", ")}`
                });
            }

            if (Object.values(libro).some(value => !value || value.trim() === '')) {
                return res.status(400).json({ message: "No se permiten strings vacíos o con espacios en blanco" });
            }

            const [rows] = await pool.query("SELECT * FROM libros WHERE isbn = ?", [libro.isbn]);
            if (rows.length === 0) {
                return res.status(400).json({ message: `El libro con ISBN ${libro.isbn} no existe` });
            }

            const fecha = libro.ano_publicacion.split("T")[0];
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!regex.test(fecha)) {
                return res.status(400).json({ message: "El formato de la fecha es inválido. Debe ser 'aaaa-mm-dd'" });
            }
            const fechaActual = new Date();
            const fechaLibro = new Date(fecha);
            if (fechaLibro > fechaActual) {
                return res.status(400).json({ message: "La fecha del libro no puede ser posterior a la fecha actual" });
            }

            const [result] = await pool.query(
                "UPDATE libros SET nombre = ?, autor = ?, categoria = ?, ano_publicacion = ? WHERE isbn = ?",
                [libro.nombre, libro.autor, libro.categoria, fecha, libro.isbn]
            );
            res.json({ "Registros actualizados": result.affectedRows });
        } catch (error) {
            console.error('Error al actualizar libro:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteByPath(req, res) {
        try {
            const isbn = req.params.isbn;
            const [rows] = await pool.query("SELECT * FROM libros WHERE isbn = ?", [isbn]);
            if (rows.length === 0) {
                return res.status(400).json({ message: `El libro con ISBN ${isbn} no existe` });
            }
            const [result] = await pool.query("DELETE FROM libros WHERE isbn = ?", [isbn]);
            res.json({ "Registros eliminados": result.affectedRows });
        } catch (error) {
            console.error('Error al eliminar libro:', error);
            res.status(500).json({ error: error.message });
        }
    }

    async deleteByQuery(req, res) {
        try {
            if (!req.body.isbn) {
                return res.status(400).json({ message: 'El campo isbn debe estar presente en el body' });
            }
            const isbn = req.body.isbn;
            const [rows] = await pool.query("SELECT * FROM libros WHERE isbn = ?", [isbn]);
            if (rows.length === 0) {
                return res.status(400).json({ message: `El libro con ISBN ${isbn} no existe` });
            }
            const [result] = await pool.query("DELETE FROM libros WHERE isbn = ?", [isbn]);
            res.json({ "Registros eliminados": result.affectedRows });
        } catch (error) {
            console.error('Error al eliminar libro:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

export const libro = new LibroController();
