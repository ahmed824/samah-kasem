"use client";

import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import styles from './vids.module.css';
import { useVideos } from '../../components/customHook/useVideos';
import Loader from '../../components/Loader/page';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import dynamic from 'next/dynamic';
const NoInternet = dynamic(() => import('@/components/NoInternet/NoInternet'), {
    loading: () => null,
    ssr: false
  });
  

const LazyVideo = ({ src, title, className }) => {
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setShouldLoad(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={videoRef} className={styles.videoContainer}>
            {shouldLoad && (
                <iframe
                    className={className}
                    src={src}
                    title={title}
                    width="150"
                    height="280"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            )}
        </div>
    );
};

const NextArrow = ({ className, onClick }) => (
    <div className={`${className} ${styles.customArrow} ${styles.nextArrow}`} onClick={onClick}>
        <FaChevronRight />
    </div>
);

const PrevArrow = ({ className, onClick }) => (
    <div className={`${className} ${styles.customArrow} ${styles.prevArrow}`} onClick={onClick}>
        <FaChevronLeft />
    </div>
);

export default function VidSection() {
    const { data: videos, isLoading, error } = useVideos();

    if (isLoading) return <Loader />;
    if (error) return <NoInternet />;

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        rtl: true,
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
            }
        ]
    };

    return (
        <div className={styles.vidSection}>
            <h2 className="head">فيديو اتيليه سماح القاسم</h2>
            <div className="container">
                <div className="row">
                    {videos && videos[0] && (
                        <div className={`col-md-12 ${styles.oneVid}`}>
                            <LazyVideo
                                src={videos[0].path}
                                title="Featured Video"
                                className={styles.mainVideo}
                            />
                            <h3 className={styles.desc}>اتيليه سماح القاسم</h3>
                            <hr className={styles.line} />
                        </div>
                    )}
                </div>

                <Slider {...settings}>
                    {videos?.map((video) => (
                        <div key={video.id}>
                            <div className={styles.newsCard}>
                                <div className={styles.imageWrapper}>
                                    <LazyVideo
                                        src={video.path}
                                        title={video.name}
                                        className={styles.vid}
                                    />
                                    <span className={styles.title}>{video.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}