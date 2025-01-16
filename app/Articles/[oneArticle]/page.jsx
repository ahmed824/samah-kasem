"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArticlePage.module.css";
import { useArticles } from "@/components/customHook/useArticles";
import { imageUrl } from "@/components/baseUrl";
import Loader from "@/components/Loader/page";
import { useArticleDetails } from "@/components/customHook/useArticleDetails";
import { useParams } from "next/navigation";
import RelatedArticles from "@/components/RelatedArticles/page";

const ArticlePage = () => {
  const params = useParams();
  const articleId = params.oneArticle;

  const { data: articles = [], isLoading } = useArticles();
  const { data: article, isLoadingdetails } = useArticleDetails(articleId);

  if (isLoading || isLoadingdetails) {
    return <Loader />;
  }

  return (
    <>
      <header className={styles.subHeader}>
        <div className={styles.overlay}>
          <div className="container">
            <h2 className={styles.title}>منتجات الاتيليه</h2>
            <div className="link-wrapper d-flex flex-row">
              <Link href="/" className="normal">
                الرئيسية
              </Link>
              <i className="fa fa-angle-double-left" aria-hidden="true" />
              <Link href="/BigGallery" className="normal">
                المعرض
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <div className={styles.container}>
          <article className={styles.article}>
            <h1 className={styles.title}>{article?.name}</h1>
            <div className={styles.meta}>
              <span>بقلم: سارة أحمد</span>
              <span> | </span>
              <span>27 أغسطس 2024</span>
            </div>
            {article?.image && (
              <Image
                src={`${imageUrl}${article.image}`}
                alt={article.name}
                width={800}
                height={400}
                className={styles.mainImage}
              />
            )}
            <section
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: article?.content }}
            />
          </article>
          <RelatedArticles articles={articles} />
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
