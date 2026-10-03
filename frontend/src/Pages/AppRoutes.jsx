import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from '../Components/Header/Header';
import HomePage from './HomePage';
import { useSelector } from 'react-redux';
import Footer from '../Components/Footer/Footer';
import ProtectedRoute from '../Services/ProtectedRoute';
import PublicRoute from '../Services/PublicRoute';
import { Loader, LoadingOverlay } from '@mantine/core';
import { Suspense, lazy, useEffect } from 'react';

// Each page is downloaded only when it is opened, so the first load stays small
const FindJobsPage = lazy(() => import('./FindJobsPage'));
const JobPage = lazy(() => import('./JobPage'));
const ApplyJobPage = lazy(() => import('./ApplyJobPage'));
const FindTalentPage = lazy(() => import('./FindTalentPage'));
const TalentProfilePage = lazy(() => import('./TalentProfilePage'));
const CompanyPage = lazy(() => import('./CompanyPage'));
const JobHistoryPage = lazy(() => import('./JobHistoryPage'));
const PostedJobPage = lazy(() => import('./PostedJobPage'));
const PostJobPage = lazy(() => import('./PostJobPage'));
const SignUpPage = lazy(() => import('./SignUpPage'));
const ProfilePage = lazy(() => import('./ProfilePage'));
const Unauthorized = lazy(() => import('./UnauthroizedPage'));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

const PageLoader = () => (
  <div className='min-h-[60vh] flex items-center justify-center'>
    <Loader color='dark' type='bars' />
  </div>
);

const pageTitles = [
  ['/find-jobs', 'Find Jobs'],
  ['/jobs/', 'Job Details'],
  ['/apply-job/', 'Apply'],
  ['/find-talent', 'Find Talent'],
  ['/talent-profile/', 'Talent Profile'],
  ['/company/', 'Company'],
  ['/job-history', 'Job History'],
  ['/posted-jobs/', 'Posted Jobs'],
  ['/post-job/', 'Post a Job'],
  ['/signup', 'Sign Up'],
  ['/login', 'Login'],
  ['/profile', 'My Profile'],
  ['/unauthorized', 'Unauthorized'],
];

// Sets the browser tab title for the current page
const PageTitle = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const match = pageTitles.find(([prefix]) => pathname.startsWith(prefix));
    document.title = match ? `${match[1]} | HireHub` : 'HireHub';
  }, [pathname]);
  return null;
};

const AppRoutes = () => {
  const overlay = useSelector((state) => state.overlay);
  return (
    <BrowserRouter>
      <PageTitle />
      <div className='relative overflow-hidden'>
        {overlay && <div className='fixed !z-[2000] w-full h-full flex  items-center justify-center'>
          <LoadingOverlay
            visible={overlay}
            zIndex={2000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'brightSun.4', type: 'bars' }}
          />
        </div>}
        <Header />
        <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='/find-jobs' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><FindJobsPage /></ProtectedRoute>} />
          <Route path='/jobs/:id' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><JobPage /></ProtectedRoute>} />
          <Route path='/apply-job/:id' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><ApplyJobPage /></ProtectedRoute>} />
          <Route path='/find-talent' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><FindTalentPage /></ProtectedRoute>} />
          <Route path='/talent-profile/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><TalentProfilePage /></ProtectedRoute>} />
          <Route path='/company/:name' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><CompanyPage /></ProtectedRoute>} />
          <Route path='/job-history' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN']}><JobHistoryPage /></ProtectedRoute>} />
          <Route path='/posted-jobs/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><PostedJobPage /></ProtectedRoute>} />
          <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER', 'ADMIN']}><PostJobPage /></ProtectedRoute>} />
          <Route path='/signup' element={<PublicRoute><SignUpPage /></PublicRoute>} />
          <Route path='/login' element={<PublicRoute><SignUpPage /></PublicRoute>} />
          <Route path='/profile' element={<ProtectedRoute allowedRoles={['APPLICANT', 'ADMIN', 'EMPLOYER']}><ProfilePage /></ProtectedRoute>} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
