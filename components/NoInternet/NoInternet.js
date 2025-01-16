import React from 'react'
import { FaWifi } from 'react-icons/fa'
import styles from './NoInternet.module.css'

export default function NoInternet() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <FaWifi className={styles.wifiIcon} />
        </div>
        <h1 className={styles.title}>لا يوجد اتصال بالإنترنت</h1>
        <p className={styles.message}>يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى</p>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  )
}
