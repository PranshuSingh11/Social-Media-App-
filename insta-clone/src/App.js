import './App.css';
import Post from './components/Post'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatePost from './components/CreatePost';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile'
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from './components/Unauthorized';
import UserProfile from './components/UserProfile';
import FollowersModal from './components/FollowersModal';
import FollowingModal from './components/FollowingModal';
import FollowersModal2 from './components/FollowersModal2';
import FollowingModal2 from './components/FollowingModal2';
import PageNotFound from './components/PageNotFound';

function App() {    

  return (

    <Router>
    <div className="App">
      <Switch>
        <Route path='/' exact ><Login></Login></Route>
        <Route path='/register' exact ><Register></Register></Route>
        <Route path='/login' exact ><Login></Login></Route>
        
        <ProtectedRoute path='/create-post' exact component={CreatePost}></ProtectedRoute>
        <ProtectedRoute path='/post' exact component={Post}></ProtectedRoute>
        <ProtectedRoute path='/profile' exact component={Profile}></ProtectedRoute>
        <ProtectedRoute path='/profile/:userId' component={UserProfile}></ProtectedRoute>
        <ProtectedRoute path='/followers' exact component={FollowersModal}></ProtectedRoute>
        <ProtectedRoute path='/following' exact component={FollowingModal}></ProtectedRoute>
        <ProtectedRoute path='/userfollowers' exact component={FollowersModal2}></ProtectedRoute>
        <ProtectedRoute path='/userfollowing' exact component={FollowingModal2}></ProtectedRoute>
     
        <Route path='/unauthorized' exact ><Unauthorized></Unauthorized></Route>
        <Route path='*' ><PageNotFound></PageNotFound></Route>
      
      </Switch>
    </div>
    </Router>

  );
}

export default App;
