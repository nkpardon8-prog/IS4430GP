import { useMemo, useState } from 'react'
import { MapPin, Search as SearchIcon, SlidersHorizontal, Star } from 'lucide-react'
import PlaceholderScreen from '../../components/PlaceholderScreen'
import ScreenHeader from '../../components/ScreenHeader'
import { screenById } from '../../data/screens'
import { Badge, Button, Card, CardBody, CardHeader, Field, Select, StatusPill, Table } from '../../components/ui'

const residences = [
  {
    id: 'r1',
    name: 'South Campus Village',
    type: 'Apartment',
    building: 'SCV',
    distance: '6 min walk',
    price: 895,
    beds: 2,
    baths: 1,
    style: 'Suite',
    availability: 'Open',
    amenities: ['Kitchen', 'Study lounge', 'Laundry'],
    rating: '4.8',
    match: 'Best match',
  },
  {
    id: 'r2',
    name: 'Kahlert Village',
    type: 'Residence Hall',
    building: 'KV',
    distance: '3 min walk',
    price: 760,
    beds: 2,
    baths: 1,
    style: 'Double',
    availability: 'Limited',
    amenities: ['Meal plan access', 'Quiet floors', 'Gym'],
    rating: '4.6',
    match: 'Closest to campus',
  },
  {
    id: 'r3',
    name: 'Legacy Village',
    type: 'Apartment',
    building: 'LV',
    distance: '10 min walk',
    price: 1010,
    beds: 4,
    baths: 2,
    style: 'Shared apartment',
    availability: 'Open',
    amenities: ['Kitchen', 'Parking', 'Transit stop'],
    rating: '4.7',
    match: 'Most space',
  },
  {
    id: 'r4',
    name: 'Meldrum Court',
    type: 'Townhome',
    building: 'MC',
    distance: '12 min shuttle',
    price: 1125,
    beds: 3,
    baths: 2,
    style: 'Townhome',
    availability: 'Waitlist',
    amenities: ['Pet friendly', 'Washer/dryer', 'Study space'],
    rating: '4.5',
    match: 'Quiet option',
  },
]

function money(value) {
  return `$${value.toLocaleString()}`
}

export default function Search() {
  const screen = screenById('A-02')
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [availability, setAvailability] = useState('All')
  const [maxPrice, setMaxPrice] = useState('1200')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const limit = Number(maxPrice) || 99999

    return residences.filter((item) => {
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.building.toLowerCase().includes(q) ||
        item.amenities.some((a) => a.toLowerCase().includes(q))

      const matchesType = type === 'All' || item.type === type
      const matchesAvailability = availability === 'All' || item.availability === availability
      const matchesPrice = item.price <= limit

      return matchesQuery && matchesType && matchesAvailability && matchesPrice
    })
  }, [query, type, availability, maxPrice])

  return (
    <div className="space-y-6">
      <ScreenHeader screen={screen} />

      <Card>
        <CardHeader
          title="Find a place"
          subtitle="Search and filter student-athlete housing options using sample data for the prototype."
          icon={<SearchIcon className="h-4 w-4" />}
        />
        <CardBody>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Field
              label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Name, building, amenity..."
            />

            <Select label="Residence type" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="All">All types</option>
              <option value="Apartment">Apartment</option>
              <option value="Residence Hall">Residence Hall</option>
              <option value="Townhome">Townhome</option>
            </Select>

            <Select
              label="Availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="All">All availability</option>
              <option value="Open">Open</option>
              <option value="Limited">Limited</option>
              <option value="Waitlist">Waitlist</option>
            </Select>

            <Field
              label="Max monthly price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              inputMode="numeric"
              className="tnum"
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Button type="button">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Save filters
            </Button>
            <Badge tone="neutral">{filtered.length} matches</Badge>
            <Badge tone="success">Live prototype</Badge>
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        {filtered.map((item) => (
          <Card key={item.id}>
            <CardHeader
              title={item.name}
              subtitle={`${item.type} · ${item.building}`}
              icon={<MapPin className="h-4 w-4" />}
            />
            <CardBody>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <StatusPill tone={item.availability === 'Open' ? 'success' : item.availability === 'Limited' ? 'warning' : 'danger'}>
                      {item.availability}
                    </StatusPill>
                    <Badge tone="neutral">{item.match}</Badge>
                    <Badge tone="neutral">{item.distance}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm text-muted">
                    <div>
                      <div className="font-medium text-ink">Price</div>
                      <div className="tnum">{money(item.price)}/mo</div>
                    </div>
                    <div>
                      <div className="font-medium text-ink">Layout</div>
                      <div className="tnum">
                        {item.beds} bed · {item.baths} bath
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-ink">Style</div>
                      <div>{item.style}</div>
                    </div>
                    <div>
                      <div className="font-medium text-ink">Rating</div>
                      <div className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5" />
                        <span className="tnum">{item.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 text-sm font-medium text-ink">Amenities</div>
                    <div className="flex flex-wrap gap-2">
                      {item.amenities.map((amenity) => (
                        <Badge key={amenity} tone="neutral">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  <Button type="button">View details</Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader
          title="Search summary"
          subtitle="A compact table for comparing the current filtered results."
        />
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>Residence</th>
                <th>Type</th>
                <th>Availability</th>
                <th className="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.availability}</td>
                  <td className="text-right tnum">{money(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  )
}
