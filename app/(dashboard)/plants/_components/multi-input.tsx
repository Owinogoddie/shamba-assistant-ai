import React, { useState, useRef } from "react";
import { useDropzone, DropzoneRootProps, DropzoneInputProps, Accept } from "react-dropzone";
import Webcam, { WebcamProps } from "react-webcam";
import axios from "axios";
import { LucideCamera } from "lucide-react";
import Image from "next/image";

type MultimodalInputProps = {
  onResponse: (data: any) => void;
  onLoadingChange: (loading: boolean) => void;
};

const MultimodalInput: React.FC<MultimodalInputProps> = ({
  onResponse,
  onLoadingChange,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    } as Accept,
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImage(imageSrc);
      setCameraActive(false);
    }
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
        text: "nothing", // Replace with actual text value if needed
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

  const videoConstraints: WebcamProps["videoConstraints"] = {
    facingMode: { exact: "environment" },
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
            <input {...getInputProps() as DropzoneInputProps} />
            <p>Drag & drop an image here, or click to select</p>
          </div>
          {!cameraActive && (
            <div
              onClick={() => setCameraActive(true)}
              className="px-4 cursor-pointer flex gap-2 items-center justify-center py-2 bg-blue-500 text-white rounded-lg mt-4"
            >
              Take Picture <LucideCamera className="h-5 w-5" />
            </div>
          )}
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
              onClick={() => {
                setCameraActive(false);
              }}
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

export default MultimodalInput;
