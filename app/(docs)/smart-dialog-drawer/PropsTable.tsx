'use client'

/**
 * Shared props-reference table for the docs routes. Lives here because this
 * page introduced it; imported by relative path elsewhere, the same way
 * `buttons/CodeBlock.tsx` is.
 */
export function PropsTable({
  name,
  description,
  rows
}: {
  name: string
  description?: string
  rows: Array<[string, string, string, string]>
}) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-1 font-mono">{name}</h4>
      {description && (
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 pr-4 font-medium">Prop</th>
              <th className="text-left py-2 pr-4 font-medium">Type</th>
              <th className="text-left py-2 pr-4 font-medium">Default</th>
              <th className="text-left py-2 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            {rows.map(([prop, type, def, desc], i) => (
              <tr key={prop} className={i < rows.length - 1 ? 'border-b' : ''}>
                <td className="py-2 pr-4 font-mono text-xs">{prop}</td>
                <td className="py-2 pr-4 font-mono text-xs">{type}</td>
                <td className="py-2 pr-4 font-mono text-xs">{def}</td>
                <td className="py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
