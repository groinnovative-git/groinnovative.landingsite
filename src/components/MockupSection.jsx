import useAnimateIn from '../hooks/useAnimateIn'
import './MockupSection.css'

const rows = [
    { color: '#27c93f', name: 'Lead Scoring Automation', tag: 'RUNNING', tagCls: 'tag-run', time: 'now' },
    { color: '#ffbd2e', name: 'Weekly Report Generator', tag: 'QUEUED', tagCls: 'tag-que', time: '2m' },
    { color: '#0098F3', name: 'CRM Sync — Salesforce', tag: 'DONE', tagCls: 'tag-done', time: '4m' },
    { color: '#27c93f', name: 'Onboarding Email Sequence', tag: 'RUNNING', tagCls: 'tag-run', time: '6m' },
    { color: '#0098F3', name: 'Slack Daily Digest', tag: 'DONE', tagCls: 'tag-done', time: '12m' },
]

export default function MockupSection() {
    const ref = useAnimateIn()
    return (
        <section className="mockup-section">
            <div className="container">
                <div className="mockup-outer animate-in" ref={ref}>
                    <div className="mockup-glow" aria-hidden />

                    {/* Decorative beams */}
                    <div className="mockup-beam" aria-hidden>
                        <div className="mb-1" /><div className="mb-2" /><div className="mb-3" />
                    </div>

                    <div className="app-frame">
                        {/* App bar */}
                        <div className="app-bar">
                            <div className="traffic">
                                <div className="dot-r" /><div className="dot-y" /><div className="dot-g" />
                            </div>
                            <div className="app-bar-logo">Antigraty — Automation Dashboard</div>
                            <div className="app-bar-time">Live · 24 workflows active</div>
                        </div>

                        {/* Body */}
                        <div className="app-body">
                            {/* Sidebar */}
                            <div className="app-sidebar">
                                <div className="sidebar-section">Workspace</div>
                                {[
                                    { icon: '⚡', label: 'Workflows', active: false },
                                    { icon: '🤖', label: 'AI Actions', active: true },
                                    { icon: '🔗', label: 'Integrations', active: false },
                                    { icon: '📊', label: 'Analytics', active: false },
                                ].map(item => (
                                    <div key={item.label} className={`sidebar-item${item.active ? ' active' : ''}`}>
                                        <span className="sidebar-icon">{item.icon}</span>{item.label}
                                    </div>
                                ))}
                                <div className="sidebar-section" style={{ marginTop: 16 }}>Tools</div>
                                {[
                                    { icon: '🎛️', label: 'Settings', active: false },
                                    { icon: '🔔', label: 'Alerts', active: false },
                                    { icon: '👥', label: 'Team', active: false },
                                ].map(item => (
                                    <div key={item.label} className={`sidebar-item${item.active ? ' active' : ''}`}>
                                        <span className="sidebar-icon">{item.icon}</span>{item.label}
                                    </div>
                                ))}
                            </div>

                            {/* Main content */}
                            <div className="app-main">
                                <div className="search-bar">
                                    <span className="search-icon">🔍</span>
                                    <span>Search automations or ask AI...</span>
                                    <span className="search-cursor">|</span>
                                </div>
                                <div className="app-tabs">
                                    <div className="tab tab-active">Active Runs</div>
                                    <div className="tab">Completed</div>
                                    <div className="tab">Scheduled</div>
                                </div>
                                <div className="app-rows">
                                    {rows.map((r, i) => (
                                        <div key={i} className="app-row">
                                            <div className="row-status" style={{ background: r.color, boxShadow: `0 0 6px ${r.color}` }} />
                                            <span className="row-name">{r.name}</span>
                                            <span className={`row-tag ${r.tagCls}`}>{r.tag}</span>
                                            <span className="row-time">{r.time} ago</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
