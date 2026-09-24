import React from "react";

export default function usePreviewImage(imageForm, defaultImage = null) {
  const [preview, setPreview] = React.useState(defaultImage);

  React.useEffect(() => {
    if (imageForm && typeof imageForm === "object" && imageForm.length > 0) {
      const file = imageForm[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setPreview(imageForm || defaultImage);
    }
  }, [imageForm]);

  return { preview };
}
