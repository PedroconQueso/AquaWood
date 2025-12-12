import { AuthProvider } from './contexts/AuthContext';
import { TranslationProvider } from './contexts/TranslationContext';
import { Router } from './components/Router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

function App() {
  return (
    <TranslationProvider>
      <AuthProvider>
        <Layout>
          <Router
            routes={[
              { path: '/', component: <Home /> },
              { path: '/projects', component: <Projects /> },
              { path: '/projects/:id', component: <ProjectDetail /> },
              { path: '/contact', component: <Contact /> },
              { path: '/login', component: <Login /> },
              { path: '/admin', component: <Admin /> },
            ]}
            defaultRoute={<Home />}
          />
        </Layout>
      </AuthProvider>
    </TranslationProvider>
  );
}

export default App;
