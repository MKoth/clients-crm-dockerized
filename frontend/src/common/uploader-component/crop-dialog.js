import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import Cropper from 'react-easy-crop';
import getCroppedImg from './crop-image';

export const CropDialog = (props) => {
  const { onClose, open, image } = props;
  const [crop, onCropChange] = React.useState({ x: 0, y: 0 })
  const [zoom, onZoomChange] = React.useState(1)
  const [cropped, croppedImageSet] = React.useState()

  const handleClose = () => {
    onClose();
  };

  const cropSaveClick = () => {
    const promise = getCroppedImage();
    onClose(promise);
  };

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const getCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels
      )
      console.log('donee', { croppedImage });
      //croppedImageSet(croppedImage);
      return croppedImage;
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  return (
    <Dialog onClose={handleClose} aria-labelledby="users-dialog-title" open={open}>
      <DialogTitle id="users-dialog-title">Crop image</DialogTitle>
      <DialogContent style={{padding:0, height:250}}>
      <div style={{
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        bottom: 80
      }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onZoomChange={onZoomChange}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
        />
      </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={cropSaveClick} color="primary">
          Crop and save image
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CropDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  image: PropTypes.string
};