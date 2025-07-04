// controllers/farmerController.js
import Farmer from "../models/RegistedUser.js";
import sequelize from "../config/db.js";
import { Op } from "sequelize";

// Create a new farmer
export const createFarmer = async (req, res) => {
  try {
    const { mobileNumber } = req.body;

    const existingFarmer = await Farmer.findOne({ where: { mobileNumber } });
    if (existingFarmer) {
      return res.status(400).json({ message: "Farmer with this mobile number already exists." });
    }

    // Create new farmer
    const farmer = await Farmer.create(req.body);
    res.status(201).json(farmer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all farmers
export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.findAll();
    res.status(200).json(farmers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a farmer by ID
export const getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findByPk(req.params.id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.status(200).json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a farmer
export const updateFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findByPk(req.params.id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    await farmer.update(req.body);
    res.status(200).json(farmer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a farmer
export const deleteFarmer = async (req, res) => {
  try {
    const farmer = await Farmer.findByPk(req.params.id);
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    await farmer.destroy();
    res.status(200).json({ message: "Farmer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getFarmersByRole = async (req, res) => {
  try {
    const { saaoId, search } = req.query;
    const { role } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const offset = (page - 1) * limit;
    const parsedLimit = parseInt(limit, 10);

    const whereClause = { role };

    if (saaoId && saaoId !== "null") {
      whereClause.saaoId = parseInt(saaoId, 10);
    }

    if (search) {
      whereClause[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { mobileNumber: { [Op.like]: `%${search}%` } },
        { block: { [Op.like]: `%${search}%` } },
        { village: { [Op.like]: `%${search}%` } },
        { district: { [Op.like]: `%${search}%` } },
        { upazila: { [Op.like]: `%${search}%` } },
      ];
    }

    const farmers = await Farmer.findAll({
      where: whereClause,
      limit: parsedLimit,
      offset: offset,
    });

    if (farmers.length === 0) {
      return res.status(200).json({
        data: [],
        pagination: {
          currentPage: 0,
          totalPages: 0,
          totalFarmers: 0,
          limit: parsedLimit,
        },
      });
    }

    const totalFarmers = await Farmer.count({ where: whereClause });
    const totalPages = Math.ceil(totalFarmers / parsedLimit);

    res.status(200).json({
      data: farmers,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalFarmers,
        limit: parsedLimit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStatsBySaaoId = async (req, res) => {
  try {
    const { saaoId } = req.params;

    // Check if saaoId is provided
    if (!saaoId) {
      return res.status(400).json({ error: 'saaoId is required' });
    }

    // Query the database to get the total count of entries per day for the given saaoId
    const stats = await Farmer.findAll({
      where: {
        saaoId: saaoId,
      },
      attributes: [
        [sequelize.fn('DATE', sequelize.col('createdAt')), 'date'], // Extract date from createdAt
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalEntries'], // Count the number of records
      ],
      group: [sequelize.fn('DATE', sequelize.col('createdAt'))], // Group by the date part of createdAt
      order: [[sequelize.fn('DATE', sequelize.col('createdAt')), 'ASC']], // Order by date ascending
    });

    // If no records found, return an empty array
    if (!stats.length) {
      return res.status(404).json({ message: 'No data found for the provided saaoId.' });
    }

    // Return the stats in the response
    return res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'An error occurred while fetching stats.' });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const today = new Date();
    const last7Days = new Date();
    last7Days.setDate(today.getDate() - 7);

    // Count registrations
    const totalRegistration = await Farmer.count();

    const newRegistration = await Farmer.count({
      where: {
        createdAt: {
          [Op.gte]: last7Days,
        },
      },
    });

    const totalSAAO = await Farmer.count({
      where: { role: "SAAO" },
    });

    const activeSAAO = await Farmer.count({
      where: {
        saaoId: {
          [Op.ne]: null,
        },
      },
      distinct: true,
      col: 'saaoId',
    });

    const totalFarmer = await Farmer.count({
      where: { role: "farmer" },
    });

    const totalUAO = await Farmer.count({
      where: { role: "UAO" },
    });
    const totalJournalists = await Farmer.count({
      where: { role: "Journalists" },
    });

    const totalDD = await Farmer.count({
      where: { role: "Admin" },
    });

    res.status(200).json({
      totalRegistration,
      newRegistration,
      totalSAAO,
      activeSAAO,
      totalFarmer,
      totalUAO,
      totalDD,
      totalFeedback: 0,
      totalJournalists
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};