import { Link } from "react-router-dom";

export default function TopBooks() {
  return (
    <div className="relative h-full ">
      <div className=" relative  text-[--text-color]  pt-20 h z-40 h-full ">
        <div className="text-center flex items-center justify-center gap-3  w-full mb-20  ">
          <h1 className="text-5xl font-bold ">Choose Your Catagory</h1>

          <img
            width={50}
            src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/fire_1f525.gif"
            alt=""
            className="block max-sm:hidden animate-bounce"
          />
        </div>

        <div className="flex flex-wrap justify-around items-center max-sm:flex-col z-50 ">
          <Link to={"/catagories/Netflix"}>
            <div className="text-center text-base font-bold md:text-3xl text-[--text-color] h-36 w-64 flex justify-center items-center bg-[--background-color] mt-6 back-gradient rounded-2xl hover:scale-110 transition-transform duration-200 ease-in-out ">
              <img
                width={150}
                height={100}
                src="../../src/assets/Movies/Netflix.png"
                alt="Netflix"
              />
            </div>
          </Link>
          <Link to={"/catagories/Marvel"}>
            <div className="text-center text-base font-bold md:text-3xl text-[--text-color]  h-36 w-64 flex justify-center items-center bg-[--background-color] mt-6 back-gradient rounded-2xl hover:scale-110 transition-transform duration-200 ease-in-out">
              <img
                width={150}
                height={100}
                src="../../src/assets/Movies/Marvel.png"
                alt="Marvel"
              />
            </div>
          </Link>
          <Link to={"/catagories/DC"}>
            <div className="text-center text-base font-bold md:text-3xl text-[--text-color] h-36 w-64 flex justify-center items-center bg-[--background-color] back-gradient mt-6 rounded-2xl hover:scale-110 transition-transform duration-200 ease-in-out">
              <img
                style={{ width: "150px", height: "100px", objectFit: "cover" }}
                src="../../src/assets/Movies/dc.png"
                alt="DC"
              />
            </div>
          </Link>
          <Link to={"/catagories/Ramazan"}>
            <div className="text-center text-base font-bold md:text-3xl text-[--text-color] h-36 w-64 flex justify-center items-center bg-[--background-color] back-gradient mt-6 max-sm:mb-16 rounded-2xl hover:scale-110 transition-transform duration-200 ease-in-out">
              <img
                width={150}
                height={100}
                src="../../src/assets/Movies/ibdaat.png"
                alt="Ramazan"
                className="p-6"
              />
            </div>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
