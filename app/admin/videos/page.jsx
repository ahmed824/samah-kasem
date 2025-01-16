"use client";
import React, { useState, useRef } from "react";
import { useVideos } from "@/components/customHook/useVideos";  
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import { baseUrl } from "@/components/baseUrl";  
import styles from "./Vid.module.css";
import dynamic from "next/dynamic";

const VideosTable = dynamic(() => import('../../../components/VideosTable/page'), {
  ssr: false,
})

const AddVideoDialog = dynamic(() => import('../../../components/AddVideoDialog/page'), {
  ssr: false,
})

const EditVideoDialog = dynamic(() => import('../../../components/EditVideoDialog/page'), {
  ssr: false,
})

export default function Videos() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [videoData, setVideoData] = useState({ name: "", path: "" });
  const [editingVideo, setEditingVideo] = useState(null);
  const toast = useRef(null);
  const { data: videos, isLoading, refetch } = useVideos();

  const saveVideo = async () => {
    try {
      await axios.post(`${baseUrl}/rest/tables.news/saveVideo`, videoData);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "تم حفظ الفيديو بنجاح",
      });
      setVisible(false);
      refetch();
      setVideoData({ name: "", path: "" });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "فشل في حفظ الفيديو",
      });
    }
  };

  const updateVideo = async () => {
    try {
      await axios.post(`${baseUrl}/rest/tables.news/updateVideo`, editingVideo);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "تم تحديث الفيديو بنجاح",
      });
      setEditVisible(false);
      refetch();
      setEditingVideo(null);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "فشل في تحديث الفيديو",
      });
    }
  };

  const deleteVideo = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الفيديو؟")) {
      try {
        await axios.post(`${baseUrl}/rest/tables.news/deleteVideo`, { id });
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "تم حذف الفيديو بنجاح",
        });
        refetch();
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "فشل في حذف الفيديو",
        });
      }
    }
  };

  const handleEdit = (rowData) => {
    setEditingVideo(rowData);
    setEditVisible(true);
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <div className={styles.header}>
        <h1>إدارة الفيديوهات</h1>
        <Button
          label="إضافة فيديو جديد"
          icon="pi pi-plus"
          className={styles.addBtn}
          onClick={() => setVisible(true)}
        />
      </div>

      <VideosTable
        videos={videos}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={deleteVideo}
      />

      <AddVideoDialog
        visible={visible}
        onHide={() => setVisible(false)}
        videoData={videoData}
        setVideoData={setVideoData}
        onSave={saveVideo}
      />

      <EditVideoDialog
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        editingVideo={editingVideo}
        setEditingVideo={setEditingVideo}
        onUpdate={updateVideo}
      />
    </div>
  );
}
