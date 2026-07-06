import React, { useState, useRef, useEffect } from 'react'
import { useTerminalStore } from '../stores/terminalStore'
import { executeCommand } from '../lib/commands'
import { useOpenRouterAI } from '../hooks/useOpenRouterAI'
import './Terminal.css'

const Terminal = () => {
  const { history, output, currentCommand, addCommand, addOutput, clearOutput, setCurrentCommand, navigateHistory } = useTerminalStore()
  const [isStreaming, setIsStreaming] = useState(false)
  const terminalRef = useRef(null)
  const inputRef = useRef(null)
  const { queryAI } = useOpenRouterAI()

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [output])

  const handleCommand = async (cmd) => {
    if (!cmd.trim()) return

    addOutput(`$ ${cmd}`)
    addCommand(cmd)
    setCurrentCommand('')

    try {
      // AI Command Handler
      if (cmd.startsWith('/')) {
        setIsStreaming(true)
        const slashCmd = cmd.substring(1).split(' ')[0]
        const context = cmd.substring(cmd.indexOf(' ') + 1)

        if (slashCmd === 'help') {
          const response = await queryAI(`Help with: ${context}`, true)
          addOutput(response)
        } else if (slashCmd === 'explain') {
          const response = await queryAI(`Explain this code: ${context}`, true)
          addOutput(response)
        } else if (slashCmd === 'refactor') {
          const response = await queryAI(`Refactor this code: ${context}`, true)
          addOutput(response)
        } else if (slashCmd === 'debug') {
          const response = await queryAI(`Debug this code: ${context}`, true)
          addOutput(response)
        } else {
          addOutput(`Unknown command: /${slashCmd}`)
        }
        setIsStreaming(false)
      } else {
        // Regular command execution
        const result = await executeCommand(cmd)
        if (result.error) {
          addOutput(`Error: ${result.error}`)
        } else {
          addOutput(result.output)
        }
      }
    } catch (error) {
      addOutput(`Error: ${error.message}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand(currentCommand)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      navigateHistory(1)
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      navigateHistory(-1)
    }
  }

  return (
    <div className="terminal">
      <div className="terminal-header">
        <span>Terminal</span>
        <button
          className="terminal-clear"
          onClick={() => clearOutput()}
          title="Clear Terminal"
        >
          Clear
        </button>
      </div>
      <div className="terminal-content" ref={terminalRef}>
        {output.length === 0 ? (
          <div className="terminal-welcome">
            <p>BecondMP Terminal v1.0.0</p>
            <p>Type commands or use / for AI assistance</p>
            <p>Type 'help' for available commands</p>
          </div>
        ) : (
          output.map((line, idx) => (
            <div key={idx} className="terminal-line">
              {line}
            </div>
          ))
        )}
        {isStreaming && (
          <div className="terminal-line streaming">
            <span className="cursor">▌</span>
          </div>
        )}
      </div>
      <div className="terminal-input-area">
        <span className="terminal-prompt">$ </span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input"
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command or /help for AI"
          autoFocus
        />
      </div>
    </div>
  )
}

export default Terminal