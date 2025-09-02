import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { members } from "@/data/members";
import {
  HeartIcon,
  LightBulbIcon,
  UserGroupIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Coders Den's mission, values, and the amazing team of mentors and community leaders helping developers grow.",
};

const values = [
  {
    icon: HeartIcon,
    title: "Community First",
    description:
      "We believe in the power of community and supporting each other's growth journey.",
  },
  {
    icon: LightBulbIcon,
    title: "Learn by Doing",
    description:
      "Hands-on experience and practical projects are at the core of our learning approach.",
  },
  {
    icon: UserGroupIcon,
    title: "Inclusive Environment",
    description:
      "Everyone is welcome regardless of background, experience level, or coding journey stage.",
  },
  {
    icon: AcademicCapIcon,
    title: "Continuous Growth",
    description:
      "We foster an environment of continuous learning and professional development.",
  },
  {
    icon: GlobeAltIcon,
    title: "Global Impact",
    description:
      "Building a worldwide community of skilled developers making a positive impact.",
  },
];

const mentors = members.filter((member) => member.role === "mentor");
const activeMembers = members.filter((member) => member.role === "member");

export default function AboutPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            About{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Coders Den
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We&apos;re a passionate community of developers, mentors, and
            learners dedicated to helping each other grow, succeed, and make a
            meaningful impact in the tech world.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Our Mission
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Empowering developers to reach their full potential
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              At Coders Den, we believe that everyone deserves access to quality
              coding education, mentorship, and a supportive community.
              We&apos;re breaking down barriers and creating opportunities for
              developers at every stage of their journey.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Our Values
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What drives us every day
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon
                      className="h-6 w-6 text-primary"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mentors Section */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Meet Our Mentors
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Learn from industry experts
            </p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our mentors are experienced professionals who are passionate about
              sharing their knowledge and helping the next generation of
              developers succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {mentors.map((mentor) => (
              <Card
                key={mentor.id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-w-3 aspect-h-2">
                  <Image
                    src={mentor.avatar}
                    alt={mentor.name}
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {mentor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 capitalize">
                    {mentor.role}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {mentor.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {mentor.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                    {mentor.techStack.length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
                        +{mentor.techStack.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    {mentor.github && (
                      <Link
                        href={mentor.github}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        GitHub
                      </Link>
                    )}
                    {mentor.linkedin && (
                      <Link
                        href={mentor.linkedin}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Members Preview */}
        <div className="mx-auto mt-32 max-w-7xl">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-primary">
              Our Community
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Amazing developers from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeMembers.slice(0, 6).map((member) => (
              <Card key={member.id} className="text-center">
                <CardContent className="p-6">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="mx-auto h-20 w-20 rounded-full object-cover"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 capitalize">
                    {member.experience} Developer
                  </p>
                  <div className="flex flex-wrap justify-center gap-1">
                    {member.techStack.slice(0, 2).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/quiz">Join Our Community</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
