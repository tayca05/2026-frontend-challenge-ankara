import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { getAllSubmissions, extractPeople } from './util/api'
import { PeopleList } from './components/PeopleList'

function App() {
  const [count, setCount] = useState(0)
  const [allData, setAllData] = useState(null)
  const [people, setPeople] = useState(null)
  const [loading, setLoading] = useState(false)

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
      {people && people.length > 0 && (
        <section id="people-section" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <PeopleList people={people} />
        </section>
      )}

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
