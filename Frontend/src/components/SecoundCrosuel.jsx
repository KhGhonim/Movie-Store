import { movieStoreItems } from "../db/db";
import Crousel from "./SharedCrousel";

export default function Testimonials() {
  return (
    <div className="relative h-full   ">
      <div className=" relative  text-[--text-color]  pt-20  z-40 ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold ">Series Store</h1>
        </div>
        <Crousel result={movieStoreItems} />
      </div>
    </div>
  );
}
