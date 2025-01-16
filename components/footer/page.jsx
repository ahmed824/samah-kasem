"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./footer.module.css";
import Link from "next/link";
import { useDresses } from "../customHook/useGalleryData";
import { imageUrl } from "../baseUrl";

export default function Footer() {
  const [selectedType, setSelectedType] = useState(3);


  const { data: dresses = [] } = useDresses(selectedType);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className="row">
          <div className="col-lg-4">
            <div className={styles.gallery}>
              <h4 className={styles.sectionTitle}>معرضنا</h4>
              <div className={styles.images}>
                {dresses.slice(0, 2).map((dress) => (
                  <Link
                    href={`/gallery/sort/${dress.id}/${dress.name.replace(
                      /\s/g,
                      "-"
                    )}`}
                    key={dress.id}
                  >
                    <div className={styles.imageWrapper}>
                      <Image
                        src={`${imageUrl}${dress.image}`}
                        alt={dress.name}
                        width={100}
                        height={150}
                        className={styles.galleryImage}
                      />
                      <div className={styles.imageOverlay}>
                        <i
                          className={`fas fa-search ${styles.imageOverlayIcon}`}
                        ></i>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={styles.quickLinks}>
              <h4 className={styles.sectionTitle}>روابط مختصرة</h4>
              <ul className={styles.linksList}>
                <li>
                  <Link href="/" className={styles.link}>
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/services" className={styles.link}>
                    الخدمات
                  </Link>
                </li>
                <li>
                  <Link href="/news" className={styles.link}>
                    اخر الاخبار
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className={styles.link}>
                    المعرض
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={styles.brandSection}>
              <div className="position-relative logo-img">
                <Image
                  src="/logo/download.png"
                  alt="Brand Logo"
                  fill={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.brandLogo}
                />

              </div>
              <p className={styles.brandDescription}>
                لدى " الاتيليه " حالياً مقر بدمياط القديمة وقريباً سيكون لنا
                فروع أخرى بمحافظات مصر . العنوان : دمياط القديمة – كورنيش النيل
                بجوار الغرفة التجاريه ملف عمر افندي
              </p>
              <div className={styles.socialIcons}>
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
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>جميع الحقوق محفوظة , دلتاوي نت .</p>
      </div>
    </footer>
  );
}
