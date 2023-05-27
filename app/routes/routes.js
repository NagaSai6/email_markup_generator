const express = require('express');
const router = express.Router();


const markupGenerator = require('../controllers/markupGenerator.js')

router.get('/',markupGenerator.renderInputForm);

router.post('/form-data',markupGenerator.handleFormData);


module.exports = router;