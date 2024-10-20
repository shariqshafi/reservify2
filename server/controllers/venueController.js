const venueModel = require("../models/venueModel.js");
const subVenueModel = require("../models/subVenueModel.js");

const addVenue = async (req, res) => {
  const { venueName, venueAddress, venueType, userId } = req.body;

  // Check if all required fields are provided
  if (!venueName || !venueAddress || !venueType || !userId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newVenue = await venueModel.create({
      name: venueName,
      address: venueAddress,
      venueType,
      userId,
    });

    res.status(201).json({ message: "Venue Added Successfully", newVenue });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding venue", error: error.message });
  }
};

const fetchVenues = async (req, res) => {
  const { userId } = req.params;
  const venues = await venueModel.find({ userId });
  res.status(200).json({ venues });
};

const addSubVenue = async (req, res) => {
  const { venueName, venueAddress, venueType, venueCapacity, outsideEventsAllowed } = req.body; 
  const { venueId } = req.params; 

  // Log the received data
  console.log(req.body); 

  // Validate required fields
  if (!venueName || !venueAddress || !venueType || !venueId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newVenue = await subVenueModel.create({
      name: venueName,
      address: venueAddress,
      type: venueType,
      capacity: venueCapacity,
      outsideEventsAllowed: outsideEventsAllowed || false,
      venueId,
    });

    res.status(201).json({ message: "Venue Added Successfully", newVenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding venue", error: error.message });
  }
};

  
const getSubVenes = async (req,res) => {
  const {venueId} = req.params
  const subVenues = await subVenueModel.find({ venueId })
  console.log(subVenues);
  
  res.status(200).json({"message":"success",subVenues})
}

const getAllVenues = async (req, res) => {
  try {
    // Fetch all venues and populate subVenues if defined in the Venue schema
    // const venues = await venueModel.find().populate('subVenues');
    const venues = await venueModel.find()

    // const detailedVenues = await Promise.all(venues.map(async (venue) => {
    //   const subVenues = await subVenueModel.find({ venueId: venue._id });
    //   return {
    //     ...venue.toObject(),
    //     subVenues,
    //   };
    // }));

    res.status(200).json(venues);
  } catch (error) {
    console.error("Error fetching venues:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
const getAllSubVenues = async (req, res) => {
  try {
    const {venueId} =  req.params
    const subVenues = await subVenueModel.find({venueId})

    res.status(200).json(subVenues);
  } catch (error) {
    console.error("Error fetching venues:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  addVenue,
  fetchVenues,
  addSubVenue,
  getSubVenes,
  getAllVenues,
  getAllSubVenues
};
