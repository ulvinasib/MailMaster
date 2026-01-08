
const express = require('express');
const router = express.Router();
const TemplateController = require('../controller/templateController.js');



router.post('/', TemplateController.create);
router.get('/', TemplateController.getAll);
router.put('/:id', TemplateController.update);

module.exports = router;