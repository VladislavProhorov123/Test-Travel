import React, { useEffect, useState } from "react";
import "./TourSearchInput.css";
import { getCountries, searchGeo } from "../../api/api.js";

export default function TourSearch() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // вынесем наружу, чтобы можно было переиспользовать
  const fetchCountries = async () => {
    try {
      setLoading(true);
      const res = await getCountries();
      const data = await res.json();
      const countriesArray = Object.values(data);
      setItems(countriesArray);
    } catch (error) {
      console.error("Error loading countries:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(true);

    if (!value.trim()) {
      fetchCountries();
      return;
    }

    try {
      setLoading(true);
      const res = await searchGeo(value);
      const data = await res.json();
      const resultArray = Array.isArray(data) ? data : Object.values(data);
      setItems(resultArray);
    } catch (error) {
      console.error("Error searching geo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    setQuery(item.name);
    setSelectedItem(item);
    setShowDropdown(false);
  };

  const handleFocus = () => {
    setShowDropdown(true);
    if (!items.length) fetchCountries();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", selectedItem);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Виберіть тур..."
        value={query}
        onChange={handleChange}
        onFocus={handleFocus}
      />

      {showDropdown && (
        <ul className="dropdown">
          {loading ? (
            <li className="loading">Завантаження...</li>
          ) : (
            items.map((item) => (
              <li key={item.id} onClick={() => handleSelect(item)}>
                {item.type === "country" && <img src={item.flag} alt="" className="country-flag" />}
                {item.type === "city" && <i className="ri-building-4-fill"></i>}
                {item.type === "hotel" && <i className="ri-hotel-bed-fill"></i>}
                {item.name}
              </li>
            ))
          )}
        </ul>
      )}
    </form>
  );
}
