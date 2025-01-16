"use client";
import React, { useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./LogIn.module.css";
import { Button } from "primereact/button";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "primereact/toast";
import axios from "axios";
import { baseUrl } from "@/components/baseUrl";  

const useLoginapi = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await axios.post(
          `${baseUrl}/rest/tables.news/login`,
          data,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 5000
          }
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  });
};

const login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: loginPost } = useLoginapi();
  const toast = useRef(null);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendData();
  };

  const loginData = useMemo(() => ({ 
    name: name,
    password: password 
  }), [name, password]);

  const sendData = () => {
    if (!name || !password) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please fill in all fields",
      });
      return;
    }

    loginPost(loginData, {
      onSuccess: (response) => {
        if (!response.saved) {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: response.reason || "Invalid credentials"
          });
          return;
        }

        localStorage.setItem("userId", response.id);
        localStorage.setItem("Rank", response.rank);

        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Login successful"
        });

        router.push("/");
      },
      onError: (error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Connection error. Please try again."
        });
      }
    });
  };

  return (
    <div className={styles.logInContainer}>
      <Toast ref={toast} />
      <div className={styles.logInContent}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">أدخل اسم المستخدم</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="اسم المستخدم"
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">كلمة المرور</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="*******"
            />
          </div>
          {/* <div className={styles.checkboxGroup}>
            <Link className={styles.forgett} href="/ForgetPass">
              هل نسيت كلمة السر ؟
            </Link>
          </div> */}
          <Button type="submit" className={styles.submitButton}>
            تسجيل الدخول
          </Button>
        </form>
        <p className={styles.footerText}>
          ليس لديك حساب؟ <Link href="/SignUp">إنشاء حساب</Link>
        </p>
      </div>
    </div>
  );
};

export default login;
