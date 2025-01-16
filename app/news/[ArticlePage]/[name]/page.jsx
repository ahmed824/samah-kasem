"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./SingleProduct.module.css";
import { imageUrl } from "@/components/baseUrl";
import { useParams } from "next/navigation";
import Loader from "@/components/Loader/page";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNewsData } from "@/components/customHook/useNewsData";

const RelatedArticlesSlider = ({ articles }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className={styles.relatedNews}>
      <h2 className={styles.relatedNewsTitle}>اخبار اخرى</h2>
      <Slider {...settings}>
        {articles.map((relatedArticle) => (
          <div key={relatedArticle.id}>
            <Link
              href={`/news/${relatedArticle.id}/${relatedArticle.name.replace(/\s/g, "-")}`}
              className={styles.relatedArticleCard}
            >
              <Image
                src={`${imageUrl}${relatedArticle.imageId}`}
                alt={relatedArticle.name || "Related article image"}
                width={200}
                height={150}
                className={styles.relatedArticleImage}
              />
              <h3 className={styles.relatedArticleTitle}>
                {relatedArticle.name}
              </h3>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const ArticlePage = () => {
  const params = useParams();
  const articleId = params.ArticlePage;
  const { article, relatedArticles, isLoading } = useNewsData(articleId);


  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <header className={styles.subHeader}>
        <div className={styles.overlay}>
          <div className="container">
            <h2 className={styles.title}>منتجات الاتيليه</h2>
            <div className={styles.linkWrapper}>
              <Link href="/" className={styles.normal}>
                الرئيسية
              </Link>
              <i className="fa fa-angle-double-left" aria-hidden="true" />
              <Link href="/gallery" className={styles.normal}>
                المعرض
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container">
        <div dir="rtl" className={styles.container}>
          <main className={styles.main}>
            <div className={styles.header}>
              {article?.image && (
                <Image
                  src={`${imageUrl}${article.image}`}
                  alt={article.name || "Article image"}
                  width={400}
                  height={250}
                  className={styles.articleImage}
                  priority
                />
              )}
              <h1 className={styles.title}>{article?.name}</h1>
              <p className={styles.content}>{article?.description}</p>
            </div>

            {relatedArticles.length > 0 && (
              <RelatedArticlesSlider articles={relatedArticles} />
            )}

            <Link href="/" className={styles.homeButton}>
              العودة للصفحة الرئيسية
            </Link>
          </main>
        </div>
      </div>
    </>
  );
};

export default ArticlePage;