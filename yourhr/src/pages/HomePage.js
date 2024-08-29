import React, { useState } from "react";
import axios from "axios";
import { message, Input, Form, Button } from "antd";

const HomePage = () => {
  const [form] = Form.useForm(); // Use Ant Design form instance
  const [file, setFile] = useState(null);

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleUpload = async (values) => {
    if (!file) {
      message.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("graduation", values.graduation);
    formData.append("resume", file);

    try {
      const token = localStorage.getItem("authToken"); // Retrieve token
      const res = await axios.post("http://localhost:5000/user/upload-resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` // Include token
        },
      });

      if (res.data.success) {
        message.success("Resume uploaded successfully!");
        form.resetFields(); // Reset form fields after successful upload
        setFile(null); // Clear selected file
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      message.error("Something went wrong while uploading the resume.");
    }
  };

  return (
    <div className="form-container">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpload}
        className="register-form"
      >
        <h3 className="text-center">Fill up Details</h3>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Name is required' }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label="Graduation" name="graduation" rules={[{ required: true, message: 'Graduation year is required' }]}>
          <Input type="text" />
        </Form.Item>
        <Form.Item label="Resume" name="resume">
          <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
        </Form.Item>
        <Button type="primary" htmlType="submit">Upload Resume</Button>
      </Form>
    </div>
  );
};

export default HomePage;
