import { uploadFile } from './services/api';
import BG from './assest/BG.jpg';
import { useState, useEffect, useRef } from 'react';

function App() {
  const uploadRef = useRef();
  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(''); // Store the generated link

  const handleClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  useEffect(() => {
    const uploadAndFetchLink = async () => {
      if (file) {
        const data = new FormData();
        data.append("file", file);

        try {
          const response = await uploadFile(data); // Upload file
          setFileURL(response.fileUrl); // Store the shareable link
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }
    };

    uploadAndFetchLink();
  }, [file]);

  return (
    <>
      <div className='h-screen w-full flex justify-end items-center'
        style={{
          backgroundImage: `url(${BG})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
        <div className='h-screen w-[25%]'></div>
        <div className='h-screen w-[68%] flex justify-center items-center bg-black opacity-85'>
        <div className='flex flex-col'>
          <div className='bg-slate-800 flex flex-col justify-center items-center rounded-md p-6 text-white font-sans'>
            <div className='text-[30px]'>Welcome to My File Sharing</div>
            <div className='text-[20px] font-light mt-2 text-slate-300'>
              Share your file securely and easily with our file hosting service.
            </div>
            <button
              className='p-2 bg-blue-700 rounded-sm mt-4'
              onClick={handleClick}>Upload Now
            </button>
            <input type='file'
              style={{ display: 'none' }}
              ref={uploadRef}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          {fileURL && (
              <div className="mt-6 p-2 bg-gray-700 rounded-md text-md break-words">
                <span className="font-semibold">Shareable Link: </span>
                <a href={fileURL} target="_blank" rel="noopener noreferrer" className="text-blue-300">{fileURL}</a>
              </div>
            )}
            </div>
        </div>
      </div>
    </>
  );
}

export default App;
