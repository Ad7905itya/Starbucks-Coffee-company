import { Handcraft } from "../connectDB/connectDb.js";

export const getHandcraft = async (req, res) => {
    try {
        const handcraftCuration = await Handcraft.find({});

        if (!handcraftCuration || handcraftCuration.length === 0) {
            return res.status(404).json({ message: "No handcraft data found" });
        }

        res.status(200).json({
            success: true,
            data: handcraftCuration,
            count: handcraftCuration.length
        });
    } catch (err) {
        console.error("Error fetching handcraft data:", err);
        res.status(500).json({
            success: false,
            message: "Error fetching handcraft data",
            error: err.message
        });
    }
};
