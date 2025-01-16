"use client";
import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Register.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "@/components/baseUrl"; 
import { Toast } from "primereact/toast";

// Register Mutation
const useSave = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${baseUrl}/rest/tables.news/signUp`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["ProductJsons"]);
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });
};

export default function SignUp() {
  const router = useRouter();
  const { mutate: Save } = useSave();
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    userName: "",
    name: "",
    mail: "",
    phone: "",
    password: "",
    rank: "Admin",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      userName: "",
      mail: "",
      password: "",
      phone: "",
    });
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const requiredFields = ["userName", "name", "mail", "phone", "password"];

      for (const field of requiredFields) {
        if (!formData[field]) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: `${field} مطلوب.`,
          });
          return;
        }
      }

      Save(formData, {
        onSuccess: () => {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Data saved successfully",
          });
          resetForm();
          setTimeout(() => {
            router.push("/logIn");
          }, 1000);
        },
        onError: (error) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Upload failed",
          });
          console.error("Upload failed:", error);
        },
      });
    },
    [formData, Save, router, resetForm]
  );

  return (
    <div className={styles.signUpContainer}>
      <Toast ref={toast} />
      <h2 className={styles.heading}>إنشاء حساب</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="الاسم"
          value={formData.name}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="text"
          name="userName"
          placeholder="اسم المستخدم"
          value={formData.userName}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="email"
          name="mail"
          placeholder="الإيميل"
          value={formData.mail}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="الباسورد"
          value={formData.password}
          onChange={handleChange}
          className={styles.inputField}
          required
          minLength={4}
          pattern=".{4,}"
          title="كلمة المرور يجب أن تكون 4 أحرف على الأقل"
        />
        <input
          type="text"
          name="phone"
          placeholder="رقم الهاتف"
          value={formData.phone}
          onChange={handleChange}
          className={styles.inputField}
          required
        />
        <button type="submit" className={styles.submitButton}>
          إنشاء حساب
        </button>
      </form>
      <p className={styles.footerText}>
        هل أنت عضو بالفعل؟ <Link href="/login">تسجيل الدخول</Link>
      </p>
    </div>
  );
}
