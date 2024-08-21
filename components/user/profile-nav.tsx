"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import UserTabs from "./user-tabs";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";

const ProfileNav = () => {
  const { data: session } = useSession();
  const [image, setImage] = useState(
    session?.user?.image || "/profile-pic.avif"
  );

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("email", session?.user?.email);

      try {
        const response = await fetch("/api/upload-profile-image", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setImage(data.data.image);
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("An error occurred while uploading the image", error);
      } finally {
        URL.revokeObjectURL(imageUrl);
      }
    } else {
      console.error("Invalid file type");
    }
  };

  return (
    <div className="bg-white bg-opacity-90 w-full h-full shadow-lg p-4 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="relative cursor-pointer">
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={handleImageUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Image
            src={image}
            alt="Profile"
            width={75}
            height={75}
            className="rounded-lg cursor-pointer"
          />
          <FaPlusCircle className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 text-white bg-gray-800 rounded-full" />
        </div>
        <div>
          <h1 className="font-bold">{}</h1>
          <p className="text-sm text-gray-500">{session?.user?.email}</p>
        </div>
        <div className="w-full flex justify-end items-center">
          <UserTabs />
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
