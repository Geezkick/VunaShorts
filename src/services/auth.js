import { showToast } from '../components/utils.js';

class AuthService {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('vuna_user')) || null;
  }

  isAuthenticated() {
    return this.currentUser !== null;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  async signInWithEmail(email, password) {
    if (!email || !password) throw new Error('Email and password required');
    // Simulate network delay
    await new Promise(r => setTimeout(r, 1000));
    
    // Simulate auth check
    if (password === 'wrong') {
      throw new Error('Invalid credentials');
    }

    const user = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      email: email,
      name: email.split('@')[0],
      provider: 'email',
      verified: true
    };
    
    this._setSession(user);
    return user;
  }

  async signUpWithEmail(name, email, password) {
    if (!name || !email || !password) throw new Error('All fields required');
    if (password.length < 6) throw new Error('Password too weak');
    
    await new Promise(r => setTimeout(r, 1500));
    
    const user = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      provider: 'email',
      verified: false
    };
    
    this._setSession(user);
    return user;
  }

  async verifyOTP(otp) {
    await new Promise(r => setTimeout(r, 1000));
    if (otp !== '123456' && otp !== '000000') {
      throw new Error('Invalid OTP');
    }
    this.currentUser.verified = true;
    this._setSession(this.currentUser);
    return true;
  }

  async signInWithGoogle() {
    await new Promise(r => setTimeout(r, 1000));
    const user = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: 'Google User',
      email: 'user@gmail.com',
      provider: 'google',
      verified: true
    };
    this._setSession(user);
    return user;
  }

  async signInWithApple() {
    await new Promise(r => setTimeout(r, 1000));
    const user = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: 'Apple User',
      email: 'user@icloud.com',
      provider: 'apple',
      verified: true
    };
    this._setSession(user);
    return user;
  }

  signOut() {
    this.currentUser = null;
    localStorage.removeItem('vuna_user');
    showToast('Signed out successfully', 'info');
  }

  _setSession(user) {
    this.currentUser = user;
    localStorage.setItem('vuna_user', JSON.stringify(user));
  }
}

export const authService = new AuthService();
