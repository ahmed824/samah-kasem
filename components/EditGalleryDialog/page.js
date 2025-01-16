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

export default function EditGalleryDialog({ visible, onHide, editingGallery, setEditingGallery, onUpdate, onImageUpload }) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="تعديل الصورة"
      className={styles.dialog}
      dismissableMask
    >
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="editCatId">الفئة</label>
          <Dropdown
            id="editCatId"
            value={editingGallery?.catId}
            options={categories}
            onChange={(e) =>
              setEditingGallery((prev) => ({ ...prev, catId: e.value }))
            }
            placeholder="اختر الفئة"
            className={styles.dropdown}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="editName">الاسم</label>
          <InputText
            id="editName"
            value={editingGallery?.name || ""}
            onChange={(e) =>
              setEditingGallery((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="editDescription">الوصف</label>
          <InputTextarea
            id="editDescription"
            value={editingGallery?.description || ""}
            onChange={(e) =>
              setEditingGallery((prev) => ({ ...prev, description: e.target.value }))
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
            uploadOptions={{ style: { display: 'none' } }}
            cancelOptions={{ style: { display: 'none' } }}
          />
        </div>
        <Button
          label="تحديث"
          icon="pi pi-check"
          className={styles.submitBtn}
          onClick={onUpdate}
        />
      </div>
    </Dialog>
  );
}
