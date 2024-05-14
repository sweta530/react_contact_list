const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contact.controller')

//category routes for admin
router.post('/contact', contactController.add)
router.put('/contact/:id', contactController.update)
router.delete('/contact/:id', contactController.delete)
router.get('/contact/:id', contactController.get)
router.get('/contact', contactController.getall)

module.exports = router
