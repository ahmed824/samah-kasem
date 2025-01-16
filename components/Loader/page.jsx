import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <svg className={styles.dressLoader} viewBox="0 0 100 100" width="100" height="100">
                <path className={styles.dress} d="M50 20 
                    C50 20, 90 30, 90 65
                    C90 80, 75 85, 50 85
                    C25 85, 10 80, 10 65
                    C10 30, 50 20, 50 20
                    M50 20 L50 5 
                    M30 5 L70 5"
                />
                <circle className={styles.sparkle1} cx="20" cy="40" r="2"/>
                <circle className={styles.sparkle2} cx="80" cy="40" r="2"/>
                <circle className={styles.sparkle3} cx="50" cy="75" r="2"/>
            </svg>
            <span className={styles.loadingText}>Creating Beauty...</span>
        </div>
    );
};

export default Loader;
