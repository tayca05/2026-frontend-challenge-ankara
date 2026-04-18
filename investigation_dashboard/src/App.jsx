import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { getAllSubmissions, extractPeople } from './util/api'
import { SearchBar } from './components/SearchBar'
import { PeopleList } from './components/PeopleList'
import { PersonDetails } from './components/PersonDetails'

function App() {
  const [count, setCount] = useState(0)
  const [allData, setAllData] = useState(null)
  const [people, setPeople] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter people based on search term
  const filteredPeople = people
    ? people.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  // Fetch investigation data
  const loadInvestigationData = async () => {
    setLoading(true)
    try {
      console.log('Loading investigation data...')
      const data = await getAllSubmissions()
      console.log('Success! Data:', data)
      setAllData(data)
      
      // Extract people from all submissions
      const extractedPeople = extractPeople(data)
      console.log('Extracted people:', extractedPeople)
      setPeople(extractedPeople)
    } catch (error) {
      console.error('Error:', error.message)
      setAllData({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="app-container">
        {!people ? (
          <div className="app-welcome">
            <h1>Investigation Dashboard</h1>
            <p>Load investigation data to begin analyzing submissions and tracking people.</p>
            <button 
              className="load-button"
              onClick={loadInvestigationData}
              disabled={loading}
            >
              {loading ? 'Loading Investigation Data...' : 'Load Investigation Data'}
            </button>
            {allData?.error && <p className="error-message">{allData.error}</p>}
          </div>
        ) : (
          <>
            <section id="people-section" className="people-panel">
              <SearchBar onSearch={setSearchTerm} totalPeople={filteredPeople.length} />
              <PeopleList people={filteredPeople} onSelectPerson={setSelectedPerson} />
            </section>
            
            {selectedPerson && (
              <section id="details-section" className="details-panel">
                <PersonDetails person={selectedPerson} allData={allData} onClose={() => setSelectedPerson(null)} />
              </section>
            )}
          </>
        )}
      </div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
