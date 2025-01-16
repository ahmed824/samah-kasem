"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./RelatedArticles.module.css";
import { imageUrl } from "../baseUrl";

const RelatedArticles = ({ articles }) => {
  return (
    <aside className={styles.related}>
      <h2 className={styles.relatedTitle}>مقالات ذات صلة</h2>
      <div className={styles.relatedList}>
        {articles.map((article) => (
          <div key={article.id} className={styles.relatedArticle}>
            <Link href={`/Articles/${article.id}/${article.name.replace(/\s/g, "-")}`}>
              <div className={styles.relatedImageContainer}>
                <Image
                 src={`${imageUrl}${article.image}`}
                  alt={article.name}
                  className={styles.relatedImage}
                  width={100}
                  height={100}
                />
              </div>
              <h3 className={styles.relatedArticleTitle}>{article.name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
  
};

export default RelatedArticles;