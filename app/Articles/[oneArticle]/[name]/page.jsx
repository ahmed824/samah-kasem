"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./ArticlePage.module.css";
import { imageUrl } from "@/components/baseUrl";
import Loader from "@/components/Loader/page";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useArticles } from "@/components/customHook/useArticles";
import { useArticleDetails } from "@/components/customHook/useArticleDetails";


const RelatedArticles = dynamic(() => import("@/components/RelatedArticles/page"), {
  ssr: false,
});

const ArticlePage = () => {
  const params = useParams();
  const articleId = params.oneArticle;
  const { data: articles = [], isLoading } = useArticles();
  const { data: article, isLoadingdetails } = useArticleDetails(articleId);

  useEffect(() => {
    if (article) {
      document.title = `اتيليه سماح القاسم - ${article?.name || 'منتجات الاتيليه'}`;
      
      // Meta Description
      updateMeta('description', article.content?.substring(0, 160) || "اكتشف أحدث منتجات الاتيليه وتصاميمنا الحصرية");
      
      // OpenGraph
      updateMeta('og:title', article.name);
      updateMeta('og:description', article.content?.substring(0, 160));
      updateMeta('og:image', `${imageUrl}${article.image}`);
      updateMeta('og:type', 'article');
      
      // Twitter
      updateMeta('twitter:card', 'summary_large_image');
      updateMeta('twitter:title', article.name);
      updateMeta('twitter:description', article.content?.substring(0, 160));
      updateMeta('twitter:image', `${imageUrl}${article.image}`);
      
      // Other Meta Tags
      updateMeta('keywords', 'اتيليه, تصميم أزياء, فساتين, موضة, تصاميم حصرية');
      updateMeta('author', 'سارة أحمد');
      updateMeta('robots', 'index, follow');
    }
  }, [article]);

  const updateMeta = (name, content) => {
    let meta = document.querySelector(`اتيليه سماح القاسم-meta[name="${name}"]`) || 
               document.querySelector(`اتيليه سماح القاسم-meta[property="${name}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

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
          <div className={styles.mainContent}>
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
          </div>
          <RelatedArticles articles={articles} />
        </div>
      </div>
    </>
  );
};

export default ArticlePage;
