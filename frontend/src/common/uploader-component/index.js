import React, {useMemo, useEffect, useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone';
import {CropDialog} from './crop-dialog';
import './index.css';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

export function StyledDropzone(props) {

  
  const [preview, setPreview] = useState(null);
  const [blob, setBlob] = useState(null);
  const [open, setOpen] = useState(false);

  const onDropAccepted = useCallback((acceptedFiles) => {
    const file = acceptedFiles.length?acceptedFiles[0]:null;
    setPreview(URL.createObjectURL(file));
    setOpen(true);
  });

  const onDialogClose = useCallback((promise) => {
    if(promise){
      promise.then(result=>{
        console.log(result);
        setBlob(result);
        setPreview(URL.createObjectURL(result));
        props.onImageChange(new File([result], 'profile.jpg'));
      });
      //props.onImageChange(new File([preview], "profile.jpg"));
      
    }
    else{
      setPreview(null);
      props.onImageChange(null);
    }
    setOpen(false);
    
  });
  
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({accept: 'image/*', multiple: false, onDropAccepted});

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    //URL.revokeObjectURL(preview);
  }, [preview]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    if(props.preview&&props.preview instanceof Blob){
      URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(props.preview));
    }
    else{
      setPreview(props.preview);
    }
  }, [props.preview]);

  const croppedImage = preview?<div style={{width:'100%'}}>
      <span className="cropper-media-close" 
        onClick={
          (e)=>{e.stopPropagation();setPreview(null);props.onImageChange(null);}}>x</span>
      <img src={preview} style={{width:'100%'}}/>
    </div>:
    <p>Upload image here by dropping or click and select file</p>;

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);

  return (
    <div>
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        {croppedImage}
      </div>
      <CropDialog open={open} image={preview} onClose={onDialogClose} />
    </div>
  );
}