import { Testimonial } from '@/types'
import Abdulsamad from '../assets/abdulsamad.jpg';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    memberId: 'james-isreal',
    member: {
      name: 'James Isreal',
      avatar: '/avatars/sarah-chen.jpg',
      role: 'member'
    },
    content: "After the first Hackathon, I became more confident in building things. My company doesn't have a website, so I volunteered to build a streaming website for them. I did a sample and boom it has been approved, so I will now get back to work to finish the job. Thanks, Coders Den for the confidence.",
    rating: 5,
    category: 'job-placement',
    date: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    memberId: 'john-areola',
    member: {
      name: 'John Areola',
      avatar: '/avatars/marcus-johnson.jpg',
      role: 'member'
    },
    content: "This time last year, I didn't know about Codewars, earlier this year I was struggling with 8kyu katas, now I struggle with 6kyu",
    rating: 5,
    category: 'skill-improvement',
    date: '2024-02-03',
    featured: true
  },
  {
    id: '3',
    memberId: 'abdulsamad-raji',
    member: {
      name: 'Abdulsamad Raji',
      avatar: Abdulsamad,
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
    memberId: 'edward-precious',
    member: {
      name: 'Edward-Precious Omegbu',
      avatar: '/avatars/david-kim.jpg',
      role: 'mentor'
    },
    content: "Coder's Den on the other hand, came just after Kodecamp like some kind of relay race and the community absolutely handled my biggest challenge at the time, JavaScript. With their systematic training from noob to intermediate level and some extracurricular activities like the codewars classes, I learned different ways of solving problems. Taking it a step further, Coder's Den gave me the avenue to teach others and make my impact on them.",
    rating: 5,
    category: 'community',
    date: '2024-02-05',
    featured: false
  }
]
