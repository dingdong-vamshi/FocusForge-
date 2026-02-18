import React, { useEffect, useState } from 'react';
import { 
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
    PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { Clock, Zap, AlertCircle, Activity } from 'lucide-react';
import api from '../services/api';

const COLORS = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/dashboard');
                setStats(data);
            } catch (error) {
                console.error('Failed to fetch stats');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="p-20 text-center uppercase tracking-widest animate-pulse">Forging Data...</div>;

    const pieData = stats ? Object.keys(stats.breakdown).map(key => ({
        name: key,
        value: stats.breakdown[key]
    })) : [];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Productivity <span className="text-primary">Command</span></h2>
                    <p className="text-muted-foreground">Detailed analysis of your digital behavior</p>
                </div>
                <div className="flex gap-4">
                    <StatBox icon={<Clock />} label="Total Time" value={`${stats.totalTime}m`} color="text-blue-400" />
                    <StatBox icon={<Zap />} label="Productive" value={`${stats.productiveTime}m`} color="text-purple-400" />
                    <StatBox icon={<AlertCircle />} label="Distraction" value={`${stats.distractionTime}m`} color="text-red-400" />
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Score Card */}
                <div className="lg:col-span-1 glass-morphism p-8 rounded-3xl flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-semibold mb-6">Productivity Score</h3>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-secondary" />
                            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * stats.productivityScore) / 100} className="text-primary transition-all duration-1000" />
                        </svg>
                        <span className="absolute text-4xl font-black">{stats.productivityScore}%</span>
                    </div>
                    <p className="mt-6 text-sm text-muted-foreground">Based on your activity weighting and domain classification.</p>
                </div>

                {/* Category Pie */}
                <div className="lg:col-span-2 glass-morphism p-8 rounded-3xl">
                    <h3 className="text-lg font-semibold mb-6 text-center">Time Distribution by Category</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={pieData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: '#171717', border: '1px solid #333', borderRadius: '8px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatBox = ({ icon, label, value, color }) => (
    <div className="bg-secondary/40 border border-border px-6 py-3 rounded-2xl flex items-center gap-4">
        <div className={`${color} bg-white/5 p-2 rounded-lg`}>{icon}</div>
        <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{label}</p>
            <p className="text-xl font-black">{value}</p>
        </div>
    </div>
);

export default Dashboard;
