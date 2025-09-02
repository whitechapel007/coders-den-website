import { Card } from "@/components/ui/Card";

const techStacks = [
  {
    name: "JavaScript",
    description: "Master modern JavaScript, ES6+, and popular frameworks",
    icon: "🟨",
    topics: [
      "ES6+ Features",
      "Async/Await",
      "DOM Manipulation",
      "React.js",
      "Node.js",
      "Express.js",
    ],
    level: "Beginner to Advanced",
    projects: 12,
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "Python",
    description:
      "Learn Python for web development, data science, and automation",
    icon: "🐍",
    topics: [
      "Python Basics",
      "Django/Flask",
      "Data Analysis",
      "Machine Learning",
      "APIs",
      "Automation",
    ],
    level: "Beginner to Advanced",
    projects: 15,
    color: "from-blue-400 to-green-500",
  },
];

const learningPaths = [
  {
    title: "Frontend Development",
    description: "HTML, CSS, JavaScript, React",
    duration: "3-6 months",
    students: 450,
  },
  {
    title: "Backend Development",
    description: "Node.js, Python, Databases, APIs",
    duration: "4-8 months",
    students: 320,
  },
  {
    title: "Full Stack Development",
    description: "Complete web development stack",
    duration: "6-12 months",
    students: 280,
  },
  {
    title: "Data Science",
    description: "Python, Analytics, Machine Learning",
    duration: "6-10 months",
    students: 190,
  },
];

export function TechStack() {
  return (
    <section className="py-24 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Tech Stacks We Focus On
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Master the most in-demand technologies
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our curriculum focuses on JavaScript and Python - two of the most
            versatile and job-ready programming languages in the industry.
          </p>
        </div>

        {/* Main Tech Stacks */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {techStacks.map((tech) => (
            <Card
              key={tech.name}
              variant="elevated"
              className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-5 group-hover:opacity-10 transition-opacity`}
              ></div>

              <div className="relative p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{tech.icon}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {tech.level}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{tech.description}</p>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      What you&apos;ll learn:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {tech.topics.map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">
                      {tech.projects} hands-on projects
                    </span>
                    <span className="text-sm font-medium text-primary">
                      Start Learning →
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Learning Paths */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Choose Your Learning Path
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              Structured learning paths designed to take you from beginner to
              job-ready
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {learningPaths.map((path) => (
              <Card
                key={path.title}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {path.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    {path.description}
                  </p>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="font-medium">{path.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Students:</span>
                      <span className="font-medium">{path.students}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-sm font-medium text-primary hover:text-primary/80 cursor-pointer">
                      View Curriculum →
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
