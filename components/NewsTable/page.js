"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import styles from "@/app/admin/news/News.module.css";
import Image from "next/image";
import { imageUrl } from "../baseUrl";  

export default function NewsTable({ news, isLoading, onEdit, onDelete }) {
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
      <Image
        src={`${imageUrl}${rowData.imageId}`}
        alt={rowData.ame}
        width={70}
        height={70}
        loading="lazy"
        className="d-flex justify-content-center m-auto"
      />
    );
  };

  return (
    <DataTable
      value={news}
      loading={isLoading}
      paginator
      rows={10}
      className={styles.table}
      dir="rtl"
    >
      <Column dir="rtl" field="name" header="العنوان" sortable />
      <Column
        dir="rtl"
        field="imageId"
        header="معرف الصورة"
        body={imageTemplate}
        sortable
      />
      <Column dir="rtl" header="الإجراءات" body={actionBodyTemplate} />
    </DataTable>
  );
}
