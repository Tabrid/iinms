// routes/farmerRoutes.js
import express from "express";
import {
  createFarmer,
  getFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
  getFarmersByRole,
  getStatsBySaaoId,
  getUserStats
} from "../controllers/registedUserController.js";

const router = express.Router();

router.post("/farmers", createFarmer);
router.get("/farmers", getFarmers);
router.get("/farmers/:id", getFarmerById);
router.put("/farmers/:id", updateFarmer);
router.delete("/farmers/:id", deleteFarmer);
router.get('/farmers/role/:role', getFarmersByRole); // New route
router.get('/farmers/stats/:saaoId', getStatsBySaaoId); // New route
router.get('/user-stats', getUserStats); // New route

export default router;
