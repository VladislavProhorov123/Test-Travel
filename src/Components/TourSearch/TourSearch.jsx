import React, { useEffect, useState } from "react";
import "./TourSearch.css";
import {
  startSearchPrices,
  getSearchPrices,
  getHotels,
} from "../../api/api.js";
import TourCard from "../TourCard/TourCard.jsx";

export default function TourSearch({ countryID, trigger }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    if (!countryID || trigger === 0) return;

    const fetchTours = async () => {
      setLoading(true);
      setError(null);
      setTours([]);

      try {
        const startRes = await startSearchPrices(countryID);
        const startData = await startRes.json();
        const token = startData.token;
        let waitUntil = new Date(startData.waitUntil).getTime();

        let attempts = 0;
        let result = null;

        while (attempts < 3) {
          const now = Date.now();
          if (waitUntil > now) {
            await new Promise((resolve) =>
              setTimeout(resolve, waitUntil - now)
            );
          }
          try {
            const res = await getSearchPrices(token);
            const data = await res.json();
            result = data.prices;
            break;
          } catch (err) {
            const errData = await err.json();
            if (errData.code === 425) {
              waitUntil = new Date(errData.waitUntil).getTime();
              attempts++;
            } else {
              throw new Error(errData.message);
            }
          }
        }

        if (!result) {
          throw new Error("Не вдалося отримати результати після кількох спроб");
        }

        const hotelsRes = await getHotels(countryID);
        const hotelsData = await hotelsRes.json();

        const tourArray = Object.values(result)
          .map((price) => {
            const hotel =
              hotelsData[price.hotelID] || hotelsData[String(price.hotelID)];

            if (!hotel) {
              console.warn(
                "⚠️ Отель не найден для ID:",
                price.hotelID,
                typeof price.hotelID
              );
              console.warn("Доступные ключи:", Object.keys(hotelsData));
              return null;
            }

            console.log("✅ Найден отель:", hotel.name, "ID:", price.hotelID);
            return { hotel, price };
          })
          .filter((tour) => tour !== null);

        setTours(tourArray);

        if (tourArray.length === 0) {
          setError("За вашим запитом турів не знайдено");
        }
      } catch (err) {
        console.error("❌ Ошибка:", err);
        setError(err.message || "Сталася помилка при пошуку турів");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [countryID, trigger]);

  return (
    <div className="tour-results">
      {loading && <p className="loading-message">Йде пошук турів...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && tours.length > 0 && (
        <div className="tours-flex">
          {tours.map(({ hotel, price }) => (
            <TourCard key={price.id} hotel={hotel} price={price} />
          ))}
        </div>
      )}
    </div>
  );
}
