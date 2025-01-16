import React from 'react'
import styles from "./gallery .module.css";
import dynamic from 'next/dynamic';
const Sort = dynamic(() => import('./sort/page'), {
  ssr: true
});

export default function Gallery() {
  return (
    <div className='mt-5'>
      <h2 className={styles.head}>معرضنا</h2>
      <p className={styles.desc}>
      لدينا جميع موديلات فساتين الزفاف والسوارية التي تناسب وترضي جميع الاذواق والرغبات لذا، تجدين فساتين افراح مختلفه وفساتين سوارية متعددة ، وأخرى متنوعة في تصاميم الياقة والاكمام، ولا ننسى أيضا اكسسوارات العروس أولها الطرحة والمجوهرات
      </p>
      <div className="container">
        <Sort />
      </div>
    </div>
  )
}
