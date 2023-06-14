import { useState,useEffect } from "react";

export default function TabBar(){
    const username = localStorage.getItem("username");






    return(
        <div className="tabbar">
            <div className="tabbar-container">
                <div className="left-section">
                    <p>all</p>
                    <p>mastered</p>
                    <p>needs work</p>
                </div>
                <div className="middle-section">
                    <p className="username-show">{username && username}</p>
                </div>
                <div className="right-section">
                    <p>Coutner</p>
                </div>
            </div>
        </div>
    )
}