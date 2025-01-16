import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import styles from '@/app/gallery/sort/[id]/[name]/SingleProduct.module.css';
import { imageUrl } from '../baseUrl';

export default function OtherProductsSection({ dresses = [], sliderSettings }) {
  if (!Array.isArray(dresses) || dresses.length === 0) {
    return null;
  }

  return (
    <section className={styles.otherProductsSection}>
      <h2 className={styles.otherProductsTitle}>فساتين أخرى</h2>
      <Slider {...sliderSettings} className={styles.otherProducts}>
        {dresses.map((product) => (
          <Link
            href={`/gallery/sort/${product.id}/${product.name?.replace(/\s/g, "-") || ''}`}
            key={product.id}
            className={styles.relatedProduct}
          >
            <Image
              src={`${imageUrl}${product.image}`}
              alt={`صورة ${product.title || ''}`}
              className={styles.relatedImage}
              width={150}
              height={200}
            />
            <p className={styles.relatedProductTitle}>{product.title}</p>
          </Link>
        ))}
      </Slider>
    </section>
  );
}
