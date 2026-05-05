import { AxiosError } from 'axios';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage, type AuthProvider, type AuthProviderResponse } from '@toolpad/core/SignInPage';
import { createTheme } from '@mui/material/styles';
import { api } from '../../services/api';
import { useNavigate } from "react-router";

interface TokenResponse {
  access: string;
  refresh: string;
}

const providers: AuthProvider[] = [{ id: 'credentials', name: 'Standard Account' }];
const theme = createTheme();

export default function SignIn() {
    const navigate = useNavigate();
  const handleSignIn = async (
    provider: AuthProvider,
    formData: FormData
  ): Promise<AuthProviderResponse> => {
    
    try {
      const response = await api.post<TokenResponse>('/login/', {
        username: formData.get('username') as string,
        password: formData.get('password') as string,
      });

      // Save the tokens for future requests
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      navigate('/books/'); // Redirect to the books page after successful login

      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<{ detail?: string }>;
      return {
        error: axiosError.response?.data?.detail || 'Invalid username or password',
      };
    }
  };

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={handleSignIn}
        providers={providers}
        slotProps={{
          emailField: { label: 'Username', name: 'username', autoFocus: true },
          passwordField: { label: 'Password', name: 'password' },
          form: { noValidate: true },
        }}
      />
    </AppProvider>
  );
}
