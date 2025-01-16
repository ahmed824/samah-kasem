"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./SingleProduct.module.css";
import ShowImage from "../../../../components/ShowImage/page";
import { useParams } from "next/navigation";
import { useGalleryDetails } from "@/components/customHook/useGalleryDetails";
import { useMatchedGallery } from "@/components/customHook/useMatchedGallery";
import { imageUrl } from "@/components/baseUrl";
import { useDresses } from "@/components/customHook/useGalleryData";
import Slider from "react-slick";

export default function SingleProduct() {
  const params = useParams();
  const galleryId = params.id;
  const [selectedType, setSelectedType] = useState(3);

  const { data: galleryDetails, isLoading } = useGalleryDetails(galleryId);
  const { data: matchedGallery, isLoading: matchedLoading } =
    useMatchedGallery(galleryId);
  const { data: dresses = [] } = useDresses(selectedType);

  const sliderSettings = {
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
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <div className="d-flex upper-contect">
        <div className={styles.sliderContainer}>
          <ShowImage images={galleryDetails?.images || []} />
        </div>

        <div className={styles.detailsContainer}>
          <h1 className={styles.productTitle}>{galleryDetails?.name}</h1>
          <p className={styles.productDescription}>
            {galleryDetails?.description}
          </p>
          <div className={styles.socialIcons}>
            <div className={styles.socialLinks}>
              <Link
                href="https://www.facebook.com"
                className={styles.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link
                href="https://www.twitter.com"
                className={styles.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>بعض المنتجات من نفس الفئة</h2>
        <Slider {...sliderSettings} className={styles.relatedProducts}>
          {matchedGallery?.list?.map((product) => (
            <div key={product.id}>
              <Link
                href={`/gallery/sort/${product.id}`}
                className={styles.relatedProduct}
              >
                <Image
                  src={`${imageUrl}${product.image}`}
                  alt={product.name}
                  className={styles.relatedImage}
                  width={150}
                  height={200}
                />
                <p className={styles.relatedProductTitle}>{product.name}</p>
              </Link>
            </div>
          ))}
        </Slider>
      </section>

      {/* <section className={styles.otherProductsSection}>
        <h2 className={styles.otherProductsTitle}>منتجات أخرى</h2>
        <div className={styles.otherProducts}>
          {dresses.map((product) => (
            <Link
              href={`/gallery/sort/${product.id}`}
              key={product.id}
              className={styles.relatedProduct}
            >
              <Image
                src="/images/imagess.jfif"
                alt={`صورة ${product.title}`}
                className={styles.relatedImage}
                layout="responsive"
                width={150}
                height={200}
              />
              <p className={styles.relatedProductTitle}>{product.title}</p>
            </Link>
          ))}
        </div>
      </section> */}
    </div>
  );
}
