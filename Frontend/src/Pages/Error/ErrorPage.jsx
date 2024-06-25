import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="w-full h-dvh bg-[--background-color] text-[--text-color] flex justify-center items-center">
      <h1>
        Error Page: Please return to
        <Link className="ml-1 text-red-500" to={"/"}>
          HomePage
        </Link>
      </h1>


      
    </div>
  );
}
