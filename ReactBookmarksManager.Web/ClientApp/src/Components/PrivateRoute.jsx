import { Navigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useUserAuth();

    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;