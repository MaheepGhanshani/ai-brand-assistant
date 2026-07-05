import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";

function App() {

  const [selectedBrand, setSelectedBrand] = useState(null);

  return (
    <div className="flex h-screen">

      <Sidebar
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
      />

      <ChatWindow
        selectedBrand={selectedBrand}
      />

    </div>
  );
}

export default App;