const pool = require("../config/database")

// Get all medicines
exports.getAllMedicines = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const [medicines] = await connection.query("SELECT * FROM medicines")
    connection.release()
    res.json(medicines)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch medicines", error: error.message })
  }
}

// Add medicine
exports.addMedicine = async (req, res) => {
  try {
    const { name, generic_name, batch_number, expiry_date, quantity, unit_price, supplier_id } = req.body
    const connection = await pool.getConnection()

    await connection.query(
      "INSERT INTO medicines (name, generic_name, batch_number, expiry_date, quantity, unit_price, supplier_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
      [name, generic_name, batch_number, expiry_date, quantity, unit_price, supplier_id],
    )

    connection.release()
    res.status(201).json({ message: "Medicine added successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to add medicine", error: error.message })
  }
}

// Update medicine
exports.updateMedicine = async (req, res) => {
  try {
    const { id } = req.params
    const { name, generic_name, quantity, unit_price } = req.body
    const connection = await pool.getConnection()

    await connection.query(
      "UPDATE medicines SET name = ?, generic_name = ?, quantity = ?, unit_price = ? WHERE id = ?",
      [name, generic_name, quantity, unit_price, id],
    )

    connection.release()
    res.json({ message: "Medicine updated successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to update medicine", error: error.message })
  }
}

// Delete medicine
exports.deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params
    const connection = await pool.getConnection()

    await connection.query("DELETE FROM medicines WHERE id = ?", [id])

    connection.release()
    res.json({ message: "Medicine deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete medicine", error: error.message })
  }
}

// Get low stock medicines
exports.getLowStockMedicines = async (req, res) => {
  try {
    const { threshold } = req.query
    const connection = await pool.getConnection()

    const [medicines] = await connection.query("SELECT * FROM medicines WHERE quantity <= ?", [threshold || 10])

    connection.release()
    res.json(medicines)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch low stock medicines", error: error.message })
  }
}

// Record prescription dispensing
exports.dispenseMedicine = async (req, res) => {
  try {
    const { prescription_id, medicine_id, quantity_dispensed, dispensed_by } = req.body
    const connection = await pool.getConnection()

    // Update medicine quantity
    await connection.query("UPDATE medicines SET quantity = quantity - ? WHERE id = ?", [
      quantity_dispensed,
      medicine_id,
    ])

    // Record dispensing
    await connection.query(
      "INSERT INTO dispensing_records (prescription_id, medicine_id, quantity_dispensed, dispensed_by, dispensed_at) VALUES (?, ?, ?, ?, NOW())",
      [prescription_id, medicine_id, quantity_dispensed, dispensed_by],
    )

    connection.release()
    res.status(201).json({ message: "Medicine dispensed successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to dispense medicine", error: error.message })
  }
}
