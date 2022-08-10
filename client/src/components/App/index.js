import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Landing from '../layout/Landing';
import Navbar from '../layout/Navbar';
import Login from '../auth/Login';
import Register from '../auth/Register';
import MyProfile from '../myprofile/MyProfile';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import PrivateRoute2 from '../routing/PrivateRoute2';
import setAuthHeader from '../../utils/setAuthHeader';
import CreateProfile from '../profile-forms/CreateProfile';
import EditProfile from '../profile-forms/EditProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import { loadUserAction } from '../../actions/auth';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import BunchLanding from '../bunch/BunchLanding';
import EditBunch from '../dashboard/EditBunch';
import { loadBunchAction } from '../../actions/bunch';
import CreateBunch from '../bunch/CreateBunch';
import EnterBunch from '../bunch/EnterBunch';
import JoinBunch from '../bunch/JoinBunch';
import NotFound from '../layout/NotFound';

if (localStorage.token) {
  setAuthHeader(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => {
    return state?.auth?.user?._id;
  });

  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUserAction());
      dispatch(loadBunchAction());
    }
  }, [dispatch]);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/bunch-landing"
          element={
            <PrivateRoute>
              <BunchLanding />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-bunch"
          element={
            <PrivateRoute>
              <CreateBunch />
            </PrivateRoute>
          }
        />
        <Route
          path="/join-bunch"
          element={
            <PrivateRoute>
              <JoinBunch />
            </PrivateRoute>
          }
        />
        <Route
          path="/enter-bunch"
          element={
            <PrivateRoute>
              <EnterBunch />
            </PrivateRoute>
          }
        />



        <Route
          path="/create-profile"
          element={
            <PrivateRoute>
              <CreateProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-experience"
          element={
            <PrivateRoute>
              <AddExperience />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-education"
          element={
            <PrivateRoute>
              <AddEducation />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/me"
          element={
            <PrivateRoute>
              <Profile myId={id} />
            </PrivateRoute>
          }
        />


        {/* From here only the users joined in a bunch can see */}

        {/* dashboard is to see bunch info */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute2>
              <Dashboard />
            </PrivateRoute2>
          }
        />

        <Route
          path="/posts"
          element={
            <PrivateRoute2>
              <Posts />
            </PrivateRoute2>
          }
        />

        <Route
          path="/posts/:id"
          element={
            <PrivateRoute2>
              <Post />
            </PrivateRoute2>
          }
        />
        <Route
          path="/profiles"
          element={
            <PrivateRoute2>
              <Profiles />
            </PrivateRoute2>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute2>
              <Profile />
            </PrivateRoute2>
          }
        />
        <Route
          path="/edit-bunch"
          element={
            <PrivateRoute2>
              <EditBunch />
            </PrivateRoute2>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </ Router >
  )
}

export default App;