"use client";
import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import styles from "@/app/admin/news/News.module.css";

export default function AddNewsDialog({
  visible,
  onHide,
  newsData,
  onNewsDataChange,
  onSubmit,
  onImageUpload,
}) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="إضافة خبر جديد"
      className={styles.dialog}
      dismissableMask
    >
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">العنوان</label>
          <InputText
            id="name"
            value={newsData.name}
            onChange={(e) =>
              onNewsDataChange((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">الوصف</label>
          <InputTextarea
            id="description"
            value={newsData.description}
            onChange={(e) =>
              onNewsDataChange((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={5}
          />
        </div>

        <div className={styles.formGroup}>
          <label>الصور</label>
          <FileUpload
            mode="basic"
            multiple
            accept="image/*"
            maxFileSize={1000000}
            onSelect={onImageUpload}
          />
        </div>

        <Button
          label="حفظ"
          icon="pi pi-check"
          className={styles.submitBtn}
          onClick={onSubmit}
        />
      </div>
    </Dialog>
  );
}