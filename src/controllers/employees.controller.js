import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (error) {
    // Response with status 500 Internal Server Error.
    return res.status(500).json({ message: "Something goes wrong." });
  }
};

export const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    // If no Employee founded send Status and Error Message.
    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found." });
    }

    // Response with Employee JSON.
    res.json(rows[0]);
  } catch (error) {
    // Response with status 500 Internal Server Error.
    return res.status(500).json({ message: "Something goes wrong." });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?,?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (error) {
    // Response with status 500 Internal Server Error.
    return res.status(500).json({ message: "Something goes wrong." });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    // IFNULL(a, b) statement sirve para solo cambiar los valores nuevos. Permite actualizar parcialmente.
    const result = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    // If no Employee founded send Status and Error Message.
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "Employee not found." });
    }

    // Get query to obtein the updated Employee.
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    // Response with Employee JSON.
    res.json(rows[0]);
  } catch (error) {
    // Response with status 500 Internal Server Error.
    return res.status(500).json({ message: "Something goes wrong." });
  }
};

export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [
      id,
    ]);

    // If no Employee founded send Status and Error Message.
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found." });
    }

    // Response with status 204 No Content.
    res.sendStatus(204);
  } catch (error) {
    // Response with status 500 Internal Server Error.
    return res.status(500).json({ message: "Something goes wrong." });
  }
};
