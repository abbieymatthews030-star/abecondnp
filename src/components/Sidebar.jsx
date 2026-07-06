import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown, File, Folder, Plus, Trash2, FolderPlus } from 'lucide-react'
import { useEditorStore } from '../stores/editorStore'
import './Sidebar.css'

const Sidebar = ({ activeView }) => {
  const { files, createFile, openTab, deleteFile } = useEditorStore()
  const [expandedFolders, setExpandedFolders] = useState({})

  const renderExplorer = () => (
    <div className="sidebar-view explorer-view">
      <div className="view-header">
        <h3>Explorer</h3>
        <div className="view-actions">
          <button title="New File" className="action-btn">
            <Plus size={16} />
          </button>
          <button title="New Folder" className="action-btn">
            <FolderPlus size={16} />
          </button>
        </div>
      </div>
      <div className="file-tree">
        {Object.values(files).map((file) => (
          <div key={file.id} className="file-item">
            <div className="file-info">
              <File size={16} />
              <span>{file.name}</span>
            </div>
            <button
              className="delete-btn"
              onClick={() => deleteFile(file.id)}
              title="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSearch = () => (
    <div className="sidebar-view search-view">
      <div className="view-header">
        <h3>Search</h3>
      </div>
      <input type="text" placeholder="Search in files..." className="search-input" />
      <div className="search-results">No results</div>
    </div>
  )

  const renderSCM = () => (
    <div className="sidebar-view scm-view">
      <div className="view-header">
        <h3>Source Control</h3>
      </div>
      <div className="scm-info">Initialize a repository to see changes</div>
    </div>
  )

  const renderRun = () => (
    <div className="sidebar-view run-view">
      <div className="view-header">
        <h3>Run and Debug</h3>
      </div>
      <div className="run-info">No launch configuration found</div>
    </div>
  )

  const renderExtensions = () => (
    <div className="sidebar-view extensions-view">
      <div className="view-header">
        <h3>Extensions</h3>
      </div>
      <input type="text" placeholder="Search extensions..." className="search-input" />
      <div className="extensions-list">
        <div className="extension-item">
          <div className="ext-info">
            <strong>ES7+ React/Redux/React-Native Snippets</strong>
            <p>Popular snippets for React</p>
          </div>
        </div>
      </div>
    </div>
  )

  const views = {
    explorer: renderExplorer,
    search: renderSearch,
    scm: renderSCM,
    run: renderRun,
    extensions: renderExtensions,
  }

  return (
    <div className="sidebar">
      {views[activeView] && views[activeView]()}
    </div>
  )
}

export default Sidebar