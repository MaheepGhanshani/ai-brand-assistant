import { Bell, Search, User } from "lucide-react";

function Navbar() {
  return (
    <header className="h-16 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-6">

      <div>
        <h1 className="text-xl font-bold text-white">
          AI Brand Studio
        </h1>
      </div>

      <div className="flex items-center gap-4">

        <div className="flex items-center bg-slate-800 rounded-lg px-3 py-2 w-72">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-white w-full"
          />
        </div>

        <button className="text-slate-400 hover:text-white">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
            <User className="text-white" size={18} />
          </div>

          <div>
            <p className="text-white text-sm font-medium">Maheep</p>
            <p className="text-xs text-green-400">● Online</p>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;