import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

const AuthPage = ({ mode }) => {
    const isLogin = mode === 'login';
    const navigate = useNavigate();
    const { login, register } = useAuth();
    
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await register(formData);
                await login(formData.email, formData.password);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Authentication failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary p-3 rounded-2xl">
                            <Activity className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black tracking-tighter">
                        {isLogin ? 'Welcome Back Tracer' : 'Join the Forge'}
                    </h2>
                    <p className="text-muted-foreground mt-2">
                        {isLogin ? 'Enter your credentials to access insights.' : 'Create an account to start tracking.'}
                    </p>
                </div>

                <div className="glass-morphism p-8 rounded-3xl space-y-6">
                    {error && <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg text-center">{error}</div>}
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Full Name</label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input 
                                        type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary transition-colors" placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input 
                                    type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary transition-colors" placeholder="user@focusforge.com"
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-muted-foreground uppercase ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input 
                                    type="password" required value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-10 pr-4 outline-none focus:border-primary transition-colors" placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                            {isLogin ? 'Access Dashboard' : 'Forge Account'} <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                    {isLogin ? "Don't have an account?" : "Already a member?"} {' '}
                    <Link to={isLogin ? '/register' : '/login'} className="text-primary font-bold hover:underline">
                        {isLogin ? 'Register now' : 'Login here'}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
