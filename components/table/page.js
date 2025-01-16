"use client";

import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import styles from "@/app/admin/article/Article.module.css";
import Image from "next/image";
import { imageUrl } from "../baseUrl";  
import { useDeleteArticle, useUpdateArticle } from "../customHook/useArticles";
import dynamic from "next/dynamic";


const EditArticleDialog = dynamic(() => import('../EditArticleDialog/page'), {
  ssr: false,
})

export default function ArticlesTable({ articles, isLoading }) {
    const [editDialog, setEditDialog] = useState(false);
    const [editArticle, setEditArticle] = useState(null);

  const { mutate: deleteArticle } = useDeleteArticle();
  const { mutate: updateArticle } = useUpdateArticle();


  const handleEdit = (rowData) => {
    setEditArticle({
        id: rowData.id,
        name: rowData.name,
        content: rowData.content,
        description: rowData.description,
        imageString: rowData.imageString
    });
    setEditDialog(true);
};


const handleImageUpload = (e) => {
    const file = e.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setEditArticle(prev => ({
                ...prev,
                imageString: base64String
            }));
        };
        reader.readAsDataURL(file);
    }
};

const handleSubmitEdit = () => {
    updateArticle(editArticle, {
        onSuccess: () => {
            toast.current.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Article updated successfully'
            });
            setEditDialog(false);
        },
        onError: (error) => {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Failed to update article'
            });
        }
    });
};


  const imageBodyTemplate = (rowData) => {
    return (
      <div className={styles.imageContainer}>
        <Image
          src={`${imageUrl}${articles.image}`}
          alt={rowData.name}
          className={styles.thumbnailImage}
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
          width={100}
          height={100}
        />
      </div>
    );
  };

  const onDelete = (id) => {
    deleteArticle(id, {
      onSuccess: () => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "تم حذف المقالة بنجاح",
        });
      },
      onError: (error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to delete article",
        });
      },
    });
  };

  const contentBodyTemplate = (rowData) => {
    return (
      <div
        className={styles.contentCell}
        dangerouslySetInnerHTML={{ __html: rowData.content }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
        <div className={styles.actionButtons}>
            <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => handleEdit(rowData)}
            />
            <Button
                icon="pi pi-trash"
                className="p-button-rounded p-button-danger"
                onClick={() => onDelete(rowData.id)}
            />
        </div>
    );
};

  return (
    <>
      <EditArticleDialog
        visible={editDialog}
        onHide={() => setEditDialog(false)}
        article={editArticle}
        onArticleChange={setEditArticle}
        onSubmit={handleSubmitEdit}
        onImageUpload={handleImageUpload}
      />

      <DataTable
        value={articles}
        loading={isLoading}
        paginator
        rows={10}
        className={styles.table}
        emptyMessage="لا توجد مقالات"
        responsiveLayout="scroll"
      >
        <Column field="name" header="العنوان" sortable />
        <Column header="الصورة" body={imageBodyTemplate} />
        <Column
          field="description"
          header="الوصف"
          sortable
          style={{ maxWidth: "300px" }}
        />
        <Column
          header="المحتوى"
          body={contentBodyTemplate}
          style={{ maxWidth: "400px" }}
        />
        <Column
          header="الإجراءات"
          body={actionBodyTemplate}
          style={{ width: "150px" }}
        />
      </DataTable>
    </>
  );
}
