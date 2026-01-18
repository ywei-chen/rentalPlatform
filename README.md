# 羽球場地租借平台(修改中)
- 自動化羽球場地租借系統，提供使用者與店家雙角色功能
- 實作完整預約流程：選擇場地 → 選擇時段 → 確認預約
- 支援多種租賃方案：時租、月租、季租、年租

## 技術棧

### Front-end
- React.js
- Vite
- React Router DOM
- Zustand (狀態管理)
- Framer Motion (動畫)
- Bootstrap
- CSS Modules

### Back-end
- Firebase Authentication
- Cloud Firestore

### 外部 API
- Google Maps Embed API
- NewsAPI
- 內政部國土測繪中心 API (縣市鄉鎮)

## 功能

### 使用者
- 註冊 / 登入
- 瀏覽場地資訊
- 預約場地
- 查看預約紀錄

### 店家
- 註冊 / 登入
- 設定場地租金
- 設定營業時間
- 管理預約 (取消預約)