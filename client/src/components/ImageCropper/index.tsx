import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
function ImageCropper(props: any) {
  const { imageToCrop, onImageCropped } = props;

  const [cropConfig, setCropConfig] = useState(
    // default crop config
    {
      unit: "px",
      height: 500,
      width: 500,
      aspect: 1 / 1
    }
  );

  const [imageRef, setImageRef] = useState();

  async function cropImage(crop: any) {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        "croppedImage.jpeg" // destination filename
      );

      // calling the props function to expose
      // croppedImage to the parent component
      
      onImageCropped(croppedImage);
    }
  }

  function getCroppedImage(sourceImage: any, cropConfig: any, fileName: any) {
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");

    //@ts-ignore
    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob: any) => {
        // returning an error
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        blob.name = fileName;
        // creating a Object URL representing the Blob object given
        const croppedImageUrl = window.URL.createObjectURL(blob);
        props.setCroppedImageFile(blob)

        resolve(croppedImageUrl);
      }, "image/jpeg");
    });
  }

  return (
    <ReactCrop
      src={imageToCrop}
      aspect={1}
      //@ts-ignore
      crop={cropConfig}
      ruleOfThirds
      onImageLoaded={(imageRef: any) => setImageRef(imageRef)}
      onComplete={(cropConfig) => cropImage(cropConfig)}
      onChange={(cropConfig: any) => setCropConfig(cropConfig)}
      crossorigin="anonymous" // to avoid CORS-related problems
    />
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => { }
};

export default ImageCropper;
