import { findAllListings, findListingById, findListingsByType} from "../data/listingsData.js";

export const getListings = async (page, pageSize) => {
    return await findAllListings(page, pageSize);
}

export const getListingById = async (id) => {
    return await findListingById(id);
}

export const getListingsByType = async (type) => {
    return await findListingsByType(type);
}
