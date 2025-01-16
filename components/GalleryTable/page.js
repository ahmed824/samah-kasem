"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import styles from "./GalleryTable.module.css";
import { imageUrl } from "../baseUrl"; 
import Image from "next/image";

export default function GalleryTable({ gallery, isLoading, onEdit, onDelete }) {
  const actionBodyTemplate = (rowData) => {
    return (
      <div className={styles.actionButtons}>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          onClick={() => onEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          onClick={() => onDelete(rowData.id)}
        />
      </div>
    );
  };

  const imageTemplate = (rowData) => {
    return (
      <div className={styles.imageContainer}>
        <Image
          src={`${imageUrl}${rowData.image}`} 
          alt={rowData.name}
          className={styles.galleryImage}
          width={100}
          height={100}
        />
      </div>
    );
  };

  return (
    <DataTable
      value={gallery}
      loading={isLoading}
      paginator
      rows={10}
      className={styles.table}
      dir="rtl"
    >
      <Column dir="rtl" field="name" header="الاسم" sortable />
      <Column dir="rtl" field="image" header="الصورة" body={imageTemplate} />
      {/* <Column dir="rtl" field="catId" header="النوع" sortable /> */}
      <Column dir="rtl" header="الإجراءات" body={actionBodyTemplate} />
    </DataTable>
  );
}