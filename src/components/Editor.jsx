import React, { useRef, useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { useEditorStore } from '../stores/editorStore'
import './Editor.css'

const EditorComponent = () => {
  const { files, activeFileId, createFile, updateFile, openTab } = useEditorStore()
  const editorRef = useRef(null)
  const [language, setLanguage] = useState('plaintext')

  useEffect(() => {
    if (!activeFileId && Object.keys(files).length === 0) {
      const defaultId = 'welcome'
      createFile(defaultId, 'Welcome.md', 'markdown', '# Welcome to BecondMP\n\n## Quick Start\n- Create a new file (Ctrl+N)\n- Type code\n- Open terminal (Ctrl+`)\n- Use AI assistance with `/` commands')
      openTab(defaultId)
    }
  }, [files, activeFileId, createFile, openTab])

  const activeFile = activeFileId && files[activeFileId]

  useEffect(() => {
    if (activeFile) {
      setLanguage(activeFile.language)
    }
  }, [activeFile])

  const handleEditorChange = (value) => {
    if (activeFileId) {
      updateFile(activeFileId, value || '')
    }
  }

  const handleEditorMount = (editor) => {
    editorRef.current = editor
    editor.focus()
  }

  return (
    <div className="editor">
      <div className="editor-tabs">
        {useEditorStore((state) => state.openTabs).map((fileId) => {
          const file = files[fileId]
          if (!file) return null
          return (
            <div
              key={fileId}
              className={`editor-tab ${activeFileId === fileId ? 'active' : ''}`}
              onClick={() => openTab(fileId)}
            >
              <span className="tab-label">{file.name}</span>
              <button
                className="tab-close"
                onClick={(e) => {
                  e.stopPropagation()
                  useEditorStore.getState().closeTab(fileId)
                }}
              >
                ×
              </button>
            </div>
          )
        })}
      </div>
      <div className="editor-content">
        {activeFile ? (
          <Editor
            height="100%"
            language={language}
            value={activeFile.content}
            onChange={handleEditorChange}
            onMount={handleEditorMount}
            theme="vs-dark"
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              fontFamily: '"Fira Code", "Monaco", "Courier New", monospace',
              lineNumbers: 'on',
              wordWrap: 'on',
              autoClosingBrackets: 'always',
              autoClosingQuotes: 'always',
              formatOnPaste: true,
              tabSize: 2,
              insertSpaces: true,
              smoothScrolling: true,
              cursorBlinking: 'blink',
              renderWhitespace: 'selection',
              scrollBeyondLastLine: false,
            }}
          />
        ) : (
          <div className="editor-empty">No file selected</div>
        )}
      </div>
    </div>
  )
}

export default EditorComponent