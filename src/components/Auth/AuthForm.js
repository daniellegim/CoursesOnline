import { useState , useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';
import { TextField, Avatar, Button,Container,Card,CardContent,CardHeader } from '@mui/material';
import ImgUpload from "../Profile/ImgUpload"

const AuthForm = (props) => {

  const emailInputRef = useRef();
  const passwordInputRef = useRef(); 
  const uploadImageRef = useRef();
  const userNameRef = useRef();
  const history = useNavigate();
  const authCtx = useContext (AuthContext); 
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ProfileImage = 'https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true', setProfileImage] = useState();
  const photoUpload = e =>{
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
        console.log(reader);
        console.log(file)
      setProfileImage(reader.result)
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

const enteredEmail = emailInputRef.current.value;
const enteredPassword = passwordInputRef.current.value;
const enteredUserName  = (userNameRef && userNameRef.current)?userNameRef.current.value:"";


// optional add validation 

setIsLoading(true);

let url ; 
if(props.Logout === false){
  console.log("Tro")
  authCtx.userIsLoggin = false;
  authCtx.isLogout = false;
  authCtx.logout();
  history('/')
}
if ( isLogin){

url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAhU-VD3H23eu4HmJiZBdXI7Q3Jlw36j6w';

}else{

  url =  'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAhU-VD3H23eu4HmJiZBdXI7Q3Jlw36j6w' ; 
 
}
console.log(enteredEmail)
fetch (url ,
  {
    method: 'POST',
    body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
    }),
    headers:{
      'Content-Type': 'application/json'
    }
  }).then ( (res,idToken) => {
    setIsLoading(false);
    if(res.ok) {
     return res.json();
    }else{
      return res.json ().then((data) => {
       let errorMessage = 'Auth failed';
    
       throw new Error( errorMessage);
      });
    }
  }).then( (data) => {
    let updateProfileUrl;
    updateProfileUrl = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAhU-VD3H23eu4HmJiZBdXI7Q3Jlw36j6w"
    
    if(!isLogin){
    fetch (updateProfileUrl ,
        {
          method: 'POST',
          body: JSON.stringify({
              idToken:data.idToken,
              photoUrl: ProfileImage,
              displayName:enteredUserName
              // returnSecureToken: true
          }),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then((resProf) =>{ 
          console.log(resProf)
          console.log(data)
          authCtx.email = data.email;
          authCtx.userId = data.localId;
          authCtx.userIsLoggin = true;
          authCtx.photoUrl = ProfileImage;
          authCtx.userName = enteredUserName;
          authCtx.token = data.idToken;
          authCtx.isLogout = false;
          authCtx.login (data.idToken,data.email,data.localId);
          history('/');
        });
      }
      else{
            updateProfileUrl = "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAhU-VD3H23eu4HmJiZBdXI7Q3Jlw36j6w"
    
        fetch (updateProfileUrl ,
          {
            method: 'POST',
            body: JSON.stringify({
                idToken:data.idToken,
                photoUrl: ProfileImage,
                displayName: enteredUserName
                // returnSecureToken: true
            }),
            headers:{
              'Content-Type': 'application/json'
            }
          }).then((resProf) =>{ 
            return resProf.json();
          }).then((dataProf) => {
            authCtx.email = data.email;
            authCtx.userId = data.localId;
            authCtx.userIsLoggin = true;
            authCtx.photoUrl = dataProf.photoUrl;
            authCtx.userName = dataProf.displayName
            authCtx.isLogout = false;
            authCtx.token = data.idToken;
            authCtx.login (data.idToken,data.email,data.localId);
            history('/');
          })
      }
  }).catch (err => {
    alert (err.message);
  });
}

  return (
    <Container>
      <Card>
      <CardHeader>{isLogin ? 'Login' : 'Sign Up'}</CardHeader>
        <CardContent className={classes.centerItemClass}>
        <form onSubmit={submitHandler}>
        {isLogin === false && 
        <div>
        <TextField variant="outlined" label="User Name"  type="text" id='userName' required  inputRef = {userNameRef}/>
      </div>
        }
      {isLogin === false && 
      <div>
      <ImgUpload onChange={photoUpload} src={ProfileImage}/>
      </div>
      }
        <div className={classes.emailClass}>
          <TextField variant="outlined" label="Your Email"  type="email" id='email' required  inputRef = {emailInputRef}/>
        </div>
        <div className={classes.passwordClass}>
          <TextField variant="outlined" label="Your Password" type="password" minLength="7" id='password' required inputRef={passwordInputRef}></TextField>
        </div>
        <div className={classes.submitButtonClass}>
          {!isLoading && <Button type="submit" variant='contained'>{isLogin ? 'Login' : 'Create Account'}</Button>}
          {
            isLoading && <p> Loading ... </p>
          }
          </div>
          <div className={classes.switchButtonClass}>
          <Button
            variant='text'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </Button>
          </div>
      </form>
        </CardContent>
      </Card>
    {/* <section className={classes.auth}> */}
      {/* <h1>{isLogin ? 'Login' : 'Sign Up'}</h1> */}

    {/* </section> */}
    </Container>
  );
};

export default AuthForm;
