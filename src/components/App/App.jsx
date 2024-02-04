import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Contacts } from 'pages/Contacts/Contacts';
import { LogIn } from 'pages/Login/Login';
import { Register } from 'pages/Register/Register';
import { Layout } from 'components/Layout/Layout';
import { PrivatRoute } from 'components/PrivateRoute/PrivateRoute';

import 'react-notifications/lib/notifications.css';
import { Home } from 'pages/Home/Home';
import { selectAuthIsRefreshing } from '../../redux/auth/authSelectors';
import { authRefreshUser } from '../../redux/auth/authOperation';
import { RestrictedRoute } from 'components/RestrictedRoute/RestrictedRoute';

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  useEffect(() => {
    dispatch(authRefreshUser());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute component={Register} redirectTo="/contacts" />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute component={LogIn} redirectTo="/contacts" />
            }
          />
          <Route
            path="/contacts"
            element={<PrivatRoute component={Contacts} redirectTo="/" />}
          />
        </Route>
      </Routes>
    )
  );
};
