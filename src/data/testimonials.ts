import { Testimonial } from '@/types'

export const testimonials: Testimonial[] = [
  {
    id: '1',
    memberId: 'sarah-chen',
    member: {
      name: 'Sarah Chen',
      avatar: '/avatars/sarah-chen.jpg',
      role: 'member'
    },
    content: "Coders Den transformed my career! I went from struggling with basic JavaScript to landing my first developer job in just 6 months. The mentorship and hands-on projects made all the difference.",
    rating: 5,
    category: 'job-placement',
    date: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    memberId: 'marcus-johnson',
    member: {
      name: 'Marcus Johnson',
      avatar: '/avatars/marcus-johnson.jpg',
      role: 'member'
    },
    content: "The Python workshops here are incredible. I've learned more in 3 months than I did in a year of self-study. The community is so supportive and the mentors are always available to help.",
    rating: 5,
    category: 'skill-improvement',
    date: '2024-02-03',
    featured: true
  },
  {
    id: '3',
    memberId: 'priya-patel',
    member: {
      name: 'Priya Patel',
      avatar: '/avatars/priya-patel.jpg',
      role: 'member'
    },
    content: "I love the game nights and hackathons! It's not just about coding - we've built real friendships here. The community events make learning fun and engaging.",
    rating: 5,
    category: 'community',
    date: '2024-01-28',
    featured: true
  },
  {
    id: '4',
    memberId: 'alex-rodriguez',
    member: {
      name: 'Alex Rodriguez',
      avatar: '/avatars/alex-rodriguez.jpg',
      role: 'member'
    },
    content: "The mock interview sessions prepared me perfectly for real interviews. I felt confident and well-prepared when I started applying for jobs. Highly recommend!",
    rating: 5,
    category: 'job-placement',
    date: '2024-02-10',
    featured: false
  },
  {
    id: '5',
    memberId: 'emily-wang',
    member: {
      name: 'Emily Wang',
      avatar: '/avatars/emily-wang.jpg',
      role: 'member'
    },
    content: "As a career changer, I was intimidated by coding. But the beginner-friendly approach and patient mentors helped me build confidence. Now I'm contributing to open source projects!",
    rating: 5,
    category: 'skill-improvement',
    date: '2024-01-20',
    featured: false
  },
  {
    id: '6',
    memberId: 'david-kim',
    member: {
      name: 'David Kim',
      avatar: '/avatars/david-kim.jpg',
      role: 'member'
    },
    content: "The networking opportunities here are amazing. I've connected with developers from all over the world and even found my current job through a community connection!",
    rating: 5,
    category: 'community',
    date: '2024-02-05',
    featured: false
  }
]
