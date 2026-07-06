import React from 'react'
import { useEditorStore } from '../stores/editorStore'
import './StatusBar.css'

const StatusBar = () => {
  const { files, activeFileId } = useEditorStore()
  const activeFile = activeFileId && files[activeFileId]

  const getLanguageLabel = () => {
    if (!activeFile) return 'No file'
    const langMap = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      java: 'Java',
      cpp: 'C++',
      csharp: 'C#',
      css: 'CSS',
      html: 'HTML',
      json: 'JSON',
      markdown: 'Markdown',
      plaintext: 'Plain Text',
    }
    return langMap[activeFile.language] || activeFile.language.toUpperCase()
  }

  const lineCount = activeFile ? (activeFile.content.match(/\n/g) || []).length + 1 : 0

  return (
    <div className="status-bar">
      <div className="status-item">
        <span>Ln {activeFile ? 1 : '—'}, Col {activeFile ? 1 : '—'}</span>
      </div>
      <div className="status-item">
        <span>{getLanguageLabel()}</span>
      </div>
      <div className="status-spacer" />
      <div className="status-item">
        <span>UTF-8</span>
      </div>
      <div className="status-item">
        <span>CRLF</span>
      </div>
      <div className="status-item">
        <span>BecondMP v1.0.0</span>
      </div>
    </div>
  )
}

export default StatusBar