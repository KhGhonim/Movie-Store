import Crousel from "./SharedCrousel";
import { movieStoreItems } from "../db/db";
export default function Banner() {
  return (
    <div className="relative h-fit  ">
      <div className="custom-gradient  absolute inset-0"></div>
      <div className=" relative  text-[--text-color]  pt-20  z- ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold ">Movie Store</h1>
          <p className="py-6">Find your next adventure</p>
        </div>
        <Crousel result={movieStoreItems} />
        
      </div>

    </div>
  );
}
