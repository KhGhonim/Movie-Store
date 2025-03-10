// @ts-ignore
import banner from "../../assets/banner.gif";

export default function AdsBanner() {
  return (
    <div className="relative overflow-hidden pt-5 pb-16 rounded-lg">
      <img
        alt="Movie characters"
        className=" w-full h-full object-cover"
        src={banner}
      />
    </div>
  );
}
