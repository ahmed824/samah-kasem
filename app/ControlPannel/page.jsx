"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaNewspaper, FaImages, FaBlog, FaVideo } from "react-icons/fa";
import styles from "./ControlPannel.module.css";
import { useVideos } from "@/components/customHook/useVideos";
import { useArticles } from "@/components/customHook/useArticles";
import { useNews } from "@/components/customHook/useNews";
import { useDresses } from "@/components/customHook/useGalleryData";

export default function ControlPanel() {
  const { data: newsItems = [] } = useNews();
  const { data: videos = [] } = useVideos();

  const { data: articles = [] } = useArticles();
  const { data: dressesType1 = [] } = useDresses(1);
  const { data: dressesType2 = [] } = useDresses(2);
  const { data: dressesType3 = [] } = useDresses(3);

  const totalDresses =
    dressesType1.length + dressesType2.length + dressesType3.length;

  const adminFeatures = [
    {
      id: 1,
      title: "إدارة المقالات",
      icon: <FaBlog />,
      description: "إضافة وتعديل وحذف المقالات",
      link: "/admin/article",
      stats: `${articles.length} مقال`,
    },
    {
      id: 2,
      title: "معرض الفساتين",
      icon: <FaImages />,
      description: "إدارة معرض الفساتين والصور",
      link: "/admin/gallery",
      stats: `${totalDresses} فستان`,
    },
    {
      id: 3,
      title: "آخر الأخبار",
      icon: <FaNewspaper />,
      description: "تحديث وإدارة الأخبار",
      link: "/admin/news",
      stats: `${newsItems.length} خبر`,
    },
    {
      id: 4,
      title: " الفيديوهات",
      icon: <FaVideo />,
      description: "تعديل الفيديوهات المعروضة",
      link: "/admin/videos",
      stats: `${videos.length} فيديو`,
    },
  ];

  const [features, setFeatures] = useState([]);

  useEffect(() => {
    const rank = localStorage.getItem("Rank");

    switch (rank) {
      case "Admin":
        setFeatures(adminFeatures);
        break;
      // case "user":
      //   setFeatures(userFeatures);
        break;
      default:
        setFeatures([]);
        break;
    }
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>لوحة التحكم</h1>

      <div className={styles.statsGrid}>
        {features.map((feature) => (
          <Link href={feature.link} key={feature.id}>
            <div className={styles.card}>
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <h2 className={styles.cardTitle}>{feature.title}</h2>
              <p className={styles.description}>{feature.description}</p>
              <div className={styles.stats}>{feature.stats}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
