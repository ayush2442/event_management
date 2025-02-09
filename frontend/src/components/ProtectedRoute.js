export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (!loading && !user) {
        navigate('/login');
      }
    }, [user, loading, navigate]);
  
    if (loading) return <div>Loading...</div>;
    return children;
  };
  