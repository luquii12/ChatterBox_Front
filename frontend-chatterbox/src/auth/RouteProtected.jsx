


const RouteProtected = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    return children;
    }
    export default RouteProtected;