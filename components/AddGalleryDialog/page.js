"use client";
import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import styles from "@/app/admin/gallery/Gallery.module.css";

const categories = [
  { label: 'زفاف', value: 1 },
  { label: 'خطوبة', value: 2 },
  { label: 'سواريه', value: 3 }
];

export default function AddGalleryDialog({
  visible,
  onHide,
  galleryData,
  setGalleryData,
  onSave,
  onImageUpload,
}) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="إضافة صورة جديدة"
      className={styles.dialog}
      dismissableMask
    >
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="catId">الفئة</label>
          <Dropdown
            id="catId"
            value={galleryData.catId}
            options={categories}
            onChange={(e) =>
              setGalleryData((prev) => ({ ...prev, catId: e.value }))
            }
            placeholder="اختر الفئة"
            className={styles.dropdown}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">الاسم</label>
          <InputText
            id="name"
            value={galleryData.name}
            onChange={(e) =>
              setGalleryData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">الوصف</label>
          <InputTextarea
            id="description"
            value={galleryData.description}
            onChange={(e) =>
              setGalleryData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={3}
          />
        </div>
        <div className={styles.formGroup}>
          <label>الصور</label>
          <FileUpload
            mode="advanced"
            multiple
            accept="image/*"
            maxFileSize={1000000}
            onSelect={onImageUpload}
            auto={true}
            chooseLabel="اختر الصور"
            emptyTemplate={<p>قم بسحب وإسقاط الصور هنا</p>}
            className={styles.fileUpload}
            uploadOptions={{ style: { display: "none" } }}
            cancelOptions={{ style: { display: "none" } }}
          />
        </div>
        <Button
          label="حفظ"
          icon="pi pi-check"
          className={styles.submitBtn}
          onClick={onSave}
        />
      </div>
    </Dialog>
  );
}
