import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React, { useEffect } from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from'react-redux'

import Footer from './components/Footer'

import NavBar from './components/NavBar'
import Homepage from './components/pages/Homepage'
import Register from './components/pages/Register'
import SignIn from './components/pages/SignIn'

import {selectAlertMessage, selectAlertType, selectAlertShown, selectAlertDuration, alertActions} from './store/features/alertSlice'
import fbApp, {handleUserProfile} from './services/firebase'
import { userActions, selectLoggedIn } from './store/features/userSlice'



function App() {

  const dispatch = useDispatch()

  
  useEffect(() => {
        
      fbApp.auth()
      .onAuthStateChanged((user)=>{

          if(user){

            // const userRef = await handleUserProfile(user)
            handleUserProfile(user)
            .then((userRef)=>{
              
              userRef.onSnapshot((snapshot)=>{
                
                dispatch(userActions.login())
                dispatch(userActions.setProfile(snapshot?.data()))

              })

            })
            
            // onSnapshot(snapshot=>{
            //   dispatch(userActions.login())
            //   dispatch(userActions.setProfile(...snapshot.data()))
            // })
            

              console.log(user);
              
          }

      })

  }, [])


  const alertMessage = useSelector(selectAlertMessage)
  const alertType = useSelector(selectAlertType)
  const alertShown = useSelector(selectAlertShown)
  const alertDuration = useSelector(selectAlertDuration)

  const userLoggedIn = useSelector(selectLoggedIn)

  const handleSnackbarOnClose = ()=>{

    dispatch(alertActions.hide())

  }

  return (

      <Router>
        <div className="App">

          <NavBar />

          <div className="main">

            <Switch>
                <Route path="/" exact component={Homepage} />
                <Route path="/register" component={Register} />
                <Route 
                  path="/signin" 
                  render= {
                    ()=> userLoggedIn === true ? (<Redirect to="/" />) : (<SignIn />)
                  }
                />
            </Switch>

          </div>

          <Footer />
          <Snackbar
            open={alertShown}
            anchorOrigin={{vertical: "bottom", horizontal: "left"}}
            autoHideDuration={alertDuration}            
            onClose={handleSnackbarOnClose}
          >
            <Alert severity={alertType}>
                {alertMessage}
            </Alert>
          </Snackbar>

        </div>
      </Router>
  );
}

export default App;
