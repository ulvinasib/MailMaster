
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.js');
const TemplateController = require('../controller/templateController.js');


router.use(authenticate);
router.post('/', TemplateController.create);
router.delete("/:id", TemplateController.delete);
router.patch("/:id", TemplateController.update)
router.get('/', TemplateController.getAll);
router.put('/:id', TemplateController.update);

module.exports = router;