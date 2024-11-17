import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const [name, setname] = useState(null);
  const [quality, setquality] = useState(null);
  const [year, setyear] = useState(null);
  const [type, settype] = useState(null);
  const [episodeNumber, setepisodeNumber] = useState(null);
  const [image, setimage] = useState(null);
  const [loading, setloading] = useState(false);

  const HandleSubmit = async (eo) => {
    eo.preventDefault();
    setloading(true);

    if (!name || !quality || !year || !image || !type || !episodeNumber) {
      setloading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("quality", quality);
    formData.append("year", year);
    formData.append("type", type);
    formData.append("episodeNumber", episodeNumber);
    formData.append("image", image);

    const response = await fetch("http://localhost:6969/api/movies", {
      method: "POST",
      body: formData,
    });
    
    if (!response.ok) {
      toast.warning("Prdoucts did not add product");
    } else {
      toast.success("Prdoucts added successfully");
    }
    eo.target.reset();
    setloading(false);
  };

  return (
    
    <div className="  h-full ">
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
            Add some new Products into Our inventory today!
          </h1>

            <p className="mt-4 text-gray-500">
              Please note that your need add other products to your inventory
            </p>
          </div>

          <form
            action="#"
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
            onSubmit={HandleSubmit}
          >
            <div>
              <label htmlFor="name" className="sr-only">
                name
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
                  placeholder="Enter Name of the Product"
                  onChange={(eo) => {
                    setname(eo.target.value);
                  }}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <img
                    src={"/admin/id-card.png"}
                    alt={"id-card.png"}
                    width={25}
                    height={25}
                  />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="sr-only">
              type
              </label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
                  placeholder="Enter the Type"
                  onChange={(eo) => {
                    settype(eo.target.value.toLowerCase());
                  }}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <img
                    src={"/admin/tag.png"}
                    alt={"id-card.png"}
                    width={25}
                    height={25}
                  />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="Quailty" className="sr-only">
                Quailty
              </label>

              <div className="relative">
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
                  placeholder="Enter the Quailty of the Product"
                  onChange={(eo) => {
                    setquality(eo.target.value.toLowerCase());
                  }}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <img
                    src={"/admin/label.png"}
                    alt={"id-card.png"}
                    width={25}
                    height={25}
                  />
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="Year" className="sr-only">
                Year
              </label>

              <div className="relative">
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
                  placeholder="Enter the Year"
                  onChange={(eo) => {
                    setyear(eo.target.value);
                  }}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <img
                    src={"/admin/sale.png"}
                    alt={"sale.png"}
                    width={25}
                    height={25}
                  />
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="Fake price" className="sr-only">
              Episode Number
              </label>

              <div className="relative">
                <input
                  type="number"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
                  placeholder="Enter the Episode Number"
                  onChange={(eo) => {
                    setepisodeNumber(eo.target.value);
                  }}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <img
                    src={"/admin/sale.png"}
                    alt={"sale.png"}
                    width={25}
                    height={25}
                  />
                </span>
              </div>
            </div>
            <div>
              <label htmlFor="image" className="sr-only">
                image
              </label>

              <div className="relative">
                <input
                  type="file"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm "
                  placeholder="Enter the Price of the Product"
                  onChange={(eo) => {
                    setimage(eo.target.files[0]);
                  }}
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <img
                    src={"/admin/picture.png"}
                    alt={"picture.png"}
                    width={25}
                    height={25}
                  />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center p-3">
              <button
                type="submit"
                className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                {loading ? "Loading..." : "Add Product"}
              </button>
            </div>
          </form>
        </div>

        <div className="hidden md:block relative h-72 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1630450202872-e0829c9d6172?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
      <ToastContainer />
    </div>
  );
}
