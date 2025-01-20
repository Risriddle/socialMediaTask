import React, { useState, useRef } from "react";
import { uploadData } from "../services/api";
import "../css/UserForm.css";

const UserForm = () => {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [isUploading,setisUploading]=useState(false);

  const fileInputRef = useRef(null); 

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    addImages(files);
  };

  const addImages = (files) => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...files]);
    setPreview([...preview, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...preview];
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setPreview(newPreviews);
    if (fileInputRef.current) fileInputRef.current.value = ""; 
  };

  const clearImages = () => {
    setImages([]);
    setPreview([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setisUploading(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("handle", handle);
    images.forEach((image) => {
      formData.append("images", image);
    });

    console.log(...formData);

    try {
      const res = await uploadData(formData);
      console.log(res, "response in user form submission");
      alert("Form Submitted Successfully!");
      
     setisUploading(false);
      setName("");
      setHandle("");
      setImages([]);
      setPreview([]);
      if (fileInputRef.current) fileInputRef.current.value = ""; 
    } 
    catch (error) {
      console.log("Error while uploading data: ", error);
    }
  };

  return (
    <div className="form-container">
      <h2>User Information</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Social Media Handle:</label>
        <input type="text" value={handle} onChange={(e) => setHandle(e.target.value)} required />

        <label>Upload Images:</label>
        <input type="file" accept="image/*" multiple onChange={handleImageUpload} ref={fileInputRef} />

        <div className="image-preview">
          {preview.map((src, index) => (
            <div key={index} className="image-container">
              <img src={src} alt="preview" className="preview-img" />
              <button type="button" className="remove-btn" onClick={() => removeImage(index)}>
                ✖
              </button>
            </div>
          ))}
        </div>

        {preview.length > 0 && (
          <button type="button" onClick={clearImages} className="clear-btn">
            Clear Images
          </button>
        )}

        <button type="submit">{isUploading?'Uploading':'Upload'}</button>
      </form>
    </div>
  );
};

export default UserForm;
