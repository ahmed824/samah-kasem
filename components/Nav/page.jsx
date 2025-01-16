"use client";

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import styles from "./nav.module.css";
import { Button } from "primereact/button";

export default function Nav() {
  const pathname = usePathname();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const sideNavRef = useRef(null);
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
    setUserRank(localStorage.getItem("Rank"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserId(null);
    setUserRank(null);
    router.push("/logIn");
  };


  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const closeSideNav = () => {
    setIsSideNavOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        closeSideNav();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = () => {
    closeSideNav();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark" dir="rtl">
        {isSideNavOpen && (
          <div className={styles.overlay} onClick={closeSideNav}></div>
        )}
        <div
          ref={sideNavRef}
          className={`${styles.sidenav} ${isSideNavOpen ? styles.open : ""}`}
          id="sideNav"
        >
          <button className={styles.closebtn} onClick={closeSideNav}>
            ×
          </button>
          <div className={styles.imgg}>
            <Image
              src="/logo/download.png"
              width={60}
              height={60}
              className={styles.image}
              alt="logo"
            />
          </div>
          <div className={styles.sideinner}>
            <ul className="nav navbar-nav">
              <li className={styles.navItem}>
                <Link
                  className={styles.navLink}
                  href="/"
                  onClick={handleLinkClick}
                >
                  الرئيسية
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  className={styles.navLink}
                  href="/BigServices"
                  onClick={handleLinkClick}
                >
                  خدماتنا
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  className={styles.navLink}
                  href="/Articles"
                  onClick={handleLinkClick}
                >
                  المقالات
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  className={styles.navLink}
                  href="/news"
                  onClick={handleLinkClick}
                >
                  اخبار الاتيليه
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link
                  className={styles.navLink}
                  href="/BigGallery"
                  onClick={handleLinkClick}
                >
                  المعرض
                </Link>
              </li>
              <li className="nav-item">
                {userId && (
                  <Link
                    className={`nav-link ${pathname === "/ControlPannel" ? "active" : ""
                      }`}
                    href="/ControlPannel"
                  >
                    لوحة التحكم
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {userId && (
                  <Button
                    className={styles.logoutBtn}
                    onClick={handleLogout}
                  >
                    تسجيل الخروج
                  </Button>
                )}
              </li>
              <li className="nav-item">
                {!userId && (
                  <Link
                    className={`nav-link ${pathname === "/login" ? "active" : ""
                      }`}
                    href="/login"
                  >
                    تسجيل الدخول
                  </Link>
                )}
              </li>
              <li className="nav-item d-none">
                <Link
                  className={styles.navLink}
                  href="/questions"
                  onClick={handleLinkClick}
                >
                  سؤال وجواب
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image
              src="/logo/download.png"
              width={60}
              height={60}
              className={styles.image}
              alt="logo"
            />

          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSideNav}
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname === "/" ? "active" : ""}`}
                  href="/"
                >
                  الرئيسية
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname === "/BigServices" ? "active" : ""
                    }`}
                  href="/BigServices"
                >
                  خدماتنا
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname === "/Articles" ? "active" : ""
                    }`}
                  href="/Articles"
                >
                  المقالات
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname === "/news" ? "active" : ""}`}
                  href="/news"
                >
                  اخبار الاتيليه
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${pathname === "/BigGallery" ? "active" : ""
                    }`}
                  href="/BigGallery"
                >
                  المعرض
                </Link>
              </li>
              <li className="nav-item">
                {userId && userRank === "Admin" && (
                  <Link
                    className={`nav-link ${pathname === "/ControlPannel" ? "active" : ""
                      }`}
                    href="/ControlPannel"
                  >
                    لوحة التحكم
                  </Link>
                )}
              </li>

              <li className="nav-item">
                {userId && (
                  <Button
                    className={styles.logoutBtn}
                    onClick={handleLogout}
                  >
                    تسجيل الخروج
                  </Button>
                )}
              </li>
              <li className="nav-item">
                {!userId && (
                  <Link
                    className={`nav-link ${pathname === "/login" ? "active" : ""
                      }`}
                    href="/login"
                  >
                    تسجيل الدخول
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <div className={styles.socialLinks}>
            <Link
              href="https://www.facebook.com/samah.elkasem"
              className={styles.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link
              href="https://www.instagram.com/samah.elkasem?igsh=MXZuMHM5bnkzdGlycw=="
              className={styles.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
