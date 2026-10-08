import express from "express";
import { getAllListings, getListingId, getListingsType} from "../controllers/listingsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, getAllListings);
router.get("/property-type/:type", authMiddleware, getListingsType);
router.get("/:id", getListingId);

export default router;
