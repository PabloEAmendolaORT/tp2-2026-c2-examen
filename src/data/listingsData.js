import { getDb } from "./connection.js";

export async function findAllListings(page, pageSize) {
    const db = getDb();
    if (page && pageSize) {
        const skip = (page - 1) * pageSize;
        const listings = await db.collection("listingsAndReviews")
            .find()
            .skip(skip)
            .limit(pageSize)
            .toArray();
        return listings;
    } else {
        // Sin paginación: trae todos los documentos
        const listings = await db.collection("listingsAndReviews").find().toArray();
        return listings;
    }
}

export async function findListingById(id) {
    const db = getDb();
    const listing = await db.collection("listingsAndReviews").findOne({ _id: id });
    console.log(listing);
    return listing;
}

export async function findListingsByType(type) {
    const db = getDb();
    const listings = await db.collection("listingsAndReviews").find({property_type: type }).toArray();
    return listings;
}

export async function findListingsWithTotalPrice() {
    const db = getDb();
    const listings = await db.collection("listingsAndReviews").aggregate([
        {
            $addFields : {
                totalPrice: {
                    $add : ["$price", { $ifNull: ["$cleaning_fee", 0] }, { $ifNull: ["$security_deposit", 0] }, { $ifNull: ["$extra_people", 0] }]
                }
            }
        }
    ]).toArray();
    return listings;
}
