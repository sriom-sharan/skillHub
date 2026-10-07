import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Compass,
  Github,
  GraduationCap,
  Layers3,
  PlayCircle,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const About = () => {
  const features = [
    {
      icon: Search,
      title: "Curated Learning",
      description:
        "Find carefully selected courses and learning resources without getting lost in endless playlists.",
    },
    {
      icon: Compass,
      title: "Learn with Direction",
      description:
        "Explore learning paths organized around skills, categories, prerequisites, and difficulty.",
    },
    {
      icon: BookOpen,
      title: "Track Your Learning",
      description:
        "Keep your learning journey organized with enrolled courses, saved resources, and progress.",
    },
    {
      icon: Users,
      title: "Student & Mentor",
      description:
        "A platform designed to connect learners with structured educational content and mentor-created courses.",
    },
  ];

  const technologies = [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "JWT",
    "Zod",
    "Tailwind CSS",
  ];

  const highlights = [
    "Structured course discovery",
    "YouTube playlist integration",
    "Secure authentication",
    "Student and mentor roles",
    "Course enrollment",
    "Responsive interface",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
    <Header/>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-screen-xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              A smarter way to learn
            </div>

            <h1 className="poppins-bold text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Learn with{" "}
              <span className="text-primary">purpose.</span>
              <br />
              Build with{" "}
              <span className="text-primary">confidence.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              SkillHub is a learning platform that helps students discover
              structured, relevant, and high-quality learning resources
              without spending hours searching through endless content.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/courses"
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  main-gradient
                  px-6 py-3
                  poppins-medium
                  text-sm text-white
                  shadow-md
                  transition-all
                  hover:scale-[1.02]
                  hover:opacity-90
                "
              >
                Explore Courses
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/signup"
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-border
                  bg-background
                  px-6 py-3
                  poppins-medium
                  text-sm
                  transition-colors
                  hover:bg-accent
                "
              >
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              The Problem
            </p>

            <h2 className="poppins-bold text-3xl tracking-tight sm:text-4xl">
              Learning online should not feel overwhelming.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              The internet has more educational content than ever before.
              YouTube alone contains thousands of courses, tutorials, and
              playlists for almost every technology.
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              But having too much content creates another problem:
              <span className="font-medium text-foreground">
                {" "}
                deciding what to learn.
              </span>
            </p>

            <p className="mt-4 leading-7 text-muted-foreground">
              Students often spend more time searching, comparing playlists,
              and figuring out where to start than actually learning.
              SkillHub aims to solve this discovery problem.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-muted/50 p-5">
                <Search className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-semibold">
                  Too Much Content
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Thousands of courses make it difficult to choose the right
                  resource.
                </p>
              </div>

              <div className="rounded-xl bg-muted/50 p-5">
                <Compass className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-semibold">
                  No Clear Direction
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Beginners often don&apos;t know what to learn first.
                </p>
              </div>

              <div className="rounded-xl bg-muted/50 p-5">
                <Layers3 className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-semibold">
                  Scattered Resources
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Useful learning material is spread across different sources.
                </p>
              </div>

              <div className="rounded-xl bg-muted/50 p-5">
                <PlayCircle className="mb-4 h-6 w-6 text-primary" />
                <h3 className="font-semibold">
                  Endless Playlists
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Finding a suitable playlist can take longer than expected.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ================= SOLUTION ================= */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Our Solution
            </p>

            <h2 className="poppins-bold text-3xl tracking-tight sm:text-4xl">
              One platform. A clearer learning journey.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              SkillHub brings course discovery, structured learning,
              enrollment, and learner management together in one place.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="
                    rounded-2xl
                    border border-border
                    bg-card
                    p-6
                    transition-all
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <h3 className="poppins-semibold text-lg">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            How SkillHub Works
          </p>

          <h2 className="poppins-bold text-3xl tracking-tight sm:text-4xl">
            From searching to learning in a few steps.
          </h2>
        </div>

        <div className="relative mt-14 grid gap-8 md:grid-cols-4">

          {[
            {
              number: "01",
              icon: Search,
              title: "Discover",
              description:
                "Search courses and explore learning resources based on your interests.",
            },
            {
              number: "02",
              icon: BookOpen,
              title: "Choose",
              description:
                "Review course information, skills, prerequisites, and available content.",
            },
            {
              number: "03",
              icon: PlayCircle,
              title: "Learn",
              description:
                "Enroll in a course and learn through structured video-based content.",
            },
            {
              number: "04",
              icon: GraduationCap,
              title: "Grow",
              description:
                "Continue building your skills and progressing toward your career goals.",
            },
          ].map((step) => {
            const Icon = step.icon;

            return (
              <div key={step.number} className="relative text-center">

                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card shadow-sm">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <span className="text-xs font-bold tracking-widest text-primary">
                  {step.number}
                </span>

                <h3 className="mt-2 poppins-semibold text-lg">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Built for Learning
              </p>

              <h2 className="poppins-bold text-3xl tracking-tight sm:text-4xl">
                Everything you need to stay focused.
              </h2>

              <p className="mt-5 leading-7 text-muted-foreground">
                SkillHub is designed around a simple principle: reduce the
                friction between knowing what you want to learn and actually
                starting to learn it.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />

                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">

              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Code2 className="h-6 w-6 text-primary" />
                </div>

                <div>
                  <h3 className="poppins-semibold text-xl">
                    SkillHub
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Modern learning platform
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Learning Resources
                    </span>

                    <span className="text-xs text-primary">
                      Curated
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[85%] rounded-full bg-primary" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border p-4">
                    <BookOpen className="mb-3 h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">
                      Courses
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Structured content
                    </p>
                  </div>

                  <div className="rounded-xl border border-border p-4">
                    <GraduationCap className="mb-3 h-5 w-5 text-primary" />
                    <p className="text-sm font-medium">
                      Progress
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Track your journey
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY ================= */}
      <section className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Technology
          </p>

          <h2 className="poppins-bold text-3xl tracking-tight sm:text-4xl">
            Built with modern web technologies.
          </h2>

          <p className="mt-5 leading-7 text-muted-foreground">
            SkillHub uses a MERN-based architecture with modern tools for
            validation, authentication, API development, and responsive UI.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="
                rounded-full
                border border-border
                bg-card
                px-4 py-2
                text-sm
                text-muted-foreground
                transition-colors
                hover:border-primary/40
                hover:text-foreground
              "
            >
              {technology}
            </span>
          ))}
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-screen-xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-7 w-7 text-primary" />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
              Our Vision
            </p>

            <h2 className="poppins-bold text-3xl tracking-tight sm:text-4xl">
              Make learning more intentional.
            </h2>

            <p className="mt-6 text-base leading-8 text-muted-foreground sm:text-lg">
              SkillHub aims to become more than a course listing platform.
              The long-term goal is to help learners understand what to learn,
              why they should learn it, and what they can build with those
              skills.
            </p>

            <p className="mt-4 text-base leading-8 text-muted-foreground sm:text-lg">
              By combining structured learning paths, curated resources,
              progress tracking, and intelligent recommendations, SkillHub
              can help turn scattered online content into a meaningful
              learning journey.
            </p>

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-screen-xl px-4 pb-20 sm:px-6 lg:px-8">

        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-border
            bg-card
            px-6 py-12
            text-center
            shadow-sm
            sm:px-10
          "
        >
          <div className="absolute left-1/2 top-0 -z-0 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="poppins-bold text-3xl sm:text-4xl">
              Ready to start learning?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Explore courses, discover new skills, and start building your
              learning journey with SkillHub.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/courses"
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  main-gradient
                  px-6 py-3
                  poppins-medium
                  text-sm text-white
                  transition-opacity
                  hover:opacity-90
                "
              >
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/signup"
                className="
                  inline-flex items-center
                  rounded-full
                  border border-border
                  bg-background
                  px-6 py-3
                  poppins-medium
                  text-sm
                  transition-colors
                  hover:bg-accent
                "
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>

      </section>

      <Footer/>
    </div>
  );
};

export default About;
