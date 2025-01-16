"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './NewsSection.module.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNews } from '../../components/customHook/useNews';
import { imageUrl } from '../../components/baseUrl';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={`${className} ${styles.customArrow} ${styles.nextArrow}`} onClick={onClick}>
            <FaChevronRight />
        </div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={`${className} ${styles.customArrow} ${styles.prevArrow}`} onClick={onClick}>
            <FaChevronLeft />
        </div>
    );
}

export default function NewsSection() {
    const [mounted, setMounted] = useState(false);
    const { data: newsItems = [] } = useNews();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    return (
        <div className={`${styles.newsSection} mt-5`}>
            <h2 className={styles.sectionTitle}>اخر اخبار أتيليه سماح القاسم</h2>
            <Slider {...settings}>
                {newsItems.map((item) => (
                    <div key={item.id}>
                        <Link href={`/news/${item.id}/${item.name.replace(/\s/g, "-")}`} className={styles.newsCard}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={`${imageUrl}${item.imageId}`}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className={`${styles.image} object-cover`}
                                    loading='lazy'
                                    priority={false}
                                />
                                <div className={styles.overlay}></div>
                                <span className={styles.newsTitle}>{item.name}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}
