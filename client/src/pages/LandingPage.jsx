import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, BarChart3, Target, Bell, ArrowRight } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 glass-morphism px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg">
                        <Activity className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight uppercase">Focus<span className="text-primary">Forge</span></span>
                </div>
                <button 
                    onClick={() => navigate('/login')}
                    className="px-5 py-2 rounded-full bg-primary hover:bg-primary/90 transition-all font-medium text-sm"
                >
                    Get Started
                </button>
            </nav>

            {/* Hero */}
            <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    Master Your <span className="gradient-text">Focus.</span> <br />
                    Forge Better Habits.
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    A production-grade productivity analytics platform that tracks your behavior, 
                    identifies distractions, and helps you reclaim your time with smart insights.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <button 
                        onClick={() => navigate('/register')}
                        className="px-8 py-4 rounded-xl bg-primary text-white font-semibold flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        Start Journey <ArrowRight className="w-5 h-5" />
                    </button>
                    <div className="bg-secondary px-6 py-2 rounded-lg border border-border text-sm font-medium">
                        Open Source • Secure • Smart
                    </div>
                </div>
            </header>

            {/* Features */}
            <section className="py-20 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<BarChart3 />} 
                    title="Real-time Analytics" 
                    desc="Track every second of your digital life. Categorize apps automatically and visualize your productivity."
                />
                <FeatureCard 
                    icon={<Target />} 
                    title="Goal Tracking" 
                    desc="Set daily limits and focus targets. Get notified before distractions take over your schedule."
                />
                <FeatureCard 
                    icon={<Bell />} 
                    title="Smart Interventions" 
                    desc="Behavioral triggers help you break the habit of mindless scrolling with timely focus reminders."
                />
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <div className="p-8 rounded-2xl glass-morphism hover:border-primary/50 transition-colors group">
        <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-all">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </div>
);

export default LandingPage;
