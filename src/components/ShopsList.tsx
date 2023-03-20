import { type Shop } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import useStore from "../store/useStore";
import { distance } from "../utils/closest";
import ShopItem from "./ShopItem";

type ShopsListProps = {
  shops: Shop[];
};

const ShopsList = ({ shops }: ShopsListProps) => {
  return (
    <section className="space-y-12">
      {shops.map((shop) => (
        <ShopItem key={shop.id} shop={shop} />
      ))}
    </section>
  );
};

export default ShopsList;
