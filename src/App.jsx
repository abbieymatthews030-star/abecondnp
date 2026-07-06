import React, { useState, useEffect } from 'react'
import ActivityBar from './components/ActivityBar'
import TopMenu from './components/TopMenu'
import Editor from './components/Editor'
import Terminal from './components/Terminal'
import Sidebar from './components/Sidebar'
import StatusBar from './components/StatusBar'
import { useEditorStore } from './stores/editorStore'
import { useUIStore } from './stores/uiStore'
import './App.css'

function App() {
  const { activeView } = useUIStore()
  const { sidebarOpen, terminalOpen } = useUIStore()

  return (
    <div className="app-container">
      <TopMenu />
      <div className="main-layout">
        <ActivityBar />
        <div className="editor-area">
          {sidebarOpen && <Sidebar activeView={activeView} />}
          <div className="editor-container">
            <Editor />
          </div>
        </div>
      </div>
      {terminalOpen && <Terminal />}
      <StatusBar />
    </div>
  )
}

export default App