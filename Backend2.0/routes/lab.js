const express = require("express")
const labController = require("../controllers/labController")
const { authMiddleware } = require("../middleware/auth")

const router = express.Router()

router.use(authMiddleware)

router.get("/", labController.getAllTestRequests)
router.post("/", labController.createTestRequest)
router.patch("/:id/status", labController.updateTestStatus)
router.post("/report/upload", labController.uploadLabReport)
router.get("/report/:test_request_id", labController.getLabReport)

module.exports = router
