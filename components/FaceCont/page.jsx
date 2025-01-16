import styles from './FaceCont.module.css';

export default function FacebookContact() {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.textSection}>
                    <h2 className={styles.title}>تواصل معنا عبر صفحتنا علي موقع فيس بوك</h2>
                    <p className={styles.description}>
                        تواصلوا معنا الآن عبر صفحتنا علي الفيس بوك لمتابعة أجدد وأحدث تشكيلة من فساتين الزفاف والسواريه
                    </p>
                </div>
                <div className={styles.fbWidget}>
                    <iframe
                        className={styles.fbIframe}
                        scrolling="no"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fsamah.elkasem%2F&amp;tabs=timeline&amp;width=340&amp;height=900&amp;small_header=false&amp;adapt_container_width=true&amp;hide_cover=false&amp;show_facepile=true&amp;appId=303509326813372"
                        title="Facebook Page"
                    />
                </div>
            </div>
        </div>
    );
}
