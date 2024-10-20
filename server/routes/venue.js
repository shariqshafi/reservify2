var express = require('express');
const { addVenue, fetchVenues, addSubVenue, getSubVenes, getAllVenues, getAllSubVenues } =  require("../controllers/venueController")
const router = express.Router()

router.route("/add-venue").post(addVenue)
router.route("/fetch-venues/:userId").get(fetchVenues)
router.route("/add-subVenue/:venueId").post(addSubVenue)
router.route("/get-subVenues/:venueId").get(getSubVenes)
router.route("/get-venues").get(getAllVenues)
router.route("/get-subVenues/:venueId").get(getAllSubVenues)
module.exports = router;