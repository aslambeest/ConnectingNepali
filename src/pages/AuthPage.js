import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);

    // Optional: Show loader while communicating with backend
    try {
      // Send to backend for signup/login
      const res = await axios.post('http://localhost:5000/api/auth/google', {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });

      // Store user and token locally
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('googleUser', JSON.stringify(res.data.user));

      // Navigate to dashboard
      navigate('/');
    } catch (err) {
      console.error('Google Auth Error:', err);
      alert('Authentication failed. Try again.');
    }
  };

  return (
    <div className="text-center mt-10">
      <h2 className="text-xl font-bold mb-4">Sign up / Login with Google</h2>
      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert('Google Login Failed')} />
    </div>
  );
};

export default AuthPage;
