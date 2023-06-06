import React, { useEffect, useState } from "react";
import "./show.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Close } from "@mui/icons-material";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../loader/Loader";

export default function Show() {
  const [show, setShow] = useState({});
  const [loading, setLoading] = useState(true);
  const [hide, setHide] = useState(false);
  const [name,setName]=useState("");
  const { id } = useParams();

  const BookTicket=(e)=>{
    e.preventDefault();
    const ticket={
      "customerName":name,
      "movie":show.name,
       "id":id,
       "price":show.id%1000      
    }
    localStorage.setItem("Ticket",JSON.stringify(ticket));    
    setHide(false);
    toast.success("ticket booked successfully");
  }


  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`);
      setShow(() => data);      
      setLoading(() => false);
    };
    fetcher();
  }, []);

  return (
    <div className="show">
      {loading ? (
        <Loader/>
      ) : (
        <>  
          <div id="left">
            <img src={show.image.original} alt="" />
          </div>
          <div id="right">
            <h1>{show.name}</h1>
            <div className="detail-1">
              <div>Year: {show.premiered.slice(0, 4)}</div>
              <div>
                Show Runtime: {Math.floor(show.runtime / 60)}H{" "}
                {show.averageRuntime % 60}M
              </div>
              <div>Rating: {show.rating.average}</div>
            </div>
            <div className="detail-2">
              <div>Genres:</div>
              {show.genres.map((item, i) => {
                return (
                  <div key={i} className="genre">
                    {item}
                  </div>
                );
              })}
            </div>
            <div className="desc">
              <h3>Summary</h3>
              <div>{parse(show.summary)}</div>
            </div>
            <button onClick={()=>setHide(true)}>Book Ticket</button>
            
            {
              hide &&            
            <form action="/">
              <div >
                <h2>Movie Ticket</h2>
                <Close onClick={()=>setHide(false)}/>
              </div>
              <div className="item">
                <span>Movie Name:<b> &nbsp;{show.name}</b></span>
                <span>Ticket Price: {show.id % 1000}Rs </span>
              </div>
              <div className="item">
                <div>
                  Movie Schedule: {show.schedule.time}, {show.schedule.days[0]}
                </div>
                <div>
                  Movie runtime: {Math.floor(show.runtime / 60)}H{" "}
                  {show.runtime % 60}M{" "}
                </div>
              </div>
              <div className="item">
                <input type="text" placeholder="Enter name" onChange={(e)=>setName(e.target.value)}/>              
                <button onClick={BookTicket}>Book Now</button>
              </div>
            </form>
            }

          </div>
        </>
      )}
    </div>
  );
}
