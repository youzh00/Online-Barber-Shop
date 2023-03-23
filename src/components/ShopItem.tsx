import { type Shop } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import useStore from "../store/useStore";
import { distance } from "../utils/closest";

type Props = {
  shop: Shop;
};

const shopHaircuts = [
  {
    id: "sdf56456sdf56sdf56sdf",
    name: "haircut",
    price: 100,
    estimatedTime: 30,
    shopId: "sdf56456sdf56sdf56sdf",
  },
  {
    id: "sdf56456sdf56sdf56sdf",
    name: "haircut for men",
    price: 100,
    estimatedTime: 30,
    shopId: "sdf56456sdf56sdf56sdf",
  },
  {
    id: "sdf56456sdf56sdf56sdf",
    name: "haircut for women",
    price: 100,
    estimatedTime: 30,
    shopId: "sdf56456sdf56sdf56sdf",
  },
  {
    id: "sdf56456sdf56sdf56sdf",
    name: "haircut for kids",
    price: 100,
    estimatedTime: 30,
    shopId: "sdf56456sdf56sdf56sdf",
  },
];

const ShopItem = ({ shop }: Props) => {
  const { city, ...coords } = useStore((state) => state.location);
  // const { data: shopHaircuts } = api.haircut.getHaircutsByShopId.useQuery({
  //   shopId: shop.id,
  // });

  let dist = Number(
    distance({ lat: shop.lat, lng: shop.lng }, coords).toFixed(1)
  );
  let unit = "km";

  if (dist < 1) {
    dist = Math.round(dist) * 1000;
    unit = "m";
  }

  return (
    <div key={shop.id} className="flex items-start gap-6 rounded-lg">
      <Link
        href={`/shops/${shop.id}`}
        className="relative h-48 max-w-sm flex-1 overflow-hidden rounded-md"
      >
        <Image
          fill={true}
          className="w-full object-cover"
          src={shop.pictures[0] as string}
          alt="Shop image"
        />
        <div className="absolute right-0 flex w-auto flex-col items-center rounded-bl-lg bg-black/50 p-2 text-white">
          <span className="text-lg font-semibold">{4.8}</span>
          <span className="text-[0.7rem]">{320} reviews</span>
        </div>
      </Link>
      <div className="flex-1">
        <Link href={`/shops/${shop.id}`}>
          <h3 className="text-2xl font-semibold">{shop.name}</h3>
          <p className="mt-1 text-xs text-gray-500">
            {dist} {unit} • {shop.street}, {shop.city}
          </p>
        </Link>
        <div className="divide-y divide-gray-200">
          {shopHaircuts?.slice(0, 3).map((haircut) => {
            return (
              <div key={haircut.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-normal text-gray-900">
                      {haircut.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                      <span className="font-bold">
                        {haircut.price.toFixed(2)} DH
                      </span>
                      <span className="text-xs font-normal">
                        {haircut.estimatedTime}min
                      </span>
                    </div>
                    <Link
                      href={`/shops/${shop.id}`}
                      className="inline-flex items-center rounded border border-transparent bg-sectionBlue px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
