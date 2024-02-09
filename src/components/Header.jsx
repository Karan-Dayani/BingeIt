import React, { useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import "./header.css"
import { getSearchResults } from "../api";

export default function Header() {
    const [menu, setMenu] = useState("menu")
    const [searchRes, setSearchRes] = useState([]);
    const [searchResMenu, setSearchResMenu] = useState(false);

    const searchBarRef = useRef();

    const handleMenuToggle = () => {
        setMenu(prevClass => prevClass === "menu" ? "menu open" : "menu")
    }

    const handleSearchChange = (event) => {
        const query = event.target.value;
        getSearchResults(query)
            .then(res => {
                setSearchRes(res.results);
                setSearchResMenu(true);
            })
            .catch(err => err)
    }

    const handelSearchResToggle = () => {
        setSearchResMenu(prev => !prev);
        searchBarRef.current.value = "";
    }

    return (
        <header>
            <div className="pc-header">
                <Link onClick={() => setMenu("menu")} className="brand" to="/">BINGEIT</Link>
                <ul>
                    <div>
                        <input placeholder="Search..." type="text" onChange={handleSearchChange} name="text" className="input" ref={searchBarRef} />
                        {
                            searchResMenu ?
                                <div className="search-res">
                                    {searchRes.map((item) => (
                                        <Link key={item.id} className="res-item-link" to={`/${item.media_type}/${item.id}`} onClick={handelSearchResToggle}>
                                            <div className="res-item">
                                                <img className='res-item-img' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="image-not-found" />
                                                <div className="res-item-info">
                                                    {item.name ? <h6 className='res-item-name'>{item.name}</h6> : <h6 className='res-item-name'>{item.title}</h6>}
                                                    <p className="res-item-media">{item.media_type}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                : <div></div>
                        }
                    </div>
                    <li>
                        <NavLink to="/movies?page=1">MOVIES</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tv-shows?page=1">TV SHOWS</NavLink>
                    </li>
                    <li>
                        <NavLink to="/watchlist">WATCHLIST</NavLink>
                    </li>
                </ul>
            </div>
            <div className="mob-header">
                <Link onClick={() => setMenu("menu")} className="brand" to="/">BINGEIT</Link>
                <MenuRoundedIcon onClick={handleMenuToggle} sx={{ fontSize: 50, color: "var(--hover)" }} />
            </div>
            <div className={menu}>
                <ul>
                    <li>
                        <NavLink onClick={handleMenuToggle} to="/movies?page=1">MOVIES</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handleMenuToggle} to="/tv-shows?page=1">TV SHOWS</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handleMenuToggle} to="/watchlist">WATCHLIST</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}