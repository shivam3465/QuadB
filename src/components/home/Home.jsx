import React, { useEffect, useState } from "react";
import "./home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";

const Card = ({ obj }) => {
  const { show } = obj;
  const imageLink = show.image.medium;
  const rating = show.rating.average,
    year = show.premiered.slice(0, 4);
  return (
    <Link className="card" to={`/show/${show.id}`}>
      <img src={imageLink} alt="" />
      <div className="details">
        <div>{show.name}</div>
        <span>
          <span>year: {year}</span>
          <span>rating: {rating}</span>
        </span>
      </div>
    </Link>
  );
};

export default function Home() {
  const [arr, setArr] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "https://api.tvmaze.com/search/shows?q=all"
      );
      setArr(() => data);
      setLoading(() => false);
    };
    fetcher();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader/>
      ) : (
        <div className="home">
          {arr.map((item, i) => {
            return <Card key={i} obj={item} />;
          })}
        </div>
      )}
    </div>
  );
}
