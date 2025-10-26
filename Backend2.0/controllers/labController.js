const pool = require("../config/database")

// Get all test requests
exports.getAllTestRequests = async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const [requests] = await connection.query(
      `SELECT t.*, p.id as patient_id, d.id as doctor_id, u1.name as patient_name, u2.name as doctor_name 
       FROM test_requests t 
       JOIN patients p ON t.patient_id = p.id 
       JOIN doctors d ON t.doctor_id = d.id 
       JOIN users u1 ON p.user_id = u1.id 
       JOIN users u2 ON d.user_id = u2.id`,
    )
    connection.release()
    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch test requests", error: error.message })
  }
}

// Create test request
exports.createTestRequest = async (req, res) => {
  try {
    const { patient_id, doctor_id, test_type, description } = req.body
    const connection = await pool.getConnection()

    await connection.query(
      "INSERT INTO test_requests (patient_id, doctor_id, test_type, description, status, created_at) VALUES (?, ?, ?, ?, ?, NOW())",
      [patient_id, doctor_id, test_type, description, "pending"],
    )

    connection.release()
    res.status(201).json({ message: "Test request created successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to create test request", error: error.message })
  }
}

// Update test status
exports.updateTestStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const connection = await pool.getConnection()

    await connection.query("UPDATE test_requests SET status = ? WHERE id = ?", [status, id])

    connection.release()
    res.json({ message: "Test status updated successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to update test status", error: error.message })
  }
}

// Upload lab report
exports.uploadLabReport = async (req, res) => {
  try {
    const { test_request_id, report_data, report_file_path } = req.body
    const connection = await pool.getConnection()

    await connection.query(
      "INSERT INTO lab_reports (test_request_id, report_data, report_file_path, created_at) VALUES (?, ?, ?, NOW())",
      [test_request_id, report_data, report_file_path],
    )

    // Update test status to completed
    await connection.query("UPDATE test_requests SET status = ? WHERE id = ?", ["completed", test_request_id])

    connection.release()
    res.status(201).json({ message: "Lab report uploaded successfully" })
  } catch (error) {
    res.status(500).json({ message: "Failed to upload lab report", error: error.message })
  }
}

// Get lab report
exports.getLabReport = async (req, res) => {
  try {
    const { test_request_id } = req.params
    const connection = await pool.getConnection()

    const [reports] = await connection.query("SELECT * FROM lab_reports WHERE test_request_id = ?", [test_request_id])

    if (reports.length === 0) {
      connection.release()
      return res.status(404).json({ message: "Lab report not found" })
    }

    connection.release()
    res.json(reports[0])
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lab report", error: error.message })
  }
}
