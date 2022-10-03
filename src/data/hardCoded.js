import {
  GiClothes,
  GiBlackBook,
  GiDutchBike,
  GiRunningShoe,
  GiGardeningShears,
  GiRockingChair,
  GiForkKnifeSpoon,
} from "react-icons/gi";
import { IoInfiniteSharp } from "react-icons/io5";
import { MdOutlineToys, MdElectricalServices } from "react-icons/md";

export const hardCodeCategories = [
  { name: "all", icon: <IoInfiniteSharp /> },
  { name: "clothes", icon: <GiClothes /> },
  { name: "books", icon: <GiBlackBook /> },
  { name: "bikes", icon: <GiDutchBike /> },
  { name: "shoes", icon: <GiRunningShoe /> },
  { name: "furnitu.", icon: <GiRockingChair /> },
  { name: "tools", icon: <GiGardeningShears /> },
  { name: "toys", icon: <MdOutlineToys /> },
  { name: "electr.", icon: <MdElectricalServices /> },
  { name: "kitchen", icon: <GiForkKnifeSpoon /> },
];
