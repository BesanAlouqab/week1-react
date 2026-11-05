import { useEffect, useState } from 'react'

type Course = {
  id: number
  name: string
}

function App() {
  const [courses, setCourses] = useState<Course[]>([])
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch(() => setMessage('Failed to load courses'))
  }, [])
const handleEnrol = async (courseId: number) => {
  try {
    const response = await fetch('/enrolments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: 1,
        courseId,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message)
    }

    setMessage(data.message)
  } catch (error) {
    setMessage(
      error instanceof Error ? error.message : 'Registration failed'
    )
  }
}
  return (
    <div>
      <h1>Available Courses</h1>

      <input
        type="text"
        placeholder="Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {courses
        .filter((course) =>
          course.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((course) => (
        <div key={course.id}>
  <h3>{course.name}</h3>
  <button onClick={() => handleEnrol(course.id)}>
    Enrol Now
  </button>
</div>
        ))}

      <p>{message}</p>
    </div>
  )
}

export default App