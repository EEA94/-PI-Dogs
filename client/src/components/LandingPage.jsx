import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={styles.landing}>
            <div className={styles.subLanding}>
                <div className={styles.container}>
                    <h1 className={styles.title}>ENTER TO FIND YOUR PERFECT DOG...</h1>
                    <h4 className={styles.subtitle}>Search or create the dog you want. filter and sort them alphabetically, by name, weight, height and temperament.</h4>
                </div>
                <div>
                    <Link to="/home">
                    <button className={styles.landBtn}>Let's Go</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}