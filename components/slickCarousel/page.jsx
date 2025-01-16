'use client';

import Image from "next/image";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slick.module.css";

const images = [
    "/slickCarousel/01.png",
    "/slickCarousel/2.png",
    "/slickCarousel/4.png",
    "/slickCarousel/10.png",
];

export default function SimpleSlider() {
    const settings = {
        focusOnSelect: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index} className={styles.slide}>
                        <Image
                            src={src}
                            alt={`Slide ${index + 1}`}
                            width={600}
                            height={400}
                            className={styles.image}
                            priority={index === 0} // Add priority to first image only
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                        <div className={styles.overlay}>
                           <h3 className={styles.text}> أكبر وأحدث صيحات الموضة</h3>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
