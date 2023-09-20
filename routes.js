const express = require('express');
const imgupload = require('./Routes/imgupload.js');
const slotbook = require('./Routes/slotbook.js');
const router = express.Router();


router.route('/imgupload').post(imgupload.img_upload);
router.route('/updateImage').post(imgupload.update_image);
router.route('/getImage').get(imgupload.get_image);

router.route('/slotbook').get(slotbook.create_update_slot);


module.exports = router;