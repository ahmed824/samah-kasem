"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./sort.module.css";
import Link from "next/link";
import { imageUrl } from "@/components/baseUrl"; 
import Loader from "@/components/Loader/page";
import { useCategories, useDresses } from "@/components/customHook/useGalleryData";
import dynamic from "next/dynamic";
const NoInternet = dynamic(() => import('@/components/NoInternet/NoInternet'), {
  loading: () => null,
  ssr: false
});

const Sort = () => {
  const [selectedType, setSelectedType] = useState(null);
  
  const { data: categories = [],error } = useCategories();
  const { data: dresses = [] , isLoading,isError } = useDresses(selectedType);

  React.useEffect(() => {
    if (categories.length > 0 && !selectedType) {
      setSelectedType(categories[0].id);
    }
  }, [categories, selectedType]);

  const handleCategoryChange = (categoryId) => {
    setSelectedType(categoryId);
  };

  if (isLoading) {
    return <Loader />
  }

  if (error || isError) {
    return <NoInternet />;
  }

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.buttons}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={selectedType === category.id ? styles.active : ""}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className={styles.imageGrid}>
        {dresses.map((dress) => (
          <div key={dress.id} className={styles.imageWrapper}>
            <Link href={`/gallery/sort/${dress.id}/${dress.name.replace(/\s/g, "-")}`} className={styles.imgLink}>
              <Image
                src={`${imageUrl}${dress.image}`}
                alt={dress.name}
                width={200}
                height={300}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sort;
