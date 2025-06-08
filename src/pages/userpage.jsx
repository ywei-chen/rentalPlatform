import "../ui/userpage.css"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Userpage() {
  const { uid } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const docSnap = await getDoc(doc(db, "users", uid));
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };
    fetchProfile();
  }, [uid]);

  if (!profile) return <div>載入中...</div>;

    return (<>
        <div className="context">
            <h6>Hi, {profile.userName} 歡迎回來，您的預約資訊如下:</h6>
        </div>
        <div className="split"></div>
        <div className="bookingblock">
            <div className="storename"></div>
            <div className="bookstarttime"></div>
            <div className="bookendtime"></div>
            <button>取消</button>
        </div>
    </>
    
  );
}