import AuthenticationLayout from "components/page-layout/AuthenticationLayout"
import NonAuthenticationLayout from "components/page-layout/NonAuthenticationLayout"
import { useRoutes, useLocation } from "react-router-dom";
import { publicRoutes, authenticatedProtectedRoutes } from "routes";
import "./pages.scss"
import React from "react";

import useElementOnScreen from "hooks/useElementOnScreen";
import { useRef } from 'react';
import Loader from "components/loader/Loader";
import GoToTop from "components/go-to-top/GoToTop";


const PublicRoutesWrapper = () => {

  const routes = useRoutes(publicRoutes);

  return routes
}

const PrivateRoutesWrapper = () => {
  const routes = useRoutes(authenticatedProtectedRoutes);

  return routes
}
const Pages = () => {

  const user = false;
  const location = useLocation();
  const targetRef = useRef(null);

  const showHeaderBackground = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.3,

  }, targetRef)
  return (
    <React.Suspense fallback={<Loader />}>

      {
        user ? (
          <AuthenticationLayout>
            <PrivateRoutesWrapper />
          </AuthenticationLayout>
        )
          : (

            <NonAuthenticationLayout showHeaderBackground={showHeaderBackground}>
              <PublicRoutesWrapper key={location.pathname} />
              <GoToTop />
            </NonAuthenticationLayout>

          )
      }

    </React.Suspense>
  )
}

export default Pages;