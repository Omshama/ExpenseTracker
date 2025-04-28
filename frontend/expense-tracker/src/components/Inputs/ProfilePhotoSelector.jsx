import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // ✅ fixed: 'file' ➔ 'files'
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview); // ✅ fixed: previewUrl=URL.createObjectURL(file) → setPreviewUrl(preview)
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const chooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Preview OR default icon */}
      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-primary"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
          >
            <LuTrash size={16} />
          </button>
        </div>
      ) : (
        <div
          className="w-24 h-24 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer"
          onClick={chooseFile}
        >
          <LuUser size={32} className="text-gray-600" />
        </div>
      )}

      <button
        type="button"
        onClick={chooseFile}
        className="mt-2 text-sm text-primary underline"
      >
        {previewUrl ? 'Change Photo' : 'Upload Photo'}
      </button>
    </div>
  );
};

export default ProfilePhotoSelector;
