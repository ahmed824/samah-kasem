"use client";
import React, { useState, useEffect } from "react";
import styles from "./FixedIcons.module.css";
import Link from "next/link";

export default function FixedIcons() {
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollUp = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.fixedIcons}>
      <Link
        href="https://wa.me/+201065794552"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.icon}
        aria-label="Contact us on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </Link>

      {/* <Link
        href="https://www.facebook.com/samah.elkasem"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.icon}
        aria-label="Visit our Facebook page"
      >
        <i className="fab fa-facebook"></i>
      </Link> */}

      <Link
        href="https://m.me/samah.elkasem"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.icon}
        aria-label="Message us on Messenger"
      >
        <i className="fa-brands fa-facebook-messenger"></i>
      </Link>

      <Link
        href="tel:+201065794552"
        className={styles.icon}
        aria-label="Call us"
      >
        <i className="fa-solid fa-phone"></i>
      </Link>

      <Link
        href="#"
        onClick={handleScrollUp}
        className={`${styles.icon} ${showScrollUp ? styles.show : styles.hide}`}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-chevron-up"></i>
      </Link>
    </div>
  );
}
