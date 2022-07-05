const express = require('express');
const router = express.Router();
//const ctrlMain = require('../controllers/main');
const ctrlLocations = require('../controllers/locations');
const ctrlOthers = require('../controllers/others');

/* Locations pages */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);
router
    .route('/location/:locationid/review/new')
    .get(ctrlLocations.addReview)
    .post(ctrlLocations.doAddReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

/* GET home page. */
//router.get('/',ctrlMain.index);

module.exports = router;
