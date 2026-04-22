import React, { useEffect, useState } from 'react';
import { 
    ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, 
    PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Line
} from 'recharts';
import { Clock, Zap, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';

const COLORS = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/dashboard');
                // Simulate trend data for demonstration since the backend doesn't provide historical week data yet
                const simulatedTrend = Array(7).fill(0).map((_, i) => ({
                    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
                    productive: Math.floor(Math.random() * 120) + 30,
                    distraction: Math.floor(Math.random() * 80) + 10
                }));
                setStats({ ...data, simulatedTrend });
            } catch (error) {
                console.error('Failed to fetch stats', error);
            } finally {
                setLoading(false);
            }
        };

        // Initial fetch
        fetchStats();

        // Real-time polling every 5 seconds
        const intervalId = setInterval(fetchStats, 5000);
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
    );

    const pieData = stats ? Object.keys(stats.breakdown || {})
        .filter(k => stats.breakdown[k] > 0)
        .map(key => ({
            name: key,
            value: stats.breakdown[key]
        })) : [];

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="p-6 max-w-[1400px] mx-auto space-y-8">
            <motion.header variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-6">
                <div>
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                        <h2 className="text-4xl font-black tracking-tight mb-2">Focus<span className="text-primary">Forge</span> Command</h2>
                        <p className="text-muted-foreground/80 font-medium">Real-time analytical breakdown of your cognitive output.</p>
                    </motion.div>
                </div>
                <div className="flex flex-wrap gap-4">
                    <StatBox icon={<Clock />} label="Total Recorded" value={`${(stats.totalTime || 0).toFixed(2)}m`} color="text-blue-400" />
                    <StatBox icon={<Zap />} label="Deep Work" value={`${(stats.productiveTime || 0).toFixed(2)}m`} color="text-purple-400" />
                    <StatBox icon={<AlertCircle />} label="Distraction" value={`${(stats.distractionTime || 0).toFixed(2)}m`} color="text-red-400" />
                </div>
            </motion.header>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Score Card */}
                <motion.div variants={item} className="xl:col-span-1 glass-morphism p-8 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground mb-8">Efficiency Score</h3>
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                            <circle cx="96" cy="96" r="80" stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="transparent" />
                            <motion.circle 
                                initial={{ strokeDashoffset: 502 }}
                                animate={{ strokeDashoffset: 502 - (502 * stats.productivityScore) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="16" fill="transparent" 
                                strokeDasharray={502} 
                                strokeLinecap="round"
                                className="text-primary shadow-glow" 
                            />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: 'spring' }} className="text-5xl font-black gradient-text">
                                {stats.productivityScore}%
                            </motion.span>
                        </div>
                    </div>
                </motion.div>

                {/* Performance Trend */}
                <motion.div variants={item} className="xl:col-span-2 glass-morphism p-8 rounded-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground">Productivity Trajectory</h3>
                        <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer>
                            <ComposedChart data={stats.simulatedTrend}>
                                <defs>
                                    <linearGradient id="prodColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" stroke="#666" fontSize={12} axisLine={false} tickLine={false} />
                                <YAxis hide />
                                <Tooltip cursor={{fill: 'rgba(255,255,255,0.02)'}} contentStyle={{ background: 'rgba(20,20,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', backdropFilter: 'blur(10px)' }} />
                                <Bar dataKey="distraction" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} opacity={0.5} />
                                <Area type="monotone" dataKey="productive" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#prodColor)" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Category Donut */}
                <motion.div variants={item} className="xl:col-span-1 glass-morphism p-8 rounded-3xl">
                    <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground mb-6 text-center">Category Split</h3>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie 
                                    activeIndex={activeIndex}
                                    onMouseEnter={onPieEnter}
                                    data={pieData} 
                                    innerRadius={65} 
                                    outerRadius={90} 
                                    paddingAngle={8} 
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ filter: `drop-shadow(0px 0px 8px ${COLORS[index % COLORS.length]}40)`}} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ background: 'rgba(20,20,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} itemStyle={{ color: '#fff' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        {pieData.length === 0 && (
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">No categorical data</div>
                        )}
                    </div>
                </motion.div>

                {/* Real-time Heatmap */}
                <motion.div variants={item} className="xl:col-span-3 glass-morphism p-8 rounded-3xl group">
                    <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground mb-6">Activity Heat Profile (24h)</h3>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer>
                            <AreaChart data={stats.hourlyHeatmap || []}>
                                <defs>
                                    <linearGradient id="heatColor" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} interval={2} />
                                <YAxis hide />
                                <Tooltip cursor={false} contentStyle={{ background: 'rgba(20,20,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                <Area type="monotone" dataKey="intensity" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#heatColor)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Column for Insights and Distractions */}
                <motion.div variants={item} className="xl:col-span-1 flex flex-col gap-6">
                    {/* Focus Assistant */}
                    <div className="glass-morphism p-8 rounded-3xl">
                        <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground mb-6 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-500" /> Focus Assistant
                        </h3>
                        <div className="space-y-4">
                            {(stats.recommendations || []).length > 0 ? stats.recommendations.map((rec, i) => (
                                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 + (i*0.1) }} key={i} 
                                    className={`p-5 rounded-2xl border ${rec.type === 'danger' ? 'bg-red-500/5 border-red-500/20 text-red-200' : rec.type === 'success' ? 'bg-green-500/5 border-green-500/20 text-green-200' : rec.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500/20 text-yellow-200' : 'bg-blue-500/5 border-blue-500/20 text-blue-200'}`}>
                                    <p className="text-sm font-medium leading-relaxed">{rec.text}</p>
                                </motion.div>
                            )) : (
                                <div className="text-center p-8 bg-white/5 rounded-2xl border border-white/5">
                                    <p className="text-muted-foreground text-sm">Gathering behavioral patterns...</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Top Distractions Bar Chart */}
                    <div className="glass-morphism p-8 rounded-3xl flex-1 min-h-[300px]">
                        <h3 className="text-sm uppercase tracking-widest font-bold text-muted-foreground mb-6 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500" /> Top Distractions
                        </h3>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer>
                                <BarChart layout="vertical" data={stats.topDistractions || []} margin={{ left: -20, right: 20 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="domain" type="category" stroke="#888" fontSize={11} tickLine={false} axisLine={false} width={100} />
                                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ background: 'rgba(20,20,25,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                                    <Bar dataKey="duration" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={12} />
                                </BarChart>
                            </ResponsiveContainer>
                            {(stats.topDistractions || []).length === 0 && (
                                <p className="text-center text-muted-foreground text-xs mt-4">Clean slate! No major distractions.</p>
                            )}
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

const StatBox = ({ icon, label, value, color }) => (
    <motion.div whileHover={{ y: -5, scale: 1.02 }} className="glass-morphism px-8 py-5 rounded-3xl flex items-center gap-5 cursor-pointer">
        <div className={`${color} bg-white/5 p-3 rounded-2xl shadow-inner`}>
            {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
        <div>
            <p className="text-[11px] uppercase font-bold tracking-widest text-muted-foreground">{label}</p>
            <p className="text-3xl font-black mt-1 tracking-tight">{value}</p>
        </div>
    </motion.div>
);

export default Dashboard;
