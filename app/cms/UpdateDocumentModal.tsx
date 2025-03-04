import React, { useState, useEffect } from 'react';

interface UpdateDocumentModalProps {
  isOpen: boolean;
  initialData: {
    ID: number;
    image_path: string;
    file_name: string;
    link: string;
    description: string;
  } | null;
  onClose: () => void;
  onUpdateDocument: (formData: FormData, id: number) => void;
}

const UpdateDocumentModal: React.FC<UpdateDocumentModalProps> = ({
  isOpen,
  initialData,
  onClose,
  onUpdateDocument,
}) => {
  const [imagePath, setImagePath] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (initialData) {
      setFileName(initialData.file_name);
      setLink(initialData.link);
      setDescription(initialData.description);
      setImageUrl(`${backendUrl}/${initialData.image_path}`);
    }
  }, [initialData, backendUrl]);

  const handleImagePathChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setImagePath(event.target.files[0]);
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUpdateDocument = () => {
    const formData = new FormData();
    if (imagePath) {
      formData.append('image', imagePath);
    }
    formData.append('file_name', fileName);
    formData.append('link', link);
    formData.append('description', description);

    if (initialData) {
      onUpdateDocument(formData, initialData.ID);
    }
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-lg z-10">
        <h2 className="text-xl font-bold mb-4">Update Dokumen</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Current Image
            </label>
            <img
              src={imageUrl}
              alt="Current"
              className="h-16 w-16 object-cover mb-4"
            />
            <label className="block text-sm font-medium text-gray-700">
              Image Path
            </label>
            <input
              type="file"
              onChange={handleImagePathChange}
              accept="image/*"
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              File Name
            </label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Link
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 px-3 py-2 w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpdateDocument}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDocumentModal;

// // components/UpdateDocumentModal.tsx

// import React, { useState, useEffect } from 'react';

// interface UpdateDocumentModalProps {
//   isOpen: boolean;
//   initialData: {
//     id: number;
//     thumbnail: string;
//     title: string;
//     link: string;
//     description: string;
//   } | null;
//   onClose: () => void;
//   onUpdateDocument: (formData: FormData) => void;
// }

// const UpdateDocumentModal: React.FC<UpdateDocumentModalProps> = ({ isOpen, initialData, onClose, onUpdateDocument }) => {
//   const [thumbnail, setThumbnail] = useState<File | null>(null);
//   const [title, setTitle] = useState<string>('');
//   const [link, setLink] = useState<string>('');
//   const [description, setDescription] = useState<string>('');

//   useEffect(() => {
//     if (initialData) {
//       setTitle(initialData.title);
//       setLink(initialData.link);
//       setDescription(initialData.description);
//     }
//   }, [initialData]);

//   const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setThumbnail(event.target.files[0]);
//     }
//   };

//   const handleUpdateDocument = () => {
//     const formData = new FormData();
//     if (thumbnail) {
//       formData.append('thumbnail', thumbnail);
//     }
//     formData.append('title', title);
//     formData.append('link', link);
//     formData.append('description', description);

//     onUpdateDocument(formData);
//     onClose();
//   };

//   return (
//     <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="bg-white p-8 rounded-lg z-10">
//         <h2 className="text-xl font-bold mb-4">Update Dokumen</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
//             <input
//               type="file"
//               onChange={handleThumbnailChange}
//               accept="image/*"
//               className="border border-gray-300 px-3 py-2 w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Judul</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="border border-gray-300 px-3 py-2 w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Link</label>
//             <input
//               type="url"
//               value={link}
//               onChange={(e) => setLink(e.target.value)}
//               className="border border-gray-300 px-3 py-2 w-full"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="border border-gray-300 px-3 py-2 w-full"
//               rows={4}
//             ></textarea>
//           </div>
//           <div className="flex justify-end">
//             <button
//               type="button"
//               onClick={handleUpdateDocument}
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//             >
//               Simpan Perubahan
//             </button>
//             <button
//               type="button"
//               onClick={onClose}
//               className="ml-2 text-gray-600 hover:text-gray-800"
//             >
//               Batal
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateDocumentModal;
