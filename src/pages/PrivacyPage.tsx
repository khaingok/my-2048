import React, { useState } from "react";
import axios from "axios";
import "../styles/PrivacyPage.css";

export default function PrivacyPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        "http://localhost:5000/api/users/password",
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to update password.");
    }
  };

  return (
    <div className="privacy-page">
      <form className="privacy-form" onSubmit={handleUpdate}>
        <h2>Update Password</h2>
        <label htmlFor="oldPassword">Current Password</label>
        <input
          id="oldPassword"
          type="password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          required
        />
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Re-enter New Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Update Password</button>
        {message && <div className="privacy-message">{message}</div>}
      </form>
    </div>
  );
}