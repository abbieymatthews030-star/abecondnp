import React from 'react'
import { FileText, Search, GitBranch, Play, Package } from 'lucide-react'
import { useUIStore } from '../stores/uiStore'
import './ActivityBar.css'

const ActivityBar = () => {
  const { activeView, setActiveView } = useUIStore()

  const views = [
    { id: 'explorer', icon: FileText, label: 'Explorer', title: 'Explorer' },
    { id: 'search', icon: Search, label: 'Search', title: 'Find in Files' },
    { id: 'scm', icon: GitBranch, label: 'SCM', title: 'Source Control' },
    { id: 'run', icon: Play, label: 'Run', title: 'Run and Debug' },
    { id: 'extensions', icon: Package, label: 'Extensions', title: 'Extensions' },
  ]

  return (
    <div className="activity-bar">
      {views.map(({ id, icon: Icon, label, title }) => (
        <button
          key={id}
          className={`activity-item ${activeView === id ? 'active' : ''}`}
          onClick={() => setActiveView(id)}
          title={title}
          aria-label={title}
        >
          <Icon size={24} />
        </button>
      ))}
      <div className="activity-spacer" />
      <button className="activity-item settings-btn" title="Settings" aria-label="Settings">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24" />
        </svg>
      </button>
    </div>
  )
}

export default ActivityBar