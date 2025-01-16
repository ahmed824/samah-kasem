"use client";

import React, { useRef, useState, useEffect } from "react";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-rotate.css";

import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgShare from "lightgallery/plugins/share";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgHash from "lightgallery/plugins/hash";
import lgRotate from "lightgallery/plugins/rotate";

import Slider from "react-slick";
import Image from "next/image";

import styles from "./ShowImage.module.css";
import { imageUrl } from "@/components/baseUrl";


export default function ShowImage({ images }) {
    const lightGalleryRef = useRef(null);
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        setNav1(sliderRef1);
        setNav2(sliderRef2);
    }, []);

    const settings1 = {
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        adaptiveHeight: true,
        asNavFor: nav2,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    autoplaySpeed: 2500,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    autoplaySpeed: 3000,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    autoplaySpeed: 3500,
                    adaptiveHeight: true,
                }
            }
        ]
    };
    
    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        focusOnSelect: true,
        asNavFor: nav1,
        centerMode: true,
        centerPadding: '0px',
        arrows: true,
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
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            }
        ]
    };
    

    return (
        <div className={styles.app}>
          <LightGallery
            plugins={[lgZoom, lgThumbnail, lgShare, lgHash, lgAutoplay, lgRotate]}
            selector=".slick__slide"
            enableDrag={true}
            enableSwipe={true}
            hideControlOnEnd={true}
            closeOnTap={true}
            closable={true}
            addClass="lg-custom-close"
          >
            <div className={styles.sliderContainer}>
              <Slider asNavFor={nav2} ref={(slider) => (sliderRef1 = slider)} {...settings1}>
                {images.map((image, index) => (
                  <div key={index}>
                    <a
                      className={`slick__slide ${styles.slickSlide}`}
                      href={`${imageUrl}${image.large}`}
                      data-lg-size="574-574"
                      data-src={`${imageUrl}${image.large}`}
                      data-thumb={`${imageUrl}${image.small}`}
                    >
                      <Image
                        src={`${imageUrl}${image.medium}`}
                        alt={`Gallery image ${index + 1}`}
                        width={574}
                        height={574}
                        objectFit="cover"
                        className={styles.imgResponsive}
                        quality={100}
                      />
                    </a>
                  </div>
                ))}
              </Slider>
    
              <div className={styles.thumbnailSlider}>
                <Slider asNavFor={nav1} ref={(slider) => (sliderRef2 = slider)} {...settings2}>
                  {images.map((image, index) => (
                    <div key={index} className={styles.thumbnailItem}>
                      <Image
                        src={`${imageUrl}${image.small}`}
                        alt={`Thumbnail ${index + 1}`}
                        width={118}
                        height={100}
                        objectFit="cover"
                        className={styles.thumbnailImage}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </LightGallery>
        </div>
      );
    }