import libraryTheme from '../../theme';
import { AxiosError } from 'axios';
import { AppProvider } from '@toolpad/core/AppProvider';
import {
  SignInPage,
  type AuthProvider,
} from '@toolpad/core/SignInPage';
import { api } from '../../services/api';
import { useNavigate, useLocation } from 'react-router';

interface TokenResponse {
  access: string;
  refresh: string;
}

const providers: AuthProvider[] = [
  { id: 'credentials', name: 'Standard Account' },
];


export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = async (_provider: AuthProvider, formData: FormData) => {
    
    try {
      const response = await api.post<TokenResponse>('/login/', {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
      });

      // Save the tokens for future requests
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      const origin = location.state?.from || '/books/';
      navigate(origin); // Redirect to the books page after successful login

      return {};
    } catch (error) {
      const axiosError = error as AxiosError<{ detail?: string }>;
      return {
        error:
          axiosError.response?.data?.detail || 'Invalid username or password',
      };
    }
}

  return (
    <AppProvider theme={libraryTheme}>
      <SignInPage
        signIn={handleSignIn}
        providers={providers}
        slotProps={{
          emailField: { label: 'Username', name: 'username', autoFocus: true, placeholder: 'Username' },
          passwordField: { label: 'Password', name: 'password' },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
