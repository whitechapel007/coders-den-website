"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/forms/ContactForm";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  EnvelopeIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  GlobeAltIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { ClockIcon } from "@heroicons/react/24/solid";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  scaleIn,
} from "@/lib/animations";

const contactInfo = [
  {
    icon: EnvelopeIcon,
    title: "Email Us",
    description: "Send us a message and we'll respond within 24 hours",
    contact: "hello@codersden.community",
    action: "mailto:hello@codersden.community",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    icon: GlobeAltIcon,
    title: "Global Community",
    description: "Join 1,200+ developers from around the world",
    contact: "Remote & Online",
    action: null,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    icon: ClockIcon,
    title: "Quick Response",
    description: "We typically respond to inquiries within",
    contact: "< 24 hours",
    action: null,
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Live Community",
    description: "Join our Discord for real-time support & networking",
    contact: "Discord Server",
    action: "#",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
  },
];

const faqs = [
  {
    question: "How do I join the developer network?",
    answer:
      "Complete our application process through the contact form. We evaluate candidates based on technical background, professional goals, and commitment to community standards.",
  },
  {
    question: "What are the membership requirements?",
    answer:
      "We seek developers with demonstrated technical skills, professional experience, and a commitment to collaborative learning and knowledge sharing.",
  },
  {
    question: "What technologies and frameworks are covered?",
    answer:
      "Our network spans multiple technologies including JavaScript, Python, React, Node.js, and emerging frameworks. We focus on industry-relevant skills and best practices.",
  },
  {
    question: "What support is available to members?",
    answer:
      "Members receive access to mentorship programs, technical workshops, career guidance, and networking opportunities with industry professionals.",
  },
  {
    question: "How active is the community?",
    answer:
      "Our network maintains regular engagement through technical discussions, code reviews, professional development sessions, and industry networking events.",
  },
];

export default function ContactPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="inline-flex items-center rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary border border-primary/20 mb-8"
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="h-2 w-2 rounded-full bg-primary mr-2" />
            Professional Support Team
          </motion.div>

          <motion.h1
            className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            Connect with our team for inquiries, partnerships, or technical
            support. We provide professional assistance to help advance your
            development goals.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-primary mr-2" />
              1,200+ Active Members
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-secondary mr-2" />
              24hr Response Time
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-accent mr-2" />
              Global Network
            </div>
          </motion.div>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          className="mx-auto mt-20 max-w-6xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((info) => (
              <motion.div
                key={info.title}
                variants={staggerItem}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="group"
              >
                <Card
                  className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${info.bgColor}`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <CardContent className="p-8 text-center relative z-10">
                    <motion.div
                      className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${info.color} shadow-lg mb-6`}
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <info.icon className="h-8 w-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {info.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {info.description}
                    </p>

                    {info.action ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="font-semibold hover:bg-primary/10 transition-colors"
                      >
                        <a href={info.action}>{info.contact}</a>
                      </Button>
                    ) : (
                      <p className="font-bold text-foreground text-lg">
                        {info.contact}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Stats Section */}
        <motion.div
          className="mx-auto mt-32 max-w-4xl text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Connect with developers from around the world who are building
            amazing things
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              className="text-center"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">1,200+</div>
              <div className="text-sm text-muted-foreground">
                Active Members
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </motion.div>

            <motion.div
              className="text-center"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">
                Community Support
              </div>
            </motion.div>

            <motion.div
              className="text-center"
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="mx-auto mt-32 grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border shadow-lg">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-slate-600 to-slate-800 flex items-center justify-center mr-4">
                  <EnvelopeIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Contact Our Team
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Professional support within 24 hours
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                Submit your inquiry using the form below. Our team will review
                your message and provide a comprehensive response to address
                your specific needs.
              </p>

              <ContactForm />
            </div>
          </motion.div>

          {/* Community Channels & FAQ */}
          <motion.div
            className="space-y-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Exclusive Community Access */}
            <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-slate-600 to-slate-800 flex items-center justify-center mr-4">
                  <UserGroupIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    Professional Developer Network
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Invitation-based community for serious developers
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                A curated network of experienced developers focused on
                professional growth, technical excellence, and industry best
                practices. Members receive access to advanced resources,
                mentorship opportunities, and exclusive events.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-slate-600 dark:bg-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Vetted Network
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with verified, experienced developers
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-slate-600 dark:bg-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Career Advancement
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Access to exclusive opportunities and mentorship
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-slate-600 dark:bg-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Technical Excellence
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Learn from industry professionals and senior developers
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-slate-600 dark:bg-slate-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Advanced Resources
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Access to specialized courses, workshops, and materials
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-bold text-foreground mb-3 flex items-center">
                  <EnvelopeIcon className="h-5 w-5 mr-2 text-slate-600 dark:text-slate-400" />
                  Application Process
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Submit your application through the contact form including
                  your technical background, professional goals, and motivation
                  for joining our network. Our team will evaluate your
                  application and respond accordingly.
                </p>
                <div className="flex items-center text-sm text-slate-600 dark:text-slate-400 font-medium">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Applications processed within 48 hours
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Frequently Asked Questions
              </h2>
              <div className="mt-8 space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
