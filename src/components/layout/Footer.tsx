import Link from "next/link";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

const navigation = {
  main: [
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Guidelines", href: "/guidelines" },
  ],
  resources: [
    { name: "JavaScript Guide", href: "/blog/javascript" },
    { name: "Python Tutorials", href: "/blog/python" },
    { name: "Career Tips", href: "/blog/career" },
    { name: "Interview Prep", href: "/blog/interviews" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Code of Conduct", href: "/guidelines" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold">CD</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Coders Den
              </span>
            </div>
            <p className="text-sm leading-6 text-muted-foreground max-w-md">
              A free coding community helping developers level up, become
              job-ready, and connect with mentors through interactive classes,
              events, and networking.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <EnvelopeIcon className="h-4 w-4" />
                <span>hello@codersden.community</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPinIcon className="h-4 w-4" />
                <span>Global Community</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="  md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Navigation
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.main.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Resources
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-foreground">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-border pt-8 sm:mt-20 lg:mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()} Coders Den. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0">
              <p className="text-xs leading-5 text-muted-foreground">
                Built with ❤️ by the community, for the community
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
