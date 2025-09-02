import { Member } from '@/types'

export const members: Member[] = [
  {
    id: 'john-doe',
    name: 'John Doe',
    role: 'mentor',
    avatar: '/avatars/john-doe.jpg',
    bio: 'Senior Full Stack Developer with 8+ years experience. Passionate about mentoring and helping developers grow their careers.',
    techStack: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
    experience: 'advanced',
    joinDate: '2023-01-15',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe'
  },
  {
    id: 'jane-smith',
    name: 'Jane Smith',
    role: 'mentor',
    avatar: '/avatars/jane-smith.jpg',
    bio: 'Python specialist and data science enthusiast. Love teaching complex concepts in simple ways.',
    techStack: ['Python', 'Django', 'Data Science', 'Machine Learning', 'PostgreSQL'],
    experience: 'advanced',
    joinDate: '2023-02-20',
    github: 'https://github.com/janesmith',
    linkedin: 'https://linkedin.com/in/janesmith'
  },
  {
    id: 'mike-wilson',
    name: 'Mike Wilson',
    role: 'mentor',
    avatar: '/avatars/mike-wilson.jpg',
    bio: 'Frontend architect and UI/UX enthusiast. Helping developers create beautiful and functional web applications.',
    techStack: ['JavaScript', 'TypeScript', 'React', 'Vue.js', 'CSS'],
    experience: 'advanced',
    joinDate: '2023-03-10',
    github: 'https://github.com/mikewilson',
    linkedin: 'https://linkedin.com/in/mikewilson'
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'member',
    avatar: '/avatars/sarah-chen.jpg',
    bio: 'Recently transitioned to tech from marketing. Excited about web development and building user-friendly applications.',
    techStack: ['JavaScript', 'React', 'HTML', 'CSS'],
    experience: 'beginner',
    joinDate: '2023-08-15',
    github: 'https://github.com/sarahchen',
    linkedin: 'https://linkedin.com/in/sarahchen'
  },
  {
    id: 'marcus-johnson',
    name: 'Marcus Johnson',
    role: 'member',
    avatar: '/avatars/marcus-johnson.jpg',
    bio: 'Computer science student passionate about backend development and system design.',
    techStack: ['Python', 'Java', 'Spring Boot', 'Docker'],
    experience: 'intermediate',
    joinDate: '2023-09-01',
    github: 'https://github.com/marcusjohnson'
  },
  {
    id: 'priya-patel',
    name: 'Priya Patel',
    role: 'member',
    avatar: '/avatars/priya-patel.jpg',
    bio: 'Full-stack developer with a focus on creating scalable web applications. Love participating in hackathons!',
    techStack: ['JavaScript', 'Node.js', 'React', 'MongoDB'],
    experience: 'intermediate',
    joinDate: '2023-07-20',
    github: 'https://github.com/priyapatel',
    linkedin: 'https://linkedin.com/in/priyapatel'
  }
]

export const communityStats = {
  totalMembers: 1247,
  activeMembers: 892,
  eventsHosted: 156,
  successStories: 89,
  mentorshipHours: 2340,
  jobPlacements: 67
}
