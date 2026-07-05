import { useState, useEffect } from "react";
import NewBrandModal from "./NewBrandModal";
import api from "../api/api";

import {
  FiPlus,
  FiSearch,
  FiSettings,
  FiUser,
} from "react-icons/fi";

function Sidebar({ selectedBrand, setSelectedBrand }) {

  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {

      const res = await api.get("/brands");

      setBrands(res.data);

  

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <aside className="w-[280px] h-screen bg-[#0F172A] border-r border-slate-800 flex flex-col">

      {/* Header */}

      <div className="p-6 border-b border-slate-800">

        <h1 className="text-2xl font-bold text-white">
          ✨ AI Brand Studio
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Create premium brands with AI
        </p>

      </div>

      {/* New Brand */}

      <div className="px-5 pt-5">

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg"
        >
          <FiPlus size={18} />
          New Brand
        </button>

      </div>

      {/* Search */}

      <div className="px-5 mt-5">

        <div className="flex items-center bg-slate-800 rounded-xl px-4">

          <FiSearch className="text-slate-400" />

          <input
            type="text"
            placeholder="Search brands..."
            className="bg-transparent outline-none text-white w-full py-3 px-3 placeholder:text-slate-500"
          />

        </div>

      </div>

      {/* Heading */}

      <div className="px-5 mt-8">

        <p className="text-xs uppercase tracking-widest text-slate-500">
          Your Brands
        </p>

      </div>

      {/* Brand List */}

      <div className="flex-1 mt-4 px-3 overflow-y-auto">

        {brands.map((brand) => (

          <div
            key={brand._id}
            onClick={() => setSelectedBrand(brand._id)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer mb-2 transition-all duration-300 ${
              selectedBrand === brand._id
                ? "bg-blue-600 shadow-md"
                : "hover:bg-slate-800"
            }`}
          >

            <div className="text-2xl">
              ✨
            </div>

            <div>

              <h3 className="font-medium text-white">
                {brand.name}
              </h3>

              <p className="text-xs text-slate-300">
                AI Workspace
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <button className="w-full flex items-center gap-3 text-slate-300 hover:text-white transition">

          <FiSettings size={18} />

          <span>Settings</span>

        </button>

        <div className="mt-6 flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white">

            <FiUser />

          </div>

          <div>

            <h4 className="text-white font-medium">
              Maheep
            </h4>

            <p className="text-xs text-slate-400">
              Full Stack Developer
            </p>

          </div>

        </div>

      </div>
<NewBrandModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onBrandCreated={(brandId) => {
    fetchBrands();
    setSelectedBrand(brandId);
  }}
/>

    </aside>
  );
}

export default Sidebar;