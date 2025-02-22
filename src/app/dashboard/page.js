'use client'
import '../style3.css';
import { auth } from "../firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (loading) {
    return <h2 className='loading'>Loading...</h2>;
  }

  return (
    <div className="boxno1">
      <div className="boxno2">
        <h2 className="message">Welcome, {user?.displayName || "User"} 👋</h2>
        <p className="email">{user?.email}</p>
        <div className="logout">
          <button onClick={handleLogout} className="button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
