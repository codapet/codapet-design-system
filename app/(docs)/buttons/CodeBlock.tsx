'use client'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      toast.success('Code copied to clipboard')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy code')
    }
  }

  return (
    <div className="group relative">
      <div className="relative rounded-lg border border-border bg-slate-950 dark:bg-slate-900 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 dark:bg-slate-800 border-b border-border">
          <span className="text-xs font-medium text-slate-400">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors rounded hover:bg-slate-800 dark:hover:bg-slate-700"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-400" />
                <span className="text-green-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-slate-100 font-mono whitespace-pre">
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}
