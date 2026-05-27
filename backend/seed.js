import dotenv from "dotenv";
import { getCollection } from "./connectDB/connectDb.js";
import { banner } from "../frontend/src/Data/Banner.js";
import { BaristaData } from "../frontend/src/Data/BaristaData.js";
import { DineIn_Takeaway } from "../frontend/src/Data/DineIn_Takeaway.js";
import { footerData } from "../frontend/src/Data/FooterData.js";
import { GiftCardData } from "../frontend/src/Data/GiftCardData.js";
import { HandCraftData } from "../frontend/src/Data/HandCraftData.js";
import { ProfileData } from "../frontend/src/Data/ProfileData.js";
import { RewardsData } from "../frontend/src/Data/RewardsData.js";
import { options } from "../frontend/src/Data/SearchOptions.js";

dotenv.config();

const seedItems = [
  { collection: "banner", data: banner },
  { collection: "barista", data: BaristaData },
  { collection: "dine-in-takeaway", data: DineIn_Takeaway },
  { collection: "footer", data: footerData },
  { collection: "giftcards", data: GiftCardData },
  { collection: "handcraft", data: HandCraftData },
  { collection: "profile", data: ProfileData },
  { collection: "rewards", data: RewardsData },
  { collection: "search-options", data: options },
];

const seed = async () => {
  for (const item of seedItems) {
    const Model = getCollection(item.collection);
    await Model.deleteMany({});
    if (item.data && item.data.length) {
      await Model.insertMany(item.data);
    }
    console.log(`Seeded ${item.collection}: ${item.data?.length ?? 0}`);
  }
  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
