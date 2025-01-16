"use client";
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import styles from "./VideosTable.module.css";

export default function VideosTable({ videos, isLoading, onEdit, onDelete }) {
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

  const videoTemplate = (rowData) => {
    return (
      <div className={styles.videoContainer}>
        <iframe
          src={rowData.path}
          title={rowData.name}
          frameBorder="0"
          allowFullScreen
          className={styles.videoFrame}
        />
      </div>
    );
  };

  return (
    <DataTable
      value={videos}
      loading={isLoading}
      paginator
      rows={10}
      className={styles.table}
      dir="rtl"
    >
      <Column  className={styles.column} field="name" header="الاسم" sortable />
      <Column className={styles.column} field="path" header="الفيديو" body={videoTemplate} />
      {/* <Column dir="rtl" field="formattedDate" header="التاريخ" sortable /> */}
      <Column className={styles.column} header="الإجراءات" body={actionBodyTemplate} />
    </DataTable>
  );
}