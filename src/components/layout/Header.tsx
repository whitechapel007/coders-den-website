"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import './nav.css';
import { cn } from '@/lib/utils';
import logo from '../../assets/Coders_den_logo.png';

export function Header() {
  const [nav, setNav] = useState<boolean>(false);
  const pathname = usePathname();

  const handleNav = () => setNav(!nav);
  const CloseNav = () => setNav(false);

  const navigation = [
    { name: 'Home', href: '/', icon: 'fa-solid fa-house-chimney' },
    { name: 'About', href: '/about', icon: 'fa-solid fa-circle-question' },
    { name: 'Events', href: '/events', icon: 'fa-solid fa-circle-info' },
    { name: 'Testimonials', href: '/testimonials', icon: 'fa-solid fa-hospital' },
    { name: 'Blog', href: '/blog', icon: 'fa-solid fa-blog' },
    { name: 'Contact', href: '/contact', icon: 'fa-solid fa-right-to-bracket' },
  ];

  return (
    <div className="lg:px-15 md:px-10 px-3">
      {/* Mobile nav */}
      <div className="lg:hidden pb-3">
        <div className="flex justify-between items-center w-full mt-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img src={logo.src} alt="logo" className="w-[100px]" />
            </Link>
          </div>
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={handleNav}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className={nav ? "nav-overlay" : ""}>
          <div className={nav ? "mobileNav" : "mobileNav openNav"}>
            <div className="flex justify-between items-center w-full text-white">
              <Link href="/">
                <img src={logo.src} alt="logo" className="w-[100px]" />
              </Link>
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
                onClick={handleNav}
              >
                <span className="sr-only">Open main menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-10">
              <ul className="flex flex-col text-white">
                <hr className="opacity-20" />
                {navigation.map((item) => (
                  <div key={item.name}>
                    <li className="p-3" onClick={CloseNav}>
                      <Link href={item.href} className="flex items-center hover:text-primary">
                        <i className={`${item.icon} mr-3`}></i>
                        <h3>{item.name}</h3>
                      </Link>
                    </li>
                    <hr className="opacity-20" />
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop nav */}
      <div className="hidden lg:flex lg:text-sm items-center w-full py-5">
        <div className="w-1/4">
          <Link href="/">
            <img src={logo.src} alt="logo" className="w-[100px]" />
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-semibold leading-6 transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-primary'
                  : 'text-foreground'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/quiz">Take Quiz</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/quiz">Join Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}