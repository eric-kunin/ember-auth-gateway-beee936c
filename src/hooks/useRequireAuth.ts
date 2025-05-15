
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * A hook to require authentication for a page
 * It redirects to the login page if the user is not authenticated
 * @param redirectTo The path to redirect to if authentication fails (default: '/login')
 */
export function useRequireAuth(redirectTo: string = '/login') {
  const { isAuthenticated, loading, user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(redirectTo);
    }
  }, [navigate, isAuthenticated, loading, redirectTo]);

  return { isAuthenticated, loading, user, profile };
}
