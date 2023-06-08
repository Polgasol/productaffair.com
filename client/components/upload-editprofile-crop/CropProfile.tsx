import React, { useState } from "react";
import getCroppedImg from "../../utilities/cropImage";
import imageCompression from "browser-image-compression";
import { Button, DialogActions, DialogContent } from "@mui/material";
import Modal from "@mui/material/Modal";
import Cropper from "react-easy-crop";
import styles from '../upload-editprofile-crop/CropProfile.module.scss'

const CropProfile = ({
  files,
  setFiles,
  setCroppedImage,
  setUploadErr,
  croppedImage,
  setOpenCrop,
}: any) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const completeCrop = (croppedArea: any, croppedAreaPixels: any) =>
    setCroppedAreaPixels(croppedAreaPixels);

  const cropImage = async () => {
    // after completeCrop function
    // after
    try {
      const { file }: any = await getCroppedImg(
        files[0].preview, // image url that is to be cropped
        croppedAreaPixels, // cropped image pattern
        rotation // if any rotation is being happened
      );
      // file = blob
      // croppedFile = File
      // url = preview url
      //const croppedFile: any = new File([file], "croppedFile"); // File
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      setCroppedImage([])
      setCroppedImage(
        (current: any) => {
          // if less than 5 items are inserted, do not throw any error
          if (current.length < 2) {
            setUploadErr("");
          }
          //if equals to 5 items or more, throw an error
          if (current.length > 1) {
            setUploadErr("Sobra kana boy...");
          }
          // if less than 5 items, return the current items
          if (current.length > 0) {
            return [...current];
          }

          return [compressedFile]; // send to server
        },
        [croppedImage.length]
      );
      setFiles([]);
      setOpenCrop(false);
      setCroppedAreaPixels(croppedAreaPixels);
    } catch (e) {}
  };

  const zoomPercent = (value: any) => {
    return `${Math.round(value * 100)}%`;
  };

  return (
    <>
      <DialogContent
        sx={{
          background: "#333",
          position: "relative",
          height: "250px",
          width: "100%",
          aspectRatio: "1 / 1",
          minWidth: { sm: 250 },
          overflow: "auto",
          display: 'flex',
          justifyContent: 'center'
        }}
        dividers
      >
        {/*Container for cropping, where cropping is happening*/}
        {/*
        image = original image url containing the URL blob
         crop = initial crop center position
         zoom = initial zoom value
         rotation = initial value
         aspect = shape of the cropper
         onCropComplete = setCroppedAreaPixels(croppedAreaPixels) // cropping of the image
        */}

        <Cropper
          image={files[0]?.preview}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          aspect={1}
          onCropComplete={completeCrop}
        />
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: "row",
          mx: 3,
          my: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            setFiles([]);
            setOpenCrop(false);
          }}
        >
          Back
        </Button>
        <Button variant="contained" onClick={cropImage}>
          Crop
        </Button>
      </DialogActions>
    </>
  );
};

export default CropProfile;
