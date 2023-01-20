import { Avatar } from "@mui/material";
import classes from './imgUpload.module.css';
const ImgUpload =({
    onChange,
    src
  })=> {
    console.log(classes)
    const divClassImage = `${classes.imgWrap} ${classes.imgUpload}`;
    const labelClassImage = `${classes.customFileUpload} fas`;
  return(
    <label htmlFor="photo-upload" className={labelClassImage}>
      <div className={divClassImage} >
        <img for="photo-upload" src={src} defaultValue="https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"/>
        <input hidden accept="image/*" id="photo-upload" type="file" onChange={onChange}/> 
      </div>
      
    </label>
  )
}
export default ImgUpload;