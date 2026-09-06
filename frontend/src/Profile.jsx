import { useEffect, useState } from "react";
import API from "./api";

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await API.get("/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(response);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <h2>My Profile</h2>
            <p><b>Username:</b> {user.username}</p>
            <p><b>Email:</b> {user.email}</p>
        </div>
    );
}

export default Profile;