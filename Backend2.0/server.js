const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const patientRoutes = require("./routes/patients")
const appointmentRoutes = require("./routes/appointments")
const doctorRoutes = require("./routes/doctors")
const pharmacyRoutes = require("./routes/pharmacy")
const labRoutes = require("./routes/lab")
const billingRoutes = require("./routes/billing")

const errorHandler = require("./middleware/errorHandler")

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/patients", patientRoutes)
app.use("/api/appointments", appointmentRoutes)
app.use("/api/doctors", doctorRoutes)
app.use("/api/pharmacy", pharmacyRoutes)
app.use("/api/lab", labRoutes)
app.use("/api/billing", billingRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" })
})

// Error handling
app.use(errorHandler)

// Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✓ Server running on port ${PORT}`)
})
