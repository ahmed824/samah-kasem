"use client";
import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import styles from "@/app/admin/article/Article.module.css";

export default function EditArticleDialog({
  visible,
  onHide,
  article,
  onArticleChange,
  onSubmit,
  onImageUpload,
}) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="تعديل المقال"
      className={styles.dialog}
      dismissableMask
      style={{ width: "50vw" , direction:"rtl"}}
    >
      <div className={styles.editForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">العنوان</label>
          <InputText
            id="name"
            value={article?.name || ""}
            onChange={(e) =>
              onArticleChange({ ...article, name: e.target.value })
            }
            className="w-full"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">المحتوى</label>
          <Editor
            value={article?.content || ""}
            onTextChange={(e) =>
              onArticleChange({ ...article, content: e.htmlValue })
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
            onSelect={onImageUpload}
            className="w-full"
          />
        </div>

        <div className={styles.formActions}>
          <Button
            label="حفظ التغييرات"
            icon="pi pi-check"
            onClick={onSubmit}
            className="p-button-success"
          />
          <Button
            label="إلغاء"
            icon="pi pi-times"
            onClick={onHide}
            className="p-button-secondary"
          />
        </div>
      </div>
    </Dialog>
  );
}
