"use client";
import React, { useState, useRef } from "react";
import { useNews } from "@/components/customHook/useNews"; 
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import { baseUrl } from "@/components/baseUrl";  
import styles from "./News.module.css";
import dynamic from "next/dynamic";

const AddNewsDialog = dynamic(() => import('../../../components/AddNewsDialog/page'), {
  ssr: false,
})

const EditNewsDialog = dynamic(() => import('../../../components/EditNewsDialog/page'), {
  ssr: false,
})

const NewsTable = dynamic(() => import('../../../components/NewsTable/page'), {
  ssr: false,
})

export default function News() {
  const [editVisible, setEditVisible] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [visible, setVisible] = useState(false);
  const [newsData, setNewsData] = useState({
    name: "",
    description: "",
    images: [],
  });
  const toast = useRef(null);
  const { data: news, isLoading, refetch } = useNews();

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
        images: [...prev.images, ...base64Images],
      }));
    });
  };

  const saveNews = async () => {
    try {
      await axios.post(`${baseUrl}/rest/tables.news/saveNews`, newsData);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "تم حفظ الخبر بنجاح",
      });
      setVisible(false);
      refetch();
      setNewsData({ name: "", description: "", images: [] });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "فشل في حفظ الخبر",
      });
    }
  };

  const deleteNews = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الخبر؟")) {
      try {
        await axios.post(`${baseUrl}/rest/tables.news/deleteNews`, { id });
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "تم حذف الخبر بنجاح",
        });
        refetch();
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "فشل في حذف الخبر",
        });
      }
    }
  };

  const handleEdit = (rowData) => {
    setEditingNews({
      id: rowData.id,
      name: rowData.name,
      description: rowData.description,
      images: rowData.images || [],
    });
    setEditVisible(true);
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <EditNewsDialog
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        newsData={editingNews}
        refetch={refetch}
      />

      <div className={styles.header}>
        <h1>إدارة الأخبار</h1>
        <Button
          label="إضافة خبر جديد"
          icon="pi pi-plus"
          className={styles.addBtn}
          onClick={() => setVisible(true)}
        />
      </div>

      <NewsTable
        news={news}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={deleteNews}
      />

      <AddNewsDialog
        visible={visible}
        onHide={() => setVisible(false)}
        newsData={newsData}
        onNewsDataChange={setNewsData}
        onSubmit={saveNews}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}
