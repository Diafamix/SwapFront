import { Navigate } from 'react-router-dom';

  
const GuardedRoute = ({ condition, children }) => {
    console.log(condition)
    if (!condition) 
        return <Navigate to="/" replace />;
    
      return children;
}

export default GuardedRoute;
