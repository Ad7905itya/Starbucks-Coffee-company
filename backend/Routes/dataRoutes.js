import { getCollection } from "../connectDB/connectDb.js";

const collectionMap = {
  banner: "banner",
  barista: "barista",
  "barista-products": "barista-products",
  "dine-in-takeaway": "dine-in-takeaway",
  footer: "footer",
  giftcards: "giftcards",
  handcraft: "handcraft",
  profile: "profile",
  rewards: "rewards",
  "search-options": "search-options",
};

export const getData = async (req, res) => {
  const dataset = req.params.dataset;
  const collectionName = collectionMap[dataset];

  if (!collectionName) {
    return res.status(404).json({ success: false, message: "Dataset not found" });
  }

  try {
    const Model = getCollection(collectionName);
    const data = await Model.find({});

    return res.status(200).json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    console.error("Error fetching data for", dataset, error);
    return res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: error.message,
    });
  }
};
