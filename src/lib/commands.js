// Terminal command execution engine
const commands = {
  // File system commands
  ls: (args) => {
    const files = ['file1.js', 'file2.py', 'folder/']
    return {
      output: files.join('\n'),
      code: 0,
    }
  },

  pwd: () => ({
    output: '/home/user/project',
    code: 0,
  }),

  cd: (args) => ({
    output: '',
    code: 0,
  }),

  mkdir: (args) => {
    if (!args[0]) return { output: 'mkdir: missing operand', error: true, code: 1 }
    return { output: `Created directory: ${args[0]}`, code: 0 }
  },

  touch: (args) => {
    if (!args[0]) return { output: 'touch: missing operand', error: true, code: 1 }
    return { output: `Created file: ${args[0]}`, code: 0 }
  },

  cat: (args) => {
    if (!args[0]) return { output: 'cat: missing operand', error: true, code: 1 }
    return {
      output: `// Content of ${args[0]}\nfunction hello() {\n  console.log('Hello, World!')\n}`,
      code: 0,
    }
  },

  rm: (args) => {
    if (!args[0]) return { output: 'rm: missing operand', error: true, code: 1 }
    return { output: `Removed: ${args[0]}`, code: 0 }
  },

  echo: (args) => ({
    output: args.join(' '),
    code: 0,
  }),

  // System info
  whoami: () => ({
    output: 'becondmp-user',
    code: 0,
  }),

  date: () => ({
    output: new Date().toString(),
    code: 0,
  }),

  uname: () => ({
    output: 'BecondMP/1.0.0 (Web-based IDE)',
    code: 0,
  }),

  // Clear terminal
  clear: () => ({
    output: '[CLEAR]',
    code: 0,
  }),

  // Help
  help: () => ({
    output: `BecondMP Terminal Commands:

File System:
  ls, pwd, cd, mkdir, touch, cat, rm, echo

System:
  whoami, date, uname, clear, help

AI Commands (prefix with /):
  /help <topic>     - Get help on a topic
  /explain <code>   - Explain code
  /refactor <code>  - Suggest refactoring
  /debug <code>     - Find bugs
  /test <code>      - Generate tests
  /document <code>  - Add documentation`,
    code: 0,
  }),

  // Network
  ping: (args) => {
    const host = args[0] || 'example.com'
    return {
      output: `PING ${host} (simulation)\nConnected successfully`,
      code: 0,
    }
  },

  curl: (args) => {
    const url = args[0] || 'http://example.com'
    return {
      output: `Fetching ${url}... (simulated response)\n<html>...</html>`,
      code: 0,
    }
  },

  // Package managers (simulated)
  npm: (args) => {
    const cmd = args[0]
    if (cmd === 'install' || cmd === 'i') {
      return {
        output: `Installing packages...\n${args.slice(1).join(' ')} installed successfully`,
        code: 0,
      }
    }
    if (cmd === 'list') {
      return {
        output: `react@18.2.0\nzustand@4.4.0\nmonaco-editor@0.50.0`,
        code: 0,
      }
    }
    return { output: 'npm: unknown command', error: true, code: 1 }
  },

  pip: (args) => {
    const cmd = args[0]
    if (cmd === 'install' || cmd === 'i') {
      return {
        output: `Installing packages...\n${args.slice(1).join(' ')} installed successfully`,
        code: 0,
      }
    }
    return { output: 'pip: unknown command', error: true, code: 1 }
  },

  // Programming language execution (simulated)
  node: (args) => ({
    output: `Node.js v18.0.0\nExecution simulated in sandbox`,
    code: 0,
  }),

  python: (args) => ({
    output: `Python 3.11.0\nExecution simulated in sandbox`,
    code: 0,
  }),

  // Version checks
  '--version': () => ({
    output: 'BecondMP v1.0.0',
    code: 0,
  }),
}

export const executeCommand = async (command) => {
  if (!command.trim()) {
    return { output: '', code: 0 }
  }

  const [cmd, ...args] = command.trim().split(' ')
  const lowerCmd = cmd.toLowerCase()

  if (commands[lowerCmd]) {
    try {
      const result = commands[lowerCmd](args)
      if (result.output === '[CLEAR]') {
        // Signal to clear terminal
        return { output: '', code: 0, clear: true }
      }
      return result
    } catch (error) {
      return { output: `Error executing ${cmd}: ${error.message}`, error: true, code: 1 }
    }
  } else {
    return {
      output: `Command not found: ${cmd}\nType 'help' for available commands`,
      error: true,
      code: 127,
    }
  }
}

export default commands