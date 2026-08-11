import { useState, useRef } from 'react'
import { useApp } from '../AppContext'

const folderStructure = [
  {
    name: 'React Fundamentals',
    children: [
      {
        name: 'Module 1: Intro',
        children: [
          { name: 'Slides', children: [] },
          { name: 'Code Examples', children: [] },
        ],
      },
      {
        name: 'Module 2: Hooks',
        children: [
          { name: 'Assignments', children: [] },
          { name: 'References', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Data Structures',
    children: [
      {
        name: 'Module 1: Arrays',
        children: [
          { name: 'Lecture Notes', children: [] },
        ],
      },
      {
        name: 'Module 2: Trees',
        children: [
          { name: 'Practice Problems', children: [] },
        ],
      },
    ],
  },
  {
    name: 'Web Development',
    children: [
      {
        name: 'Module 1: HTML/CSS',
        children: [
          { name: 'Templates', children: [] },
        ],
      },
    ],
  },
]

const typeIcons = {
  pdf: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z',
  video: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
  doc: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  code: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
}

function FolderNode({ node, depth = 0, activePath, onSelect }) {
  const [expanded, setExpanded] = useState(true)
  const path = activePath ? `${activePath}/${node.name}` : node.name
  const isActive = activePath === path

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-all duration-200 ${isActive ? 'font-medium' : ''}`}
        style={{
          paddingLeft: `${12 + depth * 16}px`,
          background: isActive ? 'var(--color-accent-light)' : 'transparent',
          color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
        }}
        onClick={() => {
          if (node.children.length > 0) setExpanded(!expanded)
          onSelect(path)
        }}
      >
        {node.children.length > 0 && (
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        )}
        {node.children.length > 0 ? (
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d={expanded ? 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' : 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'} />
          </svg>
        ) : (
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )}
        <span className="truncate">{node.name}</span>
      </div>
      {expanded && node.children.length > 0 && (
        <div>
          {node.children.map((child, i) => (
            <FolderNode key={i} node={child} depth={depth + 1} activePath={activePath} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Resources() {
  const { resources, addResource, deleteResource, toggleResourceShare, addToast } = useApp()
  const [search, setSearch] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const filtered = resources.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(search.toLowerCase())
    const matchesFolder = !selectedFolder || f.folder.startsWith(selectedFolder.replace(/\//g, '/'))
    return matchesSearch && matchesFolder
  })

  const handleFileUpload = (files) => {
    if (!files || files.length === 0) return
    Array.from(files).forEach(file => addResource(file))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDownload = (file) => {
    addToast(`Downloading "${file.name}"...`)
  }

  const handleDelete = (id, name) => {
    if (confirm(`Delete "${name}"? This action cannot be undone.`)) {
      deleteResource(id)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <div className="glass-card p-4 sticky top-24">
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>Folders</h3>
          {folderStructure.map((node, i) => (
            <FolderNode key={i} node={node} activePath={selectedFolder} onSelect={setSelectedFolder} />
          ))}
          {selectedFolder && (
            <button
              onClick={() => setSelectedFolder('')}
              className="mt-3 text-xs px-3 py-1.5 rounded-lg transition-all duration-200 hover:opacity-80"
              style={{ color: 'var(--color-accent)' }}
            >
              Clear filter
            </button>
          )}
        </div>
      </div>

      <div className="lg:col-span-3 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
              style={{ background: 'var(--color-bg-card)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
              onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--color-text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <label
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 ${dragOver ? 'shadow-lg' : ''}`}
            style={{
              background: 'var(--color-accent)',
              color: 'white',
              opacity: dragOver ? 0.9 : 1,
            }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            Upload File
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </label>
        </div>

        <div
          className={`glass-card overflow-hidden transition-all duration-200 ${dragOver ? 'ring-2' : ''}`}
          style={{ ringColor: dragOver ? 'var(--color-accent)' : 'transparent' }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {dragOver && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <svg className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>Drop files to upload</p>
              </div>
            </div>
          )}

          {!dragOver && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Name</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Type</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Size</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Uploaded</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Downloads</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Shared</th>
                    <th className="text-left p-4 font-medium" style={{ color: 'var(--color-text-muted)' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((f) => (
                    <tr key={f.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent-light)' }}>
                            <svg className="w-4 h-4" style={{ color: 'var(--color-accent)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d={typeIcons[f.type] || typeIcons.doc} />
                            </svg>
                          </div>
                          <span className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{f.name}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-xs uppercase font-medium px-2 py-1 rounded-lg" style={{ background: 'var(--color-bg-primary)', color: 'var(--color-text-muted)' }}>{f.type}</span>
                      </td>
                      <td className="p-4" style={{ color: 'var(--color-text-muted)' }}>{f.size}</td>
                      <td className="p-4" style={{ color: 'var(--color-text-muted)' }}>{f.date}</td>
                      <td className="p-4" style={{ color: 'var(--color-text-muted)' }}>{f.downloads}</td>
                      <td className="p-4">
                        <button
                          onClick={() => toggleResourceShare(f.id)}
                          className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:opacity-80"
                          style={{
                            background: f.shared ? 'var(--color-accent-light)' : '#EF444420',
                            color: f.shared ? 'var(--color-accent)' : '#EF4444',
                          }}
                        >
                          {f.shared ? 'Shared' : 'Private'}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDownload(f)}
                            className="p-1.5 rounded-lg transition-all duration-200 hover:opacity-80"
                            style={{ background: 'var(--color-accent-light)', color: 'var(--color-accent)' }}
                            title="Download"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(f.id, f.name)}
                            className="p-1.5 rounded-lg transition-all duration-200 hover:opacity-80"
                            style={{ background: '#EF444420', color: '#EF4444' }}
                            title="Delete"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>No files found</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
