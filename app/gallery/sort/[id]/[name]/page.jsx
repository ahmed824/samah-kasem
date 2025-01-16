"use client";
import React, { useState } from "react";
import styles from "./SingleProduct.module.css";
import { useParams } from "next/navigation";
import { useGalleryDetails } from "@/components/customHook/useGalleryDetails"; 
import { useMatchedGallery } from "@/components/customHook/useMatchedGallery"; 
import { useDresses } from "@/components/customHook/useGalleryData"; 
import dynamic from "next/dynamic";

const OtherProductsSection = dynamic(() => import("../../../../../components/OtherProductsSection/page"), {
  ssr: true,
  loading: () => (
    <div className="skeleton-wrapper">
      <div className="other-products-skeleton">
        <div className="title-skeleton mb-4"></div>
        <div className="products-skeleton d-flex gap-3">
          <div className="product-card-skeleton"></div>
          <div className="product-card-skeleton"></div>
          <div className="product-card-skeleton"></div>
          <div className="product-card-skeleton"></div>
        </div>
      </div>
    </div>
  ),
});


const ShowImage = dynamic(() => import("@/components/ShowImage/page"), {
  ssr: false,
  loading: () => (
    <div className="skeleton-wrapper">
      {/* Main image skeleton */}
      <div className="main-image-skeleton mb-4"></div>

      {/* Thumbnail skeletons */}
      <div className="d-flex gap-3">
        <div className="thumbnail-skeleton"></div>
        <div className="thumbnail-skeleton"></div>
        <div className="thumbnail-skeleton"></div>
      </div>
    </div>
  ),
});

const RelatedSection = dynamic(() => import("../../../../../components/RelatedSection/page"), {
  ssr: true,
  loading: () => (
    <div className="skeleton-wrapper">
      <div className="related-section-skeleton">
        <div className="title-skeleton mb-4"></div>
        <div className="products-skeleton d-flex gap-3">
          <div className="product-card-skeleton"></div>
          <div className="product-card-skeleton"></div>
          <div className="product-card-skeleton"></div>
          <div className="product-card-skeleton"></div>
        </div>
      </div>
    </div>
  ),
});

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

  // Create a new ShareMenu component
  const ShareMenu = ({ productName, productId }) => {
    const [showMenu, setShowMenu] = useState(false);

    const handleShare = (platform) => {
      const baseUrl = "https://samah-elkasem.com";
      const productUrl = `${baseUrl}/gallery/sort/${productId}/${encodeURIComponent(
        productName
      )}`;

      const shareOptions = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          productUrl
        )}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          productUrl
        )}&text=${encodeURIComponent(
          `Check out ${productName} at Samah Elkasem Couture`
        )}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(
          `${productName} ${productUrl}`
        )}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(
          productUrl
        )}&text=${encodeURIComponent(productName)}`,
      };

      window.open(shareOptions[platform], "_blank");
    };

    return (
      <div className={styles.shareContainer}>
        <button
          className={styles.mainShareButton}
          onClick={() => setShowMenu(!showMenu)}
        >
          <i className="fas fa-share-alt"></i>
        </button>

        {showMenu && (
          <div className={styles.shareMenu}>
            <button onClick={() => handleShare("facebook")}>
              <i className="fab fa-facebook-f"></i>
            </button>
            <button onClick={() => handleShare("twitter")}>
              <i className="fab fa-twitter"></i>
            </button>
            <button onClick={() => handleShare("whatsapp")}>
              <i className="fab fa-whatsapp"></i>
            </button>
            <button onClick={() => handleShare("telegram")}>
              <i className="fab fa-telegram"></i>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <div className={styles.upperContect}>
        <div className={styles.sliderContainer}>
          <ShowImage images={galleryDetails?.images || []} />
        </div>

        <div className={styles.detailsContainer}>
          <h1 className={styles.productTitle}>{galleryDetails?.name}</h1>
          <p className={styles.productDescription}>
            {galleryDetails?.description}
          </p>
          <ShareMenu productName={galleryDetails?.name} productId={galleryId} />
        </div>
      </div>

      <RelatedSection
        matchedGallery={matchedGallery}
        sliderSettings={sliderSettings}
      />

      <OtherProductsSection dresses={dresses} sliderSettings={sliderSettings} />
    </div>
  );
}
