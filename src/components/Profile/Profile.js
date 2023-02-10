import { useState , useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import classes from '../Auth/AuthForm.module.css';
import { TextField, Avatar, Button,Container,Card,CardContent,CardHeader } from '@mui/material';
import ImgUpload from "../Profile/ImgUpload"
const Profile = () => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef(); 
  const uploadImageRef = useRef();
  const userNameRef = useRef();
  const history = useNavigate();
  const authCtx = useContext (AuthContext); 
  const [isLogin, setIsLogin] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ProfileImage = authCtx.photoUrl, setProfileImage] = useState();
  const detailsChange = () =>{
    const enteredUser = (userNameRef && userNameRef.current)?userNameRef.current.value:"";
    const newPhotoUrl = (ProfileImage)?ProfileImage:"";
    const ExistsUserName = (authCtx.userName)?authCtx.userName:"";
    const ExistsProfileImage = (authCtx.photoUrl)?authCtx.photoUrl:"";
    
    if(ExistsUserName.indexOf(enteredUser) < 0 ||
       ExistsProfileImage.indexOf(newPhotoUrl) < 0){
        setIsChanged(true);
        return;
       }
       setIsChanged(false);
       return
  }
  const photoUpload = e =>{
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
        console.log(reader);
        console.log(file)
      setProfileImage(reader.result)
      setIsChanged(true);
    }
    reader.readAsDataURL(file);
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const getProfileImage = (file) =>{
    console.log(file)
    const enteredImage = file.target.value;
    // console.log(uploadImageRef)
    // console.log(enteredImage)
    setProfileImage(enteredImage)
    console.log(ProfileImage)


  }
const submitHandler = (event) =>{
  event.preventDefault();

// optional add validation 
setIsLoading(true);
let url ; 
const enteredUser = (userNameRef && userNameRef.current)?userNameRef.current.value:"";
const newPhotoUrl = (ProfileImage)?ProfileImage:"";
url = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAhU-VD3H23eu4HmJiZBdXI7Q3Jlw36j6w";
console.log(authCtx.token)
fetch (url ,
    {
      method: 'POST',
      body: JSON.stringify({
          idToken:authCtx.token,
          photoUrl: ProfileImage,
          displayName:enteredUser
          // returnSecureToken: true
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then((resProf) =>{ 
        console.log(resProf)
      authCtx.photoUrl = ProfileImage;
      authCtx.userName = enteredUser;
      history('/');
    })
}

  return (
    <Container>
      <Card>
      <CardHeader className={classes.centerItemClass} title="Profile"></CardHeader>
        <CardContent className={classes.centerItemClass}>
        <form onSubmit={submitHandler}>
            <ImgUpload onChange={photoUpload} src={ProfileImage}/>
        <div>
            <TextField onInput={detailsChange} variant="outlined" label="User Name"  type="text" id='userName' defaultValue={authCtx.userName} required  inputRef = {userNameRef}/>
        </div>
        <div className={classes.submitButtonClass}>
          {!isLoading && isChanged && <Button type="submit" variant='contained'>Save Details</Button>}
          {
            isLoading && <p> Loading ... </p>
          }
          </div>
      </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile

// const Profile = () => {
//     const ImgUpload =({
//         onChange,
//         src
//       })=>
//         <label htmlFor="photo-upload" className="custom-file-upload fas">
//           <div className="img-wrap img-upload" >
//             <img for="photo-upload" src={src}/>
//           </div>
//           <input id="photo-upload" type="file" onChange={onChange}/> 
//         </label>
      
      
//       const Name =({
//         onChange,
//         value
//       })=>
//         <div className="field">
//           <label htmlFor="name">
//             name:
//           </label>
//           <input 
//             id="name" 
//             type="text" 
//             onChange={onChange} 
//             maxlength="25" 
//             value={value} 
//             placeholder="Alexa" 
//             required/>
//         </div>
      
        
//       const Status =({
//         onChange,
//         value
//       })=>
//         <div className="field">
//           <label htmlFor="status">
//             status:
//           </label>
//           <input 
//             id="status" 
//             type="text" 
//             onChange={onChange} 
//             maxLength="35" 
//             value={value} 
//             placeholder="It's a nice day!" 
//             required/>
//         </div>
      
      
//       const Profile =({
//         onSubmit,
//         src,
//         name,
//         status,
//       })=>
//         <div className="card">
//           <form onSubmit={onSubmit}>
//             <h1>Profile Card</h1>
//             <label className="custom-file-upload fas">
//               <div className="img-wrap" >
//                 <img for="photo-upload" src={src}/>
//               </div>
//             </label>
//             <div className="name">{name}</div>
//             <div className="status">{status}</div>
//             <button type="submit" className="edit">Edit Profile </button>
//           </form>
//         </div>
           
            
//       const Edit =({
//         onSubmit,
//         children,
//       })=>
//         <div className="card">
//           <form onSubmit={onSubmit}>
//             <h1>Profile Card</h1>
//               {children}
//             <button type="submit" className="save">Save </button>
//           </form>
//         </div>
      
//       class CardProfile extends React.Component {
//         state = {
//           file: '',
//           imagePreviewUrl: 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true',
//           name:'',
//           status:'',
//           active: 'edit'
//         }
      
//         photoUpload = e =>{
//           e.preventDefault();
//           const reader = new FileReader();
//           const file = e.target.files[0];
//           reader.onloadend = () => {
//             this.setState({
//               file: file,
//               imagePreviewUrl: reader.result
//             });
//           }
//           reader.readAsDataURL(file);
//         }
//         editName = e =>{
//           const name = e.target.value;
//           this.setState({
//             name,
//           });
//         }
        
//         editStatus = e => {
//           const status = e.target.value;
//           this.setState({
//             status,
//           });
//         }
        
//         handleSubmit= e =>{
//           e.preventDefault();
//           let activeP = this.state.active === 'edit' ? 'profile' : 'edit';
//           this.setState({
//             active: activeP,
//           })
//         }
        
//         render() {
//           const {imagePreviewUrl, 
//                  name, 
//                  status, 
//                  active} = this.state;
//           return (
//             <div>
//               {(active === 'edit')?(
//                 <Edit onSubmit={this.handleSubmit}>
//                   <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl}/>
//                   <Name onChange={this.editName} value={name}/>
//                   <Status onChange={this.editStatus} value={status}/>
//                 </Edit>
//               ):(
//                 <Profile 
//                   onSubmit={this.handleSubmit} 
//                   src={imagePreviewUrl} 
//                   name={name} 
//                   status={status}/>)}
              
//             </div>
//           )
//         }
//       }
// }

// export default Profile