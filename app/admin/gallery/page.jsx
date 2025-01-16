"use client";
import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";
import { baseUrl } from "@/components/baseUrl";  
import styles from "./Gallery.module.css";
import { useDresses } from "@/components/customHook/useGalleryData";  
import { Dropdown } from "primereact/dropdown";
import dynamic from "next/dynamic";

const GalleryTable = dynamic(() => import('../../../components/GalleryTable/page'), {
  ssr: false,
})

const EditGalleryDialog = dynamic(() => import('../../../components/EditGalleryDialog/page'), {
  ssr: false,
})


const AddGalleryDialog = dynamic(() => import('../../../components/AddGalleryDialog/page'), {
  ssr: false,
})

export default function Gallery() {
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedType, setSelectedType] = useState(1);

  const [editingGallery, setEditingGallery] = useState(null);
  const toast = useRef(null);
  const { data: gallery, isLoading, refetch } = useDresses(selectedType);

  const categoryTypes = [
    { label: "زفاف", value: 1 },
    { label: "خطوبة", value: 2 },
    { label: "سواريه", value: 3 },
  ];

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

    Promise.all(imagePromises).then((base64Strings) => {
      if (editVisible) {
        setEditingGallery((prev) => ({ ...prev, imageStrings: base64Strings }));
      } else {
        setGalleryData((prev) => ({ ...prev, imageStrings: base64Strings }));
      }
    });
  };

  const saveGallery = async () => {
    const formattedData = {
      catId: galleryData.catId, // Using the selected category ID from the dropdown
      name: galleryData.name,
      description: galleryData.description || "",
      imageStrings: galleryData.imageStrings || [],
    };

    try {
      await axios.post(
        `${baseUrl}/rest/tables.news/savegallery`,
        formattedData
      );
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "تم حفظ الصور بنجاح",
      });
      setVisible(false);
      refetch();
      // Reset form with initial state including catId
      setGalleryData({
        name: "",
        description: "",
        imageStrings: [],
        catId: 0, // Reset category selection
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "فشل في حفظ الصور",
      });
    }
  };

  // Update the initial state
  const [galleryData, setGalleryData] = useState({
    name: "",
    description: "",
    imageStrings: [],
    catId: null,
  });

  const updateGallery = async () => {
    const formattedData = {
      id: editingGallery.id,
      catId: editingGallery.catId,
      name: editingGallery.name,
      description: editingGallery.description || "",
      imageStrings: editingGallery.imageStrings || [],
    };

    try {
      await axios.post(
        `${baseUrl}/rest/tables.news/updategallery`,
        formattedData
      );
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "تم تحديث الصورة بنجاح",
      });
      setEditVisible(false);
      refetch();
      setEditingGallery(null);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "فشل في تحديث الصورة",
      });
    }
  };

  const deleteGallery = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذه الصورة؟")) {
      try {
        await axios.post(`${baseUrl}/rest/tables.news/deleteGallery`, { id });
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "تم حذف الصورة بنجاح",
        });
        refetch();
      } catch (error) {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "فشل في حذف الصورة",
        });
      }
    }
  };

  const handleEdit = (rowData) => {
    setEditingGallery({
      id: rowData.id,
      catId: rowData.catId,
      name: rowData.name,
      description: rowData.description || "",
      imageStrings: Array.isArray(rowData.image)
        ? rowData.image
        : [rowData.image],
    });
    setEditVisible(true);
  };

  return (
    <div className={styles.container}>
      <Toast ref={toast} />

      <div className={styles.header}>
        <h1>إدارة معرض الصور</h1>
        <Button
          label="إضافة صورة جديدة"
          icon="pi pi-plus"
          className={styles.addBtn}
          onClick={() => setVisible(true)}
        />
      </div>

      <div className={styles.filterSection}>
        <span className={styles.filterLabel}>اختر فئة الفساتين</span>
        <Dropdown
          value={selectedType}
          options={categoryTypes}
          onChange={(e) => setSelectedType(e.value)}
          placeholder="اختر الفئة"
          className={styles.categoryFilter}
        />
      </div>
      <GalleryTable
        gallery={gallery}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={deleteGallery}
      />

      <AddGalleryDialog
        visible={visible}
        onHide={() => setVisible(false)}
        galleryData={galleryData}
        setGalleryData={setGalleryData}
        onSave={saveGallery}
        onImageUpload={handleImageUpload}
      />

      <EditGalleryDialog
        visible={editVisible}
        onHide={() => setEditVisible(false)}
        editingGallery={editingGallery}
        setEditingGallery={setEditingGallery}
        onUpdate={updateGallery}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}
