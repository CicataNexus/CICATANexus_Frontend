import React, { useEffect, useState } from "react";

const SecureImage = ({ photoId, alt, className = "" }) => {
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            if (!photoId) return;

            try {
                const token = localStorage.getItem("token");
                const response = await fetch(
                    `http://${import.meta.env.VITE_SERVER_IP}:${
                        import.meta.env.VITE_SERVER_PORT
                    }/v1/photo/${photoId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) throw new Error("Image fetch failed");

                const blob = await response.blob();
                const imageObjectUrl = URL.createObjectURL(blob);
                setImageUrl(imageObjectUrl);
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };

        fetchImage();
    }, [photoId]);

    if (!imageUrl) return null;

    return <img src={imageUrl} alt={alt} className={className} />;
};

export default SecureImage;
