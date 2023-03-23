import { type Shop } from "@prisma/client";
import ShopItem from "./ShopItem";

type ShopsListProps = {
  shops: Shop[] | undefined;
};

const ShopsList = ({ shops }: ShopsListProps) => {
  return (
    <section className="space-y-12">
      {shops?.map((shop) => (
        <ShopItem key={shop.id} shop={shop} />
      ))}
    </section>
  );
};

export default ShopsList;
