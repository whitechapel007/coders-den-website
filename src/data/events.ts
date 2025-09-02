import { Event } from '@/types'

export const events: Event[] = [
  {
    id: '1',
    title: 'JavaScript Fundamentals Workshop',
    description: 'Master the basics of JavaScript including variables, functions, objects, and DOM manipulation. Perfect for beginners starting their coding journey.',
    type: 'class',
    date: '2024-03-15T18:00:00Z',
    duration: 120,
    location: 'online',
    maxParticipants: 50,
    currentParticipants: 32,
    techStack: ['JavaScript', 'HTML', 'CSS'],
    difficulty: 'beginner',
    instructor: 'Mike Wilson',
    registrationUrl: '#',
    featured: true
  },
  {
    id: '2',
    title: 'Python Data Science Bootcamp',
    description: 'Learn data analysis and visualization with Python, pandas, and matplotlib. Build real projects with actual datasets.',
    type: 'workshop',
    date: '2024-03-18T19:00:00Z',
    duration: 180,
    location: 'online',
    maxParticipants: 30,
    currentParticipants: 28,
    techStack: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
    difficulty: 'intermediate',
    instructor: 'Jane Smith',
    registrationUrl: '#',
    featured: true
  },
  {
    id: '3',
    title: 'Spring Hackathon 2024',
    description: 'Join our 48-hour hackathon! Build innovative projects, collaborate with teammates, and compete for amazing prizes.',
    type: 'hackathon',
    date: '2024-03-22T09:00:00Z',
    duration: 2880, // 48 hours
    location: 'hybrid',
    maxParticipants: 100,
    currentParticipants: 67,
    techStack: ['JavaScript', 'Python', 'React', 'Node.js'],
    difficulty: 'all-levels',
    registrationUrl: '#',
    featured: true
  },
  {
    id: '4',
    title: 'Friday Game Night',
    description: 'Unwind with fellow developers! Play coding games, trivia, and connect with the community in a relaxed setting.',
    type: 'game-night',
    date: '2024-03-08T20:00:00Z',
    duration: 120,
    location: 'online',
    currentParticipants: 45,
    techStack: [],
    difficulty: 'all-levels',
    registrationUrl: '#',
    featured: false
  },
  {
    id: '5',
    title: 'Mock Technical Interview Session',
    description: 'Practice technical interviews with experienced developers. Get feedback on your coding skills and interview techniques.',
    type: 'interview',
    date: '2024-03-12T17:00:00Z',
    duration: 90,
    location: 'online',
    maxParticipants: 20,
    currentParticipants: 18,
    techStack: ['JavaScript', 'Python', 'Algorithms'],
    difficulty: 'intermediate',
    instructor: 'John Doe',
    registrationUrl: '#',
    featured: false
  },
  {
    id: '6',
    title: 'React Advanced Patterns',
    description: 'Deep dive into advanced React patterns including custom hooks, context patterns, and performance optimization.',
    type: 'class',
    date: '2024-03-20T18:30:00Z',
    duration: 150,
    location: 'online',
    maxParticipants: 25,
    currentParticipants: 22,
    techStack: ['React', 'JavaScript', 'TypeScript'],
    difficulty: 'advanced',
    instructor: 'Mike Wilson',
    registrationUrl: '#',
    featured: false
  },
  {
    id: '7',
    title: 'Career Development Workshop',
    description: 'Learn how to build an impressive portfolio, write compelling resumes, and ace technical interviews.',
    type: 'workshop',
    date: '2024-03-25T19:00:00Z',
    duration: 120,
    location: 'online',
    maxParticipants: 40,
    currentParticipants: 15,
    techStack: [],
    difficulty: 'all-levels',
    instructor: 'Jane Smith',
    registrationUrl: '#',
    featured: false
  },
  {
    id: '8',
    title: 'Open Source Contribution Workshop',
    description: 'Learn how to contribute to open source projects. We\'ll walk through finding projects, making PRs, and building your reputation.',
    type: 'workshop',
    date: '2024-03-28T18:00:00Z',
    duration: 135,
    location: 'online',
    maxParticipants: 35,
    currentParticipants: 12,
    techStack: ['Git', 'GitHub', 'JavaScript', 'Python'],
    difficulty: 'intermediate',
    instructor: 'John Doe',
    registrationUrl: '#',
    featured: false
  },
  {
    id: '9',
    title: 'Monthly Networking Mixer',
    description: 'Connect with fellow developers, share experiences, and build professional relationships in our monthly networking event.',
    type: 'networking',
    date: '2024-03-30T17:00:00Z',
    duration: 90,
    location: 'online',
    currentParticipants: 38,
    techStack: [],
    difficulty: 'all-levels',
    registrationUrl: '#',
    featured: false
  }
]

export const eventTypes = [
  { value: 'all', label: 'All Events', icon: '📅' },
  { value: 'class', label: 'Classes', icon: '🎓' },
  { value: 'workshop', label: 'Workshops', icon: '🔧' },
  { value: 'hackathon', label: 'Hackathons', icon: '💻' },
  { value: 'game-night', label: 'Game Nights', icon: '🎮' },
  { value: 'interview', label: 'Mock Interviews', icon: '💼' },
  { value: 'networking', label: 'Networking', icon: '🤝' }
]

export const difficultyLevels = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
  { value: 'all-levels', label: 'All Levels' }
]
