import React from "react";
import { useParams, useLocation } from "react-router-dom";
import "./TourPage.css";

export default function TourPage() {
  const { priceId, hotelId } = useParams();
  const location = useLocation();
  const { hotel, price, description, services } = location.state || {};

  if (!hotel || !price) {
    return (
      <div className="tour-page">
        <h1>⚠️ Дані про тур не знайдені</h1>
        <p>Будь ласка, виберіть тур зі списку.</p>
        <p>
          Params: priceId={priceId}, hotelId={hotelId}
        </p>
        <p>State: {JSON.stringify(location.state)}</p>
      </div>
    );
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
    <div className="tour-page">
      <div className="tour-header">
        <div className="tour-info">
          <h1>{hotel.name}</h1>
          <div className="location">
            <span className="country-name">
              <i className="ri-map-pin-line"></i>
              {hotel.countryName}
            </span>
            <span>
              <i className="ri-building-line"></i>
              {hotel.cityName}
            </span>
          </div>
        </div>
        <img src={hotel.img} alt={hotel.name} className="tour-image" />
      </div>

      <div className="tour-details">
        <div className="title">
          <h3>Опис</h3>
          <p>{hotel.description}</p>
        </div>
        <div className="subtitle">
          <h3>Сервіси</h3>
          <ul>
            {hotel.services.wifi === "yes" && (
              <li>
                <i className="ri-wifi-line"></i> Wi-Fi
              </li>
            )}
            {hotel.services.aquapark === "yes" && (
              <li>
                <i className="ri-ship-line"></i> Аквапарк
              </li>
            )}
            {hotel.services.tennis_court === "yes" && (
              <li>
                <i className="ri-ping-pong-line"></i> Тенісний корт
              </li>
            )}
            {hotel.services.laundry === "yes" && (
              <li>
                <i className="ri-contrast-drop-line"></i> Пральня
              </li>
            )}
            {hotel.services.parking === "yes" && (
              <li>
                <i className="ri-car-fill"></i> Паркінг
              </li>
            )}
          </ul>
        </div>
        <div className="calendar">
          <div className="line"></div>
          <p>
            <i className="ri-calendar-line"></i> {formatDate(price.startDate)} -{" "}
            {formatDate(price.endDate)}
          </p>
        </div>
        <div className="price">
          <p>
           {convertToUAN(price.amount, price.currency).toLocaleString("uk-UA", {
            style: 'currency',
            currency: 'UAH'
           })}
          </p>
          <button className="price-btn">Відкрити ціну</button>
        </div>
      </div>
    </div>
  );
}
