"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  email: string;
  isAdmin: boolean;
  username: string;
  surname: string;
}

interface EditModalProps {
  isOpen: boolean;
  title: string;
  fields: { [key: string]: string };
  onSave: (updatedFields: { [key: string]: string }) => void;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  title,
  fields,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(() =>
    Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, value || ""])
    )
  );

  useEffect(() => {
    setFormData(
      Object.fromEntries(
        Object.entries(fields).map(([key, value]) => [key, value || ""])
      )
    );
  }, [fields]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6  shadow-lg w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="space-y-4">
          {Object.keys(fields).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                className="mt-2 p-2 block w-full border-gray-300  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-black text-white transition ease duration-300 hover:bg-[#A53E4C]"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 text-sm bg-[#A53E4C] text-white  hover:bg-black transition ease-in-out duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

const AccountPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [billingAddress, setBillingAddress] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalFields, setModalFields] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      toast.error("Please log in first!");
      window.location.href = "/account/login";
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data.user);
        setBillingAddress(data.user.address || "No address set");
        toast.success("Profile loaded successfully!");
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Error fetching profile. Please log in again.");
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        window.location.href = "/account/login";
      }
    };

    fetchProfile();
  }, []);

  const openEditModal = (title: string, fields: { [key: string]: string }) => {
    setModalTitle(title);
    setModalFields(fields);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedFields: { [key: string]: string }) => {
    setIsModalOpen(false);

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3001/api/auth/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedFields),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      if (updatedFields.address) {
        setBillingAddress(updatedFields.address);
      } else {
        setUser((prevUser) =>
          prevUser ? { ...prevUser, ...updatedFields } : prevUser
        );
      }

      toast.success("Information updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading account details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-6 py-12 bg-white">
      <div className="w-full max-w-lg p-6">
        <h2 className="text-lg text-center font-semibold mb-2">{user.email}</h2>

        <div className="text-center flex items-center justify-center gap-1 text-black mb-6">
          (<span className="text-[17px]">not</span>{" "}
          <div className="font-semibold md:text-[17px] text-[15px]">
            {user.email}
          </div>
          ?{" "}
          <span
            className="cursor-pointer text-[15px]"
            onClick={() => {
              localStorage.removeItem("token");
              sessionStorage.removeItem("token");
              window.location.href = "/account/login";
            }}
          >
            Sign out
          </span>
          ).
        </div>

        {user.isAdmin && (
          <div className="text-center mb-4">
            <a
              href="/admin"
              className="inline-block px-2 py-1 bg-black text-white hover:bg-[#A53E4C] transition ease-in-out duration-200"
            >
              Admin Page
            </a>
          </div>
        )}

        <div className="border-t pt-4 mt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Profile Information</h3>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Surname:</strong> {user.surname}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button
            onClick={() =>
              openEditModal("Edit Profile", {
                username: user.username || "",
                surname: user.surname || "",
              })
            }
            className="text-sm hover:text-[#A53E4C] mt-2"
          >
            Edit Profile
          </button>
        </div>

        <div className="border-t pt-4 mt-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Billing Address</h3>
          <p>{billingAddress}</p>
          <button
            onClick={() =>
              openEditModal("Edit Billing Address", {
                address: billingAddress || "",
              })
            }
            className="text-sm hover:text-[#A53E4C] mt-2"
          >
            Edit Billing Address
          </button>
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        title={modalTitle}
        fields={modalFields}
        onSave={handleSave}
        onClose={() => setIsModalOpen(false)}
      />

      <ToastContainer />
    </div>
  );
};

export default AccountPage;
