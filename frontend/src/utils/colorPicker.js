import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';

const useStyles = makeStyles({
    color:bg => ( {
      width: '36px',
      height: '18px',
      borderRadius: '2px',
      background: bg.color,
    }),
    swatch:{
      padding: '5px',
      background: '#fff',
      borderRadius: '1px',
      boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
      display: 'inline-block',
      cursor: 'pointer',
    },
    popover: {
      position: 'absolute',
      zIndex: '2',
    },
    cover: {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    },
    label: {
      marginBottom: 5,
      fontSize: 14,
      color: 'grey'
    },
    holder: {
      textAlign: 'center',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
});



function ColorPicker(props) {
  const [isOpen, setOpen] = useState(false);
  const [color, setColor] = useState(props.value? props.value:'#1A237E');
  const classes = useStyles({color});

  const handleClick = () => {
    setOpen(!isOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
    setColor(props.value)
  }, [props.value])

  const handleChange = (color) => {
    props.onChange? props.onChange(color):setColor(color.hex);
  };

  return (
    <div className={ classes.holder }>
      {props.label&&<h4 className={ classes.label }>{props.label}</h4>}
      <div>
        <div className={ classes.swatch } onClick={ handleClick }>
          <div className={ classes.color } />
        </div>
        { isOpen ? <div className={ classes.popover }>
          <div className={ classes.cover } onClick={ handleClose }/>
          <SketchPicker color={ color } onChange={ handleChange } />
        </div> : null }
      </div>
    </div>
  )
}

export default ColorPicker