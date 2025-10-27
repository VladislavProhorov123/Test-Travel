import React from "react";
import "./TourCard.css";
import { useNavigate } from "react-router-dom";
import { getHotel } from "../../api/api";

export default function TourCard({ hotel, price }) {
  const navigate = useNavigate();

  async function handleClick() {
    try {
      const res = await getHotel(hotel.id);
      const data = await res.json();

      navigate(`/tour/${price.id}/${hotel.id}`, {
        state: { hotel: data, price },
      });
    } catch (error) {
      console.error("Не удалось получить данные отеля:", error);
    }
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const USD_TO_UAH = 42
  const convertToUAN = (amount, currency) => {
    if(currency === 'usd') return amount * USD_TO_UAH
    return amount
  }

  return (
    <div className="tour-card">
      <img src={hotel.img} alt={hotel.name} />
      <div>
        <h3>{hotel.name}</h3>
        <p>
          {hotel.countryName}, {hotel.cityName}
        </p>
        <p>{formatDate(price.startDate)}</p>
        <p>
          
          {convertToUAN(price.amount, price.currency).toLocaleString("uk-UA", {
            style: 'currency',
            currency: 'UAH'
          })}
        </p>

        <button type="button" className="link" onClick={handleClick}>
          Відкрити ціну
        </button>
      </div>
    </div>
  );
}
