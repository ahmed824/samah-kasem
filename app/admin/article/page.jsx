"use client";

import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import styles from "./Article.module.css";
import dynamic from "next/dynamic";
import { useArticles, useSaveArticle } from "@/components/customHook/useArticles";

const ArticlesTable = dynamic(() => import('@/components/table/page'), {
  ssr: false,
})


export default function Articles() {
  const [visible, setVisible] = useState(false);
  const [article, setArticle] = useState({
    name: "",
    content: "",
    description: "",
    imageString: "",
  });

  const { data: articles = [], isLoading } = useArticles();
  const { mutate: saveArticle } = useSaveArticle();
  const toast = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setArticle((prev) => ({
          ...prev,
          imageString: base64String,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const articleData = {
      name: article.name,
      content: article.content,
      description: article.content.substring(0, 200), // Creating description from content
      imageString: article.imageString,
    };

    saveArticle(articleData, {
      onSuccess: () => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "تم حفظ المقالة بنجاح",
        });
        setVisible(false);
        setArticle({
          name: "",
          content: "",
          description: "",
          imageString: "",
        });
      },
      onError: (error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to save article",
        });
        console.error("Save failed:", error);
      },
    });
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <div className={styles.header}>
        <h1>إدارة المقالات</h1>
        <Button
          label="إضافة مقال جديد"
          icon="pi pi-plus"
          className={styles.addBtn}
          onClick={() => setVisible(true)}
        />
      </div>

      <ArticlesTable articles={articles} isLoading={isLoading} />

      <Dialog
        visible={visible}
        onHide={() => setVisible(false)}
        header="إضافة مقال جديد"
        className={styles.dialog}
        dismissableMask
      >
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">العنوان</label>
            <InputText
              id="name"
              value={article.name}
              onChange={(e) => setArticle({ ...article, name: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="content">المحتوى</label>
            <Editor
              value={article.content}
              onTextChange={(e) =>
                setArticle({ ...article, content: e.htmlValue })
              }
              style={{ height: "320px" }}
            />
          </div>

          <div className={styles.formGroup}>
            <label>الصورة</label>
            <FileUpload
              mode="basic"
              accept="image/*"
              maxFileSize={1000000}
              onSelect={handleImageUpload}
            />
          </div>

          <Button type="submit" label="حفظ" className={styles.submitButton} />
        </form>
      </Dialog>
    </div>
  );
}
