import { Link } from "react-router-dom";
import { categories } from "../db/db";

export default function TopBooks() {
  return (
    <div className="pb-16 text-white">
    {/* Header */}
    <div className="text-center py-16">
      <h1 className="text-4xl md:text-6xl  text-[--text-color] font-bold mb-4">
        Explore Movie Categories
      </h1>
      <p className="text-lg md:text-xl text-[--text-color]">
        Find movies you love across various genres and universes.
      </p>
    </div>

    {/* Categories Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-8 md:px-16">
      {categories.map((category) => (
        <Link to={category.link} key={category.name}>
          <div className="group relative overflow-hidden rounded-xl shadow-lg bg-gray-700 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <img
              src={category.image}
              alt={`${category.name} category`}
              className="w-full h-48 object-contain bg-gray-800"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
              <h2 className="text-2xl font-semibold p-4">{category.name}</h2>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
}
