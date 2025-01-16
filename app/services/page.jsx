import React from "react";
import styles from "./services.module.css";
import Image from "next/image";

export default function Services() {
  return (
    <div className=" position-relative mt-3">
      <div className="container">
        <div className={styles.services}>
          <div>
            <h2 className="head">خدماتنا</h2>
            <p className={styles.desc}>
              .نحرص علي أن تظهري مع اتيليه سماح القاسم بأحدث واشيك إطلالة تميزك
              عن غيرك في ليلة العمر كما نوفر لكِ كل ما تحتاجين إليه لتكتمل فرحتك
              ، فنحن شركاء فرحتك في هذه الليلة حتي تكوني ملكة في ليلة زفافك
            </p>
          </div>
          <div className="row my-5">
            <div className="col-lg-4">
              <div className={styles["card-wrapper"]}>
                <div className={styles["img-wrapper"]}>
                  <Image
                    className={styles.imgOne}
                    src="/download.png"
                    width={300}
                    height={400}
                    alt="image dress 1"
                  />
                </div>
                <div className={styles["info-wrapper"]}>
                  <h4 className={styles.title}>فساتين الخطوبة</h4>
                  <p className={styles.content}>
                    أكبر وأحدث صيحات الموضة لفساتين الخطوبة وأكبر كوليكشن
                    لتختاري أفضل ما يناسبك وتطلي بإطلاله ساحره بارقى الالوان
                    المبهجة
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className={styles["card-wrapper"]}>
                <div className={styles["img-wrapper"]}>
                  <Image
                    className={styles.imgTwo}
                    src="/showOff/download.png"
                    width={300}
                    height={400}
                    alt="image dress 2"
                  />
                </div>
                <div className={styles["info-wrapper"]}>
                  <h4 className={styles.title}>فساتين السواريه </h4>
                  <p className={styles.content}>
                    مجموعة مميزة من فساتين السواريه بتصاميم انيقة ومميزة تناسب
                    اختيارك باحدث صيحات الموضة
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className={styles["card-wrapper"]}>
                <div className={styles["img-wrapper"]}>
                  <Image
                    className={styles.imgThree}
                    src="/showOff/download (1).png"
                    width={300}
                    height={400}
                    alt="image dress 3"
                  />
                </div>
                <div className={styles["info-wrapper"]}>
                  <h4 className={styles.title}> فساتين الزفاف</h4>
                  <p className={styles.content}>
                    يوجد في اتيليه سماح القاسم مجموعة مميزه ومختلفه من فساتين
                    الزفاف لتظهري بأكثر إطلالة أنيقه في ليلة العمر فساتين فساتين
                    مميزة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
