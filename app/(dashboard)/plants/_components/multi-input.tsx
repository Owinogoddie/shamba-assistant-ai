"use client";
import axios from "axios";
import { LucideCamera } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";

export const MultimodalInput = ({ onResponse, onLoadingChange }) => {
  const [image, setImage] = useState(null);
  //   const [text, setText] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const webcamRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);

      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  //   const handleTextChange = (event) => setText(event.target.value);
  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setCameraActive(false);
  };
  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image and provide text.");
      return;
    }

    setLoading(true);
    onLoadingChange(true);

    try {
      const base64Image = image.split(",")[1];
      const response = await axios.post("/api/plants-analysis", {
        imageBuffer: base64Image,
        text: "nothing",
      });
      console.log(response.data);
      if (onResponse) {
        onResponse(response.data); // Send the response data to the parent component
      }
    } catch (error) {
      console.error(error);
      alert("Error generating response.");
    } finally {
      setLoading(false);
      onLoadingChange(false);
      setImage(null);
    }
  };
  const videoConstraints = {
    facingMode: { exact: "environment" }
  };
  return (
    <div className="flex flex-col gap-8 p-8 items-center">
      <h1 className="text-lg text-center border-b-4 text-slate-700 font-bold w-fit">
        AI-powered Image Detection at Your Fingertips
      </h1>
      <p className="text-sm text-muted text-slate-900">
        Enter an image to detect the infection in your plants
      </p>
      {!image && (
        <div className="flex flex-col items-center">
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #ccc",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select</p>
          </div>
         {
            !cameraActive &&(
                <div
                onClick={() => setCameraActive(true)}
                className="px-4 cursor-pointer flex gap-2 item-center justify-center py-2 bg-blue-500 text-white rounded-lg mt-4"
              >
                Take Picture <LucideCamera className="h-5 w-5"/>
              </div>
            )
         }
        </div>
      )}
      {cameraActive && (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-auto rounded-lg"
            videoConstraints={videoConstraints} 
          />
          <div className="flex items-center gap-2">
          <button
            onClick={captureImage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
          >
            Capture
          </button>
          <button
            onClick={()=>{setCameraActive(false)}}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-4"
          >
            Cancel
          </button>
          </div>
        </div>
      )}
      {image && (
        <Image
          src={image}
          alt="Selected Image"
          width={384}
          height={200}
          className="object-contain rounded-lg"
        />
      )}
      {/* <input
        className="px-4 py-2 focus:outline-none border rounded-lg w-96"
        type="text"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text prompt"
      /> */}
      <button
        className="px-4 py-2 bg-slate-600 w-96 rounded-lg text-white"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>
      {response && <p>Response: {response}</p>}
    </div>
  );
};
