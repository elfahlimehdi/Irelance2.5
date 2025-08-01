import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

/**
 * Login form data interface
 */
interface LoginFormData {
  email: string;
  password: string;
}

/**
 * Registration form data interface
 */
interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * Authentication mode type
 */
type AuthMode = 'login' | 'register';

/**
 * Password visibility state type
 */
type PasswordVisibility = {
  password: boolean;
  confirmPassword: boolean;
};

/**
 * Authentication page component - handles user login and registration
 * Features: form validation, password visibility toggle, error handling, loading states
 */
const Auth: React.FC = () => {
  // State management
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [passwordVisibility, setPasswordVisibility] = useState<PasswordVisibility>({
    password: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Form instances
  const loginForm = useForm<LoginFormData>();
  const registerForm = useForm<RegisterFormData>();

  /**
   * Handle authentication mode toggle
   */
  const handleModeToggle = useCallback((mode: AuthMode): void => {
    setAuthMode(mode);
    setError(null);
    // Reset forms when switching modes
    if (mode === 'login') {
      registerForm.reset();
    } else {
      loginForm.reset();
    }
  }, [loginForm, registerForm]);

  /**
   * Toggle password visibility
   */
  const togglePasswordVisibility = useCallback((field: keyof PasswordVisibility): void => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }, []);

  /**
   * Handle login form submission
   */
  const handleLogin = useCallback(async (data: LoginFormData): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await signIn(data.email, data.password);
      
      if (authError) {
        setError(typeof authError === 'string' ? authError : authError.message || 'Erreur de connexion');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
  }, [signIn, navigate]);

  /**
   * Handle registration form submission
   */
  const handleRegister = useCallback(async (data: RegisterFormData): Promise<void> => {
    // Validate password confirmation
    if (data.password !== data.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: authError } = await signUp(data.email, data.password, data.fullName);
      
      if (authError) {
        setError(typeof authError === 'string' ? authError : authError.message || 'Erreur d\'inscription');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
  }, [signUp, navigate]);

  /**
   * Render form input field with icon and validation
   */
  const renderFormField = useCallback((
    form: any,
    fieldName: string,
    label: string,
    type: string,
    placeholder: string,
    icon: React.ReactNode,
    validation: any,
    showPasswordToggle: boolean = false
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5">
          {icon}
        </div>
        <input
          type={type}
          {...form.register(fieldName, validation)}
          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
            form.formState.errors[fieldName] ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder={placeholder}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => togglePasswordVisibility(fieldName as keyof PasswordVisibility)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={`${passwordVisibility[fieldName as keyof PasswordVisibility] ? 'Masquer' : 'Afficher'} le mot de passe`}
          >
            {passwordVisibility[fieldName as keyof PasswordVisibility] ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {form.formState.errors[fieldName] && (
        <p className="mt-1 text-sm text-red-600">
          {form.formState.errors[fieldName]?.message}
        </p>
      )}
    </div>
  ), [passwordVisibility, togglePasswordVisibility]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Link to="/" className="inline-block">
            <div className="text-3xl font-bold text-blue-600">IRELANCE</div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {authMode === 'login' ? 'Connexion' : 'Créer un compte'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {authMode === 'login' 
              ? 'Connectez-vous à votre compte' 
              : 'Rejoignez la communauté IRELANCE'
            }
          </p>
        </motion.div>

        {/* Auth Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {/* Mode Toggle Buttons */}
          <div className="flex mb-8">
            <button
              onClick={() => handleModeToggle('login')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg transition-colors ${
                authMode === 'login'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => handleModeToggle('register')}
              className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg transition-colors ${
                authMode === 'register'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span className="text-red-700 text-sm">{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          {authMode === 'login' ? (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
              {renderFormField(
                loginForm,
                'email',
                'Email',
                'email',
                'votre@email.com',
                <Mail />,
                {
                      required: 'L\'email est requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalide'
                      }
                }
              )}

              {renderFormField(
                loginForm,
                'password',
                'Mot de passe',
                passwordVisibility.password ? 'text' : 'password',
                '••••••••',
                <Lock />,
                {
                      required: 'Le mot de passe est requis',
                      minLength: {
                        value: 6,
                        message: 'Le mot de passe doit contenir au moins 6 caractères'
                      }
                },
                true
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Se souvenir de moi</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </motion.button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-6">
              {renderFormField(
                registerForm,
                'fullName',
                'Nom complet',
                'text',
                'Votre nom complet',
                <User />,
                {
                      required: 'Le nom complet est requis',
                      minLength: {
                        value: 2,
                        message: 'Le nom doit contenir au moins 2 caractères'
                      }
                }
              )}

              {renderFormField(
                registerForm,
                'email',
                'Email',
                'email',
                'votre@email.com',
                <Mail />,
                {
                      required: 'L\'email est requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalide'
                      }
                }
              )}

              {renderFormField(
                registerForm,
                'password',
                'Mot de passe',
                passwordVisibility.password ? 'text' : 'password',
                '••••••••',
                <Lock />,
                {
                      required: 'Le mot de passe est requis',
                      minLength: {
                        value: 6,
                        message: 'Le mot de passe doit contenir au moins 6 caractères'
                      }
                },
                true
              )}

              {renderFormField(
                registerForm,
                'confirmPassword',
                'Confirmer le mot de passe',
                passwordVisibility.confirmPassword ? 'text' : 'password',
                '••••••••',
                <Lock />,
                {
                      required: 'La confirmation du mot de passe est requise'
                },
                true
              )}

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  J'accepte les{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700">
                    conditions d'utilisation
                  </button>{' '}
                  et la{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-700">
                    politique de confidentialité
                  </button>
                </span>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Création...
                  </>
                ) : (
                  'Créer mon compte'
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;