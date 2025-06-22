const express = require('express');
const router = express.Router();
const CIController = require('../controllers/ciController');


router.post('/', CIController.create);
router.put('/:id', CIController.update);
router.delete('/:id', CIController.remove);
router.get('/:id', CIController.getById);
router.post('/:id/relate', CIController.relate);
router.get('/:id/relations', CIController.getRelations);
router.get('/:id/changes', CIController.getChangeHistory);
router.get('/', CIController.filter);


module.exports = router;
