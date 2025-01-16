"use client";
import React from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styles from "@/app/admin/videos/Vid.module.css";

export default function AddVideoDialog({ visible, onHide, videoData, setVideoData, onSave }) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header="إضافة فيديو جديد"
      className={styles.dialog}
      dismissableMask
    >
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">الاسم</label>
          <InputText
            id="name"
            value={videoData.name}
            onChange={(e) =>
              setVideoData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="path">المسار</label>
          <InputText
            id="path"
            value={videoData.path}
            onChange={(e) =>
              setVideoData((prev) => ({ ...prev, path: e.target.value }))
            }
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