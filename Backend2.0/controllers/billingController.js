const pool = require("../config/database")

// Create invoice
exports.createInvoice = async (req, res) => {
  try {
    const { patient_id, amount, description, due_date } = req.body
    const connection = await pool.getConnection()

    const [result] = await connection.query(
      "INSERT INTO invoices (patient_id, amount, description, due_date, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [patient_id, amount, description, due_date, "pending"],
    )

    connection.release()
    res.status(201).json({ message: "Invoice created successfully", invoice_id: result.insertId })
  } catch (error) {
    res.status(500).json({ message: "Failed to create invoice", error: error.message })
  }
}

// Get invoices
exports.getInvoices = async (req, res) => {
  try {
    const { patient_id } = req.query
    const connection = await pool.getConnection()

    let query =
      "SELECT i.*, u.name as patient_name FROM invoices i JOIN patients p ON i.patient_id = p.id JOIN users u ON p.user_id = u.id"
    const params = []

    if (patient_id) {
      query += " WHERE i.patient_id = ?"
      params.push(patient_id)
    }

    const [invoices] = await connection.query(query, params)
    connection.release()
    res.json(invoices)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invoices", error: error.message })
  }
}

// Record payment
exports.recordPayment = async (req, res) => {
  try {
    const { invoice_id, amount_paid, payment_method } = req.body
    const connection = await pool.getConnection()

    await connection.query(
      "INSERT INTO payments (invoice_id, amount_paid, payment_method, payment_date) VALUES (?, ?, ?, NOW())",
      [invoice_id, amount_paid, payment_method],
    )

    // Update invoice status
    await connection.query("UPDATE invoices SET status = ? WHERE id = ?", ["paid", invoice_id])

    connection.release()
    res.status(201).json({ message: "Payment recorded successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to record payment", error: error.message })
  }
}

// Get billing summary
exports.getBillingSummary = async (req, res) => {
  try {
    const connection = await pool.getConnection()

    const [summary] = await connection.query(
      `SELECT 
        COUNT(*) as total_invoices,
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) as total_paid,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as total_pending,
        SUM(amount) as total_amount
       FROM invoices`,
    )

    connection.release()
    res.json(summary[0])
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch billing summary", error: error.message })
  }
}
