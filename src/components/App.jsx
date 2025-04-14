import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './common/Header';
import { ROUTES } from '../../config.js';
import Home from './home-page/Home';
import RegistrationForm from './registration-page/Registration.jsx';
import Recovery from './recovery-page/recovery.jsx';
import TestEditor from './test-editor-page/TestEditor.jsx';
import Blog from './blog-page/Blog.jsx';
import Tests from './tests-page/Tests.jsx';
import Partners from './partners-page/Partners.jsx';
import Help from './help-page/Help.jsx';
import Dashboard from './dashboard-page/Dashboard.jsx';

export default function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.REGISTER} element={<RegistrationForm />} />
          <Route path={ROUTES.RECOVERY} element={<Recovery />} />
          <Route path={ROUTES.TEST_EDITOR} element={<TestEditor />} />
          <Route path={ROUTES.TESTS} element={<Tests />} />
          <Route path={ROUTES.BLOG} element={<Blog />} />
          <Route path={ROUTES.HELP} element={<Help />} />
          <Route path={ROUTES.PARTNERS} element={<Partners />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
