import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, FileText, Search, GitBranch, Play, Package, Menu } from 'lucide-react'
import { useUIStore } from '../stores/uiStore'
import './TopMenu.css'

const TopMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const menuRef = useRef(null)
  const { sidebarOpen, terminalOpen, toggleSidebar, toggleTerminal } = useUIStore()

  const menus = [
    {
      label: 'File',
      items: [
        { label: 'New File', shortcut: 'Ctrl+N', action: () => console.log('New File') },
        { label: 'New Folder', shortcut: 'Ctrl+Shift+N', action: () => console.log('New Folder') },
        { label: 'Open File', shortcut: 'Ctrl+O', action: () => console.log('Open') },
        { label: 'Open Folder', shortcut: 'Ctrl+K Ctrl+O', action: () => console.log('Open Folder') },
        { type: 'divider' },
        { label: 'Save', shortcut: 'Ctrl+S', action: () => console.log('Save') },
        { label: 'Save All', shortcut: 'Ctrl+Shift+S', action: () => console.log('Save All') },
        { type: 'divider' },
        { label: 'Exit', shortcut: 'Ctrl+Q', action: () => console.log('Exit') },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: 'Ctrl+Z', action: () => console.log('Undo') },
        { label: 'Redo', shortcut: 'Ctrl+Shift+Z', action: () => console.log('Redo') },
        { type: 'divider' },
        { label: 'Cut', shortcut: 'Ctrl+X', action: () => console.log('Cut') },
        { label: 'Copy', shortcut: 'Ctrl+C', action: () => console.log('Copy') },
        { label: 'Paste', shortcut: 'Ctrl+V', action: () => console.log('Paste') },
        { type: 'divider' },
        { label: 'Find', shortcut: 'Ctrl+F', action: () => console.log('Find') },
        { label: 'Replace', shortcut: 'Ctrl+H', action: () => console.log('Replace') },
      ],
    },
    {
      label: 'View',
      items: [
        {
          label: `${sidebarOpen ? 'Hide' : 'Show'} Sidebar`,
          shortcut: 'Ctrl+B',
          action: toggleSidebar,
        },
        {
          label: `${terminalOpen ? 'Hide' : 'Show'} Terminal`,
          shortcut: 'Ctrl+`',
          action: toggleTerminal,
        },
        { type: 'divider' },
        { label: 'Command Palette', shortcut: 'Ctrl+Shift+P', action: () => console.log('Command Palette') },
        { label: 'Zoom In', shortcut: 'Ctrl+=', action: () => console.log('Zoom In') },
        { label: 'Zoom Out', shortcut: 'Ctrl+-', action: () => console.log('Zoom Out') },
      ],
    },
    {
      label: 'Selection',
      items: [
        { label: 'Select All', shortcut: 'Ctrl+A', action: () => console.log('Select All') },
        { label: 'Expand Selection', shortcut: 'Shift+Alt+Right', action: () => console.log('Expand') },
        { label: 'Shrink Selection', shortcut: 'Shift+Alt+Left', action: () => console.log('Shrink') },
        { type: 'divider' },
        { label: 'Column Selection Mode', shortcut: 'Shift+Alt+I', action: () => console.log('Column Selection') },
      ],
    },
    {
      label: 'Terminal',
      items: [
        { label: 'New Terminal', shortcut: 'Ctrl+Shift+`', action: () => console.log('New Terminal') },
        { label: 'Run Task', shortcut: 'Ctrl+Shift+B', action: () => console.log('Run Task') },
        { label: 'Kill Terminal', shortcut: '', action: () => console.log('Kill Terminal') },
        { type: 'divider' },
        { label: 'Clear', shortcut: '', action: () => console.log('Clear Terminal') },
      ],
    },
    {
      label: 'Help',
      items: [
        { label: 'About BecondMP', shortcut: '', action: () => alert('BecondMP v1.0.0\nVS Code Web Replica') },
        { label: 'Welcome', shortcut: '', action: () => console.log('Welcome') },
        { label: 'Documentation', shortcut: '', action: () => window.open('https://github.com/abbieymatthews030-star/abecondnp') },
        { label: 'Report Issue', shortcut: '', action: () => window.open('https://github.com/abbieymatthews030-star/abecondnp/issues') },
      ],
    },
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="top-menu" ref={menuRef}>
      <div className="menu-bar">
        {menus.map((menu, idx) => (
          <div key={idx} className="menu-item">
            <button
              className={`menu-button ${activeMenu === idx ? 'active' : ''}`}
              onClick={() => setActiveMenu(activeMenu === idx ? null : idx)}
            >
              {menu.label}
            </button>
            {activeMenu === idx && (
              <div className="dropdown-menu">
                {menu.items.map((item, itemIdx) =>
                  item.type === 'divider' ? (
                    <div key={itemIdx} className="divider" />
                  ) : (
                    <button
                      key={itemIdx}
                      className="dropdown-item"
                      onClick={() => {
                        item.action()
                        setActiveMenu(null)
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
                    </button>
                  )
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopMenu