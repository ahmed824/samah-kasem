import React from 'react';
import styles from './BigGallery.module.css';
import Gallery from '../gallery/page';

export default function BigGallery() {
    return (
        <div>
            <header className={styles.subHeader}>
                <div className={styles.overlay}>
                    <div className="container">
                        <h2 className={styles.title}>منتجات الاتيليه</h2>
                        <div className="link-wrapper d-flex flex-row">
                            <a href="/" className="normal">الرئيسية</a>
                            <i className="fa fa-angle-double-left" aria-hidden="true" />
                            <a href="/BigGallery" className="normal">المعرض</a>
                        </div>
                    </div>
                </div>
            </header>
            <Gallery />
        </div>
    );
}
