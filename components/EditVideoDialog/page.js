"use client";
import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styles from "@/app/admin/videos/Vid.module.css";

export default function EditVideoDialog({ visible, onHide, editingVideo, setEditingVideo, onUpdate }) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="تعديل الفيديو"
      className={styles.dialog}
      dismissableMask
    >
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="editName">الاسم</label>
          <InputText
            id="editName"
            value={editingVideo?.name || ""}
            onChange={(e) =>
              setEditingVideo((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="editPath">المسار</label>
          <InputText
            id="editPath"
            value={editingVideo?.path || ""}
            onChange={(e) =>
              setEditingVideo((prev) => ({ ...prev, path: e.target.value }))
            }
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
