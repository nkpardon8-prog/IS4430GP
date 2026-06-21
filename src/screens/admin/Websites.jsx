// D-04 · Approved Website Management
// Owner: Ellie · Traces to REQ-SITE-006
import { useState } from 'react'
import { Globe, Plus, Pencil, EyeOff, Eye, Trash2 } from 'lucide-react'
import { screenById } from '../../data/screens'
import ScreenHeader from '../../components/ScreenHeader'
import { Button, Card, CardHeader, CardBody, Badge, Field, Select } from '../../components/ui'

// ============================================================================
//  D-04 · Approved Website Management — System Admin controls which rental
//  sites the collection process is allowed to search (REQ-SITE-006). Add
//  toggles active/inactive in local state; edit/remove are visual-only
//  buttons since this is a Milestone 2 prototype.
// ============================================================================

const SOURCE_TYPES = ['Listing aggregator', 'Property management', 'Classifieds', 'University housing']

const INITIAL_SITES = [
  { id: 's1', name: 'Zillow', url: 'https://www.zillow.com', type: 'Listing aggregator', active: true },
  { id: 's2', name: 'Apartments.com', url: 'https://www.apartments.com', type: 'Listing aggregator', active: true },
  { id: 's3', name: 'Cragslist SLC Housing', url: 'https://saltlakecity.craigslist.org', type: 'Classifieds', active: false },
  { id: 's4', name: 'U of U Off-Campus Housing', url: 'https://housing.utah.edu', type: 'University housing', active: true },
]

export default function WebsiteManagement() {
  const screen = screenById('D-04')
  const [sites, setSites] = useState(INITIAL_SITES)
  const [showAdd, setShowAdd] = useState(false)
  const [draft, setDraft] = useState({ name: '', url: '', type: SOURCE_TYPES[0] })

  function toggleActive(id) {
    setSites((prev) => prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s)))
  }

  function removeSite(id) {
    setSites((prev) => prev.filter((s) => s.id !== id))
  }

  function handleAdd(e) {
    e.preventDefault()
    if (!draft.name.trim() || !draft.url.trim()) return
    setSites((prev) => [
      ...prev,
      { id: `s${Date.now()}`, name: draft.name.trim(), url: draft.url.trim(), type: draft.type, active: true },
    ])
    setDraft({ name: '', url: '', type: SOURCE_TYPES[0] })
    setShowAdd(false)
  }

  return (
    <div>
      <ScreenHeader screen={screen} />

      <Card>
        <CardHeader
          title="Approved rental websites"
          subtitle="Only active sources are searched for new listings"
          right={
            <Button size="sm" onClick={() => setShowAdd((v) => !v)}>
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add website
            </Button>
          }
        />
        <CardBody>
          {showAdd && (
            <form
              onSubmit={handleAdd}
              className="mb-5 grid gap-3 rounded-lg border border-line bg-canvas p-4 sm:grid-cols-3"
            >
              <Field
                label="Website name"
                placeholder="e.g. Trulia"
                value={draft.name}
                onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                required
              />
              <Field
                label="URL"
                placeholder="https://"
                value={draft.url}
                onChange={(e) => setDraft((d) => ({ ...d, url: e.target.value }))}
                required
              />
              <Select
                label="Source type"
                options={SOURCE_TYPES}
                value={draft.type}
                onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value }))}
              />
              <div className="sm:col-span-3 flex gap-2">
                <Button type="submit" size="sm">Save website</Button>
                <Button type="button" variant="secondary" size="sm" onClick={() => setShowAdd(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          )}

          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-canvas text-left text-muted">
                  <th className="px-4 py-2.5 font-medium">Website</th>
                  <th className="px-4 py-2.5 font-medium">Source type</th>
                  <th className="px-4 py-2.5 font-medium">Status</th>
                  <th className="px-4 py-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sites.map((s) => (
                  <tr key={s.id} className="border-b border-line last:border-0 hover:bg-canvas/60">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                        <div>
                          <p className="font-medium text-ink">{s.name}</p>
                          <p className="text-xs text-muted">{s.url}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-muted">{s.type}</td>
                    <td className="px-4 py-2.5">
                      <Badge tone={s.active ? 'success' : 'neutral'}>
                        {s.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex justify-end gap-1.5">
                        <Button variant="ghost" size="sm" aria-label={`Edit ${s.name}`}>
                          <Pencil className="h-4 w-4" aria-hidden="true" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleActive(s.id)}
                          aria-label={s.active ? `Disable ${s.name}` : `Enable ${s.name}`}
                        >
                          {s.active ? (
                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                          ) : (
                            <Eye className="h-4 w-4" aria-hidden="true" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSite(s.id)}
                          aria-label={`Remove ${s.name}`}
                        >
                          <Trash2 className="h-4 w-4 text-danger" aria-hidden="true" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sites.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-muted">
                      No approved websites yet. Add one to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-xs text-muted">
            Disabling a website stops new listing collection but keeps its history. Removing a
            website is for entries added by mistake (REQ-SITE-006 FR-62/63).
          </p>
        </CardBody>
      </Card>
    </div>
  )
}