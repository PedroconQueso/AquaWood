import { useState, useEffect, ReactNode } from 'react';

interface Route {
  path: string;
  component: ReactNode;
}

interface RouterProps {
  routes: Route[];
  defaultRoute: ReactNode;
}

export function Router({ routes, defaultRoute }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const matchRoute = () => {
    for (const route of routes) {
      if (route.path === currentPath) {
        return route.component;
      }

      if (route.path.includes(':')) {
        const routeParts = route.path.split('/');
        const pathParts = currentPath.split('/');

        if (routeParts.length === pathParts.length) {
          const match = routeParts.every((part, i) => {
            return part.startsWith(':') || part === pathParts[i];
          });

          if (match) {
            return route.component;
          }
        }
      }
    }

    return defaultRoute;
  };

  return <>{matchRoute()}</>;
}

export function Link({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = to;
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const getParam = (paramName: string): string | null => {
    const pathParts = currentPath.split('/');
    const routePath = window.location.hash.slice(1);

    if (routePath.includes('/projects/') && paramName === 'id') {
      return pathParts[pathParts.length - 1];
    }

    return null;
  };

  return { currentPath, navigate, getParam };
}
