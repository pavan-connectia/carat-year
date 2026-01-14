import cron from "node-cron";
import { User } from "../models/User";
import { Wishlist } from "../models/Wishlist";
import { Address } from "../models/Address";
import { Cart } from "../models/Cart";

cron.schedule("0 0 * * *", async () => {
  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

  const usersToDelete = await User.find({
    isDeleted: true,
    deletedAt: { $lte: cutoff },
  });

  for (const user of usersToDelete) {
    await Promise.all([
      Wishlist.deleteMany({ userId: user._id }),
      Address.deleteMany({ userId: user._id }),
      Cart.deleteMany({ userId: user._id }),
      User.findByIdAndDelete(user._id),
    ]);
  }

  console.log(`${usersToDelete.length} user(s) permanently deleted`);
});
