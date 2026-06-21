// A-03 · Residence Details + Budget Comparison
// Owner: Mike · Traces to REQ-DETAIL-010
// TODO (Mike): replace <PlaceholderScreen/> with the real screen. Build it with
// components from '../../components/ui'; copy src/screens/athlete/Dashboard.jsx
// (A-01) as a starting point. Then set status: 'done' in src/data/screens.js.
import PlaceholderScreen from '../../components/PlaceholderScreen'

export default function Details() {
  return import { Link } from 'react-router-dom'
import {
  MapPin, ExternalLink, Image as ImageIcon, Bed, Bath,
  Calendar, Car, Zap, Sofa, PawPrint, Ruler, Send,
} from 'lucide-react'
import { screenById } from '../../data/screens'
import { ATHLETES } from '../../data/sampleData'
import { money, outOfPocket } from '../../lib/format'
import ScreenHeader from '../../components/ScreenHeader'
import { Button, Card, CardBody, CardHeader, Badge } from '../../components/ui'

// ============================================================================
//  A-03 · Residence Details + Budget Comparison  (REQ-DETAIL-010)
//  ----------------------------------------------------------------------------
//  Shows one collected listing in full and compares its rent to the athlete's
//  current housing budget so the athlete (and later the Athletic Manager) judge
//  the same numbers before a decision. Visual prototype: data is hard-coded.
// ============================================================================

// Current athlete. Pulling from the shared fixture keeps Jordan Rivera coherent
// across A-01, the manager queue, etc. His most recent budget drives the
// comparison, which satisfies NFR-3 (use the latest stored budget).
const ATHLETE = ATHLETES[0]

// The listing being viewed. A collected listing is not yet a submitted request,
// so it is a local object rather than a row from REQUESTS.
const LISTING = {
  name: 'Sunnyside Court Apartments — Unit 204',
  address: '820 S Foothill Dr, Salt Lake City, UT',
  type: 'Apartment',
  rent: 1650,
  source: 'Zillow',
  sourceUrl: 'https://www.zillow.com',
  distanceMiles: 1.8,
  // FR-2 attributes. A null value means the source did not supply the field, so
  // the UI labels it instead of showing a blank (NFR-1).
  attributes: [
    { icon: Bed, label: 'Bedrooms', value: '2' },
    { icon: Bath, label: 'Bathrooms', value: '1' },
    { icon: Ruler, label: 'Lease length', value: '12 months' },
    { icon: Calendar, label: 'Available', value: 'Aug 15, 2026' },
    { icon: Sofa, label: 'Furnished', value: 'No' },
    { icon: Car, label: 'Parking', value: '1 covered space' },
    { icon: Zap, label: 'Utilities', value: 'Water & trash included' },
    { icon: PawPrint, label: 'Pet policy', value: null }, // missing -> labeled
  ],
}

// Placeholder photo captions (FR-3). We do not embed real copyrighted images in
// a class prototype; these tiles stand in for the source photo gallery.
const PHOTOS = ['Front exterior', 'Living area', 'Kitchen', 'Bedroom']

export default function Details() {
  const screen = screenById('A-03')
  const oop = outOfPocket(LISTING.rent, ATHLETE.budget) // FR-5 out-of-pocket
  const overBudget = oop > 0
  // Width of the "within budget" portion of the comparison bar.
  const budgetPct = Math.min(100, Math.round((ATHLETE.budget / LISTING.rent) * 100))

  return (
    <div>
      <ScreenHeader screen={screen} />

      {/* Title row: name/address/type (FR-1) + a plain-language budget verdict */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">{LISTING.name}</h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            {LISTING.address} · {LISTING.type}
          </p>
        </div>
        <Badge tone={overBudget ? 'warning' : 'success'}>
          {overBudget ? 'Over budget' : 'Within budget'}
        </Badge>
      </div>

      {/* Photo gallery (FR-3) */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {PHOTOS.map((cap) => (
          <div
            key={cap}
            className="flex aspect-[4/3] flex-col items-center justify-center gap-1.5 rounded-lg border border-line bg-canvas text-muted"
          >
            <ImageIcon className="h-6 w-6" aria-hidden="true" />
            <span className="text-xs">{cap}</span>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Residence details (FR-1, FR-2, FR-4, source link) */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Residence details"
            subtitle="Collected from the source listing — read-only"
          />
          <CardBody>
            <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {LISTING.attributes.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-3 border-b border-line pb-2"
                >
                  <dt className="flex items-center gap-2 text-sm text-muted">
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {label}
                  </dt>
                  {/* Missing source fields are labeled, never left blank (NFR-1) */}
                  <dd className={`text-sm ${value ? 'text-ink' : 'italic text-muted'}`}>
                    {value ?? 'Not provided by source'}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-muted">Distance from campus:</span>
              <span className="font-medium text-ink tnum">{LISTING.distanceMiles} mi</span>
            </div>

            {/* Source website + original listing link (FR-1) */}
            
              href={LISTING.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-info hover:underline"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              View original listing on {LISTING.source}
            </a>
          </CardBody>
        </Card>

        {/* Budget comparison (FR-5) */}
        <Card>
          <CardHeader title="Budget comparison" />
          <CardBody>
            <div className="space-y-3">
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-xs text-muted">Monthly rent</p>
                <p className="text-xl font-semibold text-ink tnum">{money(LISTING.rent)}</p>
              </div>
              <div className="rounded-lg bg-canvas p-3">
                <p className="text-xs text-muted">Your housing budget</p>
                <p className="text-xl font-semibold text-ink tnum">{money(ATHLETE.budget)}</p>
              </div>
              <div className={`rounded-lg p-3 ${overBudget ? 'bg-danger-soft' : 'bg-success-soft'}`}>
                <p className={`text-xs ${overBudget ? 'text-danger' : 'text-success'}`}>
                  Estimated out-of-pocket
                </p>
                <p className={`text-xl font-semibold tnum ${overBudget ? 'text-danger' : 'text-success'}`}>
                  {money(oop)}
                  {overBudget && <span className="text-sm font-normal">/mo</span>}
                </p>
              </div>
            </div>

            {/* Visual bar: crimson = covered by budget, red = over budget */}
            <div className="mt-4">
              <div className="flex h-2.5 overflow-hidden rounded-full bg-line">
                <div className="bg-primary" style={{ width: `${budgetPct}%` }} />
                {overBudget && <div className="bg-danger" style={{ width: `${100 - budgetPct}%` }} />}
              </div>
              <div className="mt-1.5 flex justify-between text-xs text-muted">
                <span>Budget {money(ATHLETE.budget)}</span>
                <span>Rent {money(LISTING.rent)}</span>
              </div>
            </div>

            <Button as={Link} to="/athlete/submit" className="mt-5 w-full">
              <Send className="h-4 w-4" aria-hidden="true" />
              Submit for review
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
