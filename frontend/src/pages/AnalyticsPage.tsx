import React, { useEffect, useState } from 'react';
import SEO from '../components/SEO';
import axios from 'axios';

interface TelemetryStats {
  total_events: number;
  total_page_views: number;
  unique_visitors_today: number;
  unique_visitors_all_time: number;
  top_pages: Array<{ path: string; views: number }>;
  top_products_viewed: Array<{ product: string; views: number }>;
  top_referrers: Array<{ referrer: string; visits: number }>;
  device_breakdown: Record<string, number>;
  conversions: Record<string, number>;
  top_search_queries?: Array<{ query: string; count: number }>;
  recent_events?: Array<{
    event_type: string;
    path: string;
    referrer: string;
    device_type: string;
    created_at: string;
    metadata: Record<string, any>;
  }>;
}

const AnalyticsPage: React.FC = () => {
  const [stats, setStats] = useState<TelemetryStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  const fetchStats = async () => {
    try {
      // Relative path - proxied by Vercel edge so origin IP is never exposed!
      const res = await axios.get<TelemetryStats>('/api/telemetry/stats/');
      setStats(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.warn('Telemetry stats offline or unreachable');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchStats();
    }, 20000); // 20s live polling

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const totalDevices = stats?.device_breakdown 
    ? Object.values(stats.device_breakdown).reduce((a, b) => a + b, 0)
    : 0;

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'whatsapp_click':
      case 'whatsapp_order_click':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">WhatsApp Click</span>;
      case 'phone_call_click':
      case 'call_click':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Phone Call</span>;
      case 'product_view':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">Product View</span>;
      case 'search':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">Search</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{type}</span>;
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString.endsWith('Z') ? isoString : isoString + 'Z');
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    } catch {
      return isoString;
    }
  };

  return (
    <>
      <SEO
        title="Telemetry & Traffic Insights | Ashwi Furniture"
        description="Internal live telemetry analytics dashboard for Ashwi Furniture Kathmandu."
        url="https://www.ashwifurniture.com/admin/telemetry"
        type="website"
        noindex={true}
      />

      <div className="min-h-screen bg-slate-900 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
                  Live Telemetry
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  🔒 Zero-IP Origin Shield Active
                </span>
              </div>
              <h1 className="text-3xl font-extrabold text-white mt-2">Traffic & SEO Telemetry Dashboard</h1>
              <p className="text-sm text-slate-400 mt-1">
                Real-time engagement, search queries, and conversions across Kathmandu Valley
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${
                  autoRefresh 
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500/50 hover:bg-purple-600/40' 
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                }`}
              >
                {autoRefresh ? '⏱️ Auto-Refresh: ON (20s)' : '⏸️ Auto-Refresh: OFF'}
              </button>
              <button
                onClick={fetchStats}
                disabled={loading}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition disabled:opacity-50"
              >
                {loading ? 'Refreshing...' : '↻ Refresh Now'}
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Unique Visitors Today */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Unique Visitors (Today)</span>
                <span className="text-purple-400">👤 Daily</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-white">
                {stats?.unique_visitors_today ?? 0}
              </div>
              <p className="mt-1 text-xs text-slate-400">Hashed privacy-safe IPs</p>
            </div>

            {/* Total Page Views */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Total Page Views</span>
                <span className="text-blue-400">📄 Views</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-white">
                {stats?.total_page_views ?? 0}
              </div>
              <p className="mt-1 text-xs text-slate-400">Across all catalog routes</p>
            </div>

            {/* WhatsApp Leads */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>WhatsApp Conversions</span>
                <span className="text-emerald-400">💬 High Intent</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-emerald-400">
                {(stats?.conversions?.whatsapp_click ?? 0) + (stats?.conversions?.whatsapp_order_click ?? 0)}
              </div>
              <p className="mt-1 text-xs text-slate-400">Direct product orders & chats</p>
            </div>

            {/* Direct Phone Calls */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
                <span>Direct Phone Inquiries</span>
                <span className="text-amber-400">📞 9860479751</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-amber-400">
                {(stats?.conversions?.phone_call_click ?? 0) + (stats?.conversions?.call_click ?? 0)}
              </div>
              <p className="mt-1 text-xs text-slate-400">Click-to-call taps</p>
            </div>
          </div>

          {/* Device & Engagement Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Device Breakdown */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Device Usage</h2>
              <div className="space-y-4">
                {Object.entries(stats?.device_breakdown || {}).map(([device, count]) => {
                  const pct = totalDevices > 0 ? Math.round((count / totalDevices) * 100) : 0;
                  return (
                    <div key={device}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize text-slate-300">
                          {device === 'mobile' ? '📱 Mobile' : device === 'desktop' ? '💻 Desktop' : '📟 Tablet'}
                        </span>
                        <span className="font-semibold text-slate-200">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${device === 'mobile' ? 'bg-purple-500' : 'bg-blue-500'}`}
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
                {(!stats?.device_breakdown || Object.keys(stats.device_breakdown).length === 0) && (
                  <p className="text-sm text-slate-500">No device data yet.</p>
                )}
              </div>
            </div>

            {/* Top Internal Search Queries */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Top User Search Queries</h2>
              <div className="space-y-2.5">
                {(stats?.top_search_queries || []).slice(0, 6).map((q, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800 text-sm">
                    <span className="text-purple-300 font-mono">🔍 "{q.query}"</span>
                    <span className="text-slate-400 font-medium">{q.count} searches</span>
                  </div>
                ))}
                {(!stats?.top_search_queries || stats.top_search_queries.length === 0) && (
                  <p className="text-sm text-slate-500">No search queries recorded yet.</p>
                )}
              </div>
            </div>

            {/* Top Referrers */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Traffic Sources</h2>
              <div className="space-y-2.5">
                {(stats?.top_referrers || []).slice(0, 6).map((ref, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-slate-900/60 border border-slate-800 text-sm">
                    <span className="text-slate-300 truncate max-w-[200px]">{ref.referrer || 'Direct / Bookmark'}</span>
                    <span className="text-slate-400 font-medium">{ref.visits} visits</span>
                  </div>
                ))}
                {(!stats?.top_referrers || stats.top_referrers.length === 0) && (
                  <p className="text-sm text-slate-500">Direct traffic / No external referrers.</p>
                )}
              </div>
            </div>

          </div>

          {/* Top Products & Top Pages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top Products Viewed */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Most Viewed Furniture Pieces</h2>
              <div className="divide-y divide-slate-700/60">
                {(stats?.top_products_viewed || []).map((p, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-200">
                      <span className="text-purple-400 font-mono mr-2">#{idx + 1}</span>
                      {p.product}
                    </span>
                    <span className="text-slate-400 font-semibold">{p.views} views</span>
                  </div>
                ))}
                {(!stats?.top_products_viewed || stats.top_products_viewed.length === 0) && (
                  <p className="text-sm text-slate-500 py-3">No product views recorded yet.</p>
                )}
              </div>
            </div>

            {/* Top Pages */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-white mb-4">Top Pages Visited</h2>
              <div className="divide-y divide-slate-700/60">
                {(stats?.top_pages || []).map((p, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-sm">
                    <span className="font-mono text-xs text-slate-300 truncate max-w-[280px]">
                      {p.path}
                    </span>
                    <span className="text-slate-400 font-semibold">{p.views} views</span>
                  </div>
                ))}
                {(!stats?.top_pages || stats.top_pages.length === 0) && (
                  <p className="text-sm text-slate-500 py-3">No page views recorded yet.</p>
                )}
              </div>
            </div>

          </div>

          {/* Live Visitor Activity Stream */}
          <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Live Real-Time Activity Feed</h2>
              <span className="text-xs text-slate-400">Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="text-xs uppercase bg-slate-900/60 text-slate-400 border-b border-slate-700">
                  <tr>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Event</th>
                    <th className="py-3 px-4">Path / Target</th>
                    <th className="py-3 px-4">Device</th>
                    <th className="py-3 px-4">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50 font-mono text-xs">
                  {(stats?.recent_events || []).map((evt, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/30 transition">
                      <td className="py-2.5 px-4 text-slate-400">{formatTime(evt.created_at)}</td>
                      <td className="py-2.5 px-4">{getEventBadge(evt.event_type)}</td>
                      <td className="py-2.5 px-4 text-slate-200 truncate max-w-[240px]">{evt.path}</td>
                      <td className="py-2.5 px-4 capitalize text-slate-400">{evt.device_type}</td>
                      <td className="py-2.5 px-4 text-slate-400 truncate max-w-[200px]">
                        {evt.metadata?.product_name || evt.metadata?.query || evt.metadata?.title || '-'}
                      </td>
                    </tr>
                  ))}
                  {(!stats?.recent_events || stats.recent_events.length === 0) && (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-slate-500">
                        Awaiting incoming live visitor telemetry...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Privacy & Stealth Architecture Explainer */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-300">🛡️ Privacy & Stealth Architecture Guarantee:</p>
            <p>
              • All telemetry requests are made to relative path <code className="text-purple-300">/api/telemetry/</code> on the client domain.
            </p>
            <p>
              • Requests are routed server-to-server via Vercel Edge CDN to Cloudflare Proxies before reaching Kamatera VPS.
            </p>
            <p>
              • Neither the origin VPS IP (<code className="text-slate-500">153.76.249.224</code>) nor internal ports are discoverable in browser network traces or JavaScript bundles.
            </p>
            <p>
              • User IP addresses are hashed using SHA-256 for unique visitor counting without storing identifiable PII.
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default AnalyticsPage;
