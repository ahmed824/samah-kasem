import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import styles from '@/app/gallery/sort/[id]/[name]/SingleProduct.module.css';
import { imageUrl } from '../baseUrl'; 

export default function RelatedSection({ matchedGallery, sliderSettings }) {
  return (
    <section className={styles.relatedSection}>
      <h2 className={styles.relatedTitle}>فساتين مشابهة</h2>
      <Slider {...sliderSettings} className={styles.relatedProducts}>
        {matchedGallery?.list?.map((product) => (
          <div key={product.id}>
            <Link
              href={`/gallery/sort/${product.id}/${product.name.replace(
                /\s/g,
                "-"
              )}`}
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
  );
}
