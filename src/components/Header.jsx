import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { pink } from "@mui/material/colors";
import "./header.css"

export default function Header() {
    const [menu, setMenu] = useState("menu")

    const handleMenuToggle = () => {
        setMenu(prevClass => prevClass === "menu" ? "menu open" : "menu")
    }

    return (
        <header>
            <div className="pc-header">
                <Link onClick={() => setMenu("menu")} className="brand" to="/">BINGEIT</Link>
                <ul>
                    <li>
                        <NavLink to="/movies">MOVIES</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tv-shows">TV SHOWS</NavLink>
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
                        <NavLink onClick={handleMenuToggle} to="/movies">MOVIES</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handleMenuToggle} to="/tv-shows">TV SHOWS</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={handleMenuToggle} to="/watchlist">WATCHLIST</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}