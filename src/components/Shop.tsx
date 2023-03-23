import { Shop } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ShopProps = Partial<Shop>;

const Shop = (props: ShopProps) => {
  return (
    <Link
      key={props?.name}
      href={`/shops/${props?.id}`}
      className="flex flex-col rounded-lg"
    >
      <div className="relative h-48 flex-shrink-0 overflow-hidden rounded-md">
        <Image
          fill={true}
          className="w-full object-cover"
          src={props?.pictures[0] as string}
          alt="Shop image"
        />
        <div className="absolute right-0 flex w-auto flex-col items-center rounded-bl-lg bg-black/50 p-2 text-white">
          <span className="text-lg font-semibold">{4.5}</span>
          <span className="text-[0.7rem]">{362} reviews</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-transparent p-2">
        <div className="flex-1">
          <p className="text-base font-semibold text-gray-900">{props?.name}</p>
          <p className="mt-1 text-xs text-gray-500">
            {props?.street} {props?.city}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Shop;
