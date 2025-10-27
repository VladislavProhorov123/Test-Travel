import React, { useState } from "react";
import Title from "./Components/Title/Title";
import Button from "./Components/Button/Button";
import TourSearch from "./Components/TourSearch/TourSearch";
import TourSearchInput from "./Components/TourSearchInput/TourSearchInput";
import Routing from "./router/Routing";

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleSearch = () => {
    if (!selectedItem) {
      alert("Спочатку оберіть тур!");
      return;
    }
    setSearchTrigger(prev => prev + 1);
  };

  const getCountryID = () => {
    if (!selectedItem) return null;
    
    if (selectedItem.type === "country") {
      return selectedItem.id;
    }
    

    if (selectedItem.type === "city" || selectedItem.type === "hotel") {
      return selectedItem.countryId;
    }
    
    return null;
  };

  const countryID = getCountryID();

  return (
    <div className="container">
      <Title text={"Форма пошуку турів"} />
      <TourSearchInput onSelectItem={setSelectedItem} />
      
      
      {countryID && (
        <TourSearch countryID={countryID} trigger={searchTrigger}/>
      )}

      <Button onClick={handleSearch} />
      <Routing />
    </div>
  );
}
