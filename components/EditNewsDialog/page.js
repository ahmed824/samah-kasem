"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import { baseUrl } from "../baseUrl";  
import styles from "@/app/admin/news/News.module.css";

export default function EditNewsDialog({
  visible,
  onHide,
  newsData: initialNewsData,
  refetch
}) {
  const toast = useRef(null);
  const [newsData, setNewsData] = useState(initialNewsData);

  // Update local state when initialNewsData changes
  useEffect(() => {
    setNewsData(initialNewsData);
  }, [initialNewsData]);
  
  const handleImageUpload = (e) => {
    const files = e.files;
    const imagePromises = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then((base64Images) => {
      setNewsData((prev) => ({
        ...prev,
        images: [...(prev?.images || []), ...base64Images],
      }));
    });
  };

  const updateNews = async () => {
    try {
      await axios.post(`${baseUrl}/rest/tables.news/updateNews`, newsData);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "تم تحديث الخبر بنجاح",
      });
      onHide();
      refetch();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "فشل في تحديث الخبر",
      });
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={visible}
        onHide={onHide}
        header="تعديل الخبر"
        className={styles.dialog}
        dismissableMask
      >
        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">العنوان</label>
            <InputText
              id="name"
              value={newsData?.name || ""}
              onChange={(e) =>
                setNewsData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">الوصف</label>
            <InputTextarea
              id="description"
              value={newsData?.description || ""}
              onChange={(e) =>
                setNewsData((prev) => ({
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
              onSelect={handleImageUpload}
            />
          </div>

          <Button
            label="حفظ التعديلات"
            icon="pi pi-check"
            className={styles.submitBtn}
            onClick={updateNews}
          />
        </div>
      </Dialog>
    </>
  );
}
