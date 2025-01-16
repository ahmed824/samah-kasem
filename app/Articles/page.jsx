"use client";
import React from "react";
import styles from "./Articles.module.css";
import Link from "next/link";
import { useArticles } from "../../components/customHook/useArticles";
import Loader from "../../components/Loader/page";
import { imageUrl } from "../../components/baseUrl";
import Image from "next/image";
import dynamic from "next/dynamic";
const NoInternet = dynamic(() => import('@/components/NoInternet/NoInternet'), {
  loading: () => null,
  ssr: false
});

function Articles() {
  const { data: articles = [], isLoading, error } = useArticles();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <NoInternet />;
  }
  return (
    <>
      <div className={styles.articles} style={{ paddingTop: "36px" }}>
        <h2 className="head">مقالات تهمك</h2>
        <div className="container">
          <div className={styles.grid}>
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/Articles/${article.id}/${article.name.replace(/\s/g, "-")}`}
              >
                <div className={styles.card}>
                  <Image
                    src={`${imageUrl}${article.image}`}
                    alt={article.name}
                    className={styles.image}
                    width={100}
                    height={100}
                  />
                  <h3 className={styles.title}>{article.name}</h3>
                  <p className={styles.description}>{article.content}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        {/* <div className={styles.more}>
          <Link className={styles.moreBtn} href="/Articles">
            شاهد المزيد
          </Link>
        </div> */}
      </div>
    </>
  );
}

export default Articles;
