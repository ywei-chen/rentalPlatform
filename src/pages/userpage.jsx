import "../ui/userpage.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export default function Userpage() {
  const { uid } = useParams();
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [storesMap, setStoresMap] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
      const bookingRef = collection(db, 'bookings');
      const q = query(bookingRef, where('userID', '==', uid));
      const querySnapshot = await getDocs(q);
      const bookingList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
      console.log(bookingList);
      setBookings(bookingList);

      const storeUids = [...new Set(bookingList.map(b => b.StoreID))];

      let storeNameMap =  {};
      for(const storeUid of storeUids){
        const storeDoc = await getDoc(doc(db, 'stores', storeUid));
        if(storeDoc.exists()){
          storeNameMap[storeUid] = storeDoc.data().storename;
        }else{
          storeNameMap[storeUid] = "未知商家";
        }
      }
      setStoresMap(storeNameMap);
      setLoading(false);
    };

    fetchProfile();
  }, [uid]);

  const handleCancel = async(bookingId, date) => {
    if (!window.confirm('確定要取消這筆預約嗎？')) return;

    try {
      const bookingRef = doc(db, 'bookings', bookingId);
      const bookingSnap = await getDoc(bookingRef);
      if (bookingSnap.exists()) {
        let currentData = bookingSnap.data();

        const updatedDates = currentData.bookingDate.filter(d => d !== date);

        if (updatedDates.length > 0) {
          await updateDoc(bookingRef, { bookingDate: updatedDates });
        } else {
          await deleteDoc(bookingRef);
        }

        setBookings(prev => prev.map(b => {
          if (b.id === bookingId) {
            return { ...b, bookingDate: b.bookingDate.filter(d => d !== date) };
          }
          return b;
        }).filter(b => b.bookingDate.length > 0));
      }
    } catch (error) {
       alert('取消失敗');
    }
  }

  if (!profile) return <div>載入中使用者資料...</div>;
  if (loading) return <div>載入中預約資訊...</div>;


  return (<>
    <div className="context">
      <h6>Hi, {profile.userName} 歡迎回來，您的預約資訊如下:</h6>
    </div>
    <div className="split"></div>
    {bookings.map(booking => (
      booking.bookingDate.map((date, index) => (
        <div className="bookingblock" key={`${booking.id}-${index}`}>
          <div className="storename me-2">{storesMap[booking.StoreID] || '未知商家'}</div>
          <div className="bookdate me-2">預約日期：{date}</div>
          <div className="bookstarttime">{`預約時間：${booking.bookingStartTime}:00 - ${booking.bookingEndTime}:00`}</div>
          <div className="text-end">
            <button className="buttonend" onClick={() => handleCancel(booking.id, date)}>取消預約</button>
          </div>
        </div>
      ))
    ))}
  </>

  );
}