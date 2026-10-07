import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Student Feedback",
    role: "SkillHub Learner",
    message:
      "SkillHub makes it easier to find relevant learning resources without spending too much time searching through different playlists.",
  },
  {
    name: "Student Feedback",
    role: "SkillHub Learner",
    message:
      "The course structure and simple interface make it easier to decide what I want to learn and start learning quickly.",
  },
  {
    name: "Student Feedback",
    role: "SkillHub Learner",
    message:
      "I like the idea of bringing useful learning resources into one platform instead of searching through large collections of content.",
  },
];

const Testimonials = () => {
  return (
    <section className="border-y border-border bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-4 inline-flex  items-center rounded-full border border-border bg-muted/50 px-4 py-2 text-sm text-muted-foreground">
            What learners think
          </div>

          <h2 className="poppins-medium poppins-regular text-3xl tracking-tight text-foreground sm:text-4xl">
            Built to make learning easier
          </h2>

          <p className="mt-4 text-base leading-7 text-muted-foreground">
            SkillHub is designed to reduce the time spent searching for
            learning resources and help students focus on actually learning.
          </p>
        </div>

        {/* ================= TESTIMONIALS ================= */}
        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">

          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="
                group flex h-full flex-col
                rounded-2xl
                border border-border
                bg-card
                p-6
                shadow-sm
                transition-all duration-200
                hover:-translate-y-1
                hover:shadow-md
                lg:p-7
              "
            >

              {/* Quote Icon */}
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-primary/10
                "
              >
                <Quote className="h-5 w-5 text-primary" />
              </div>

              {/* Stars */}
              <div className="mt-5 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="
                      h-4 w-4
                      fill-yellow-500
                      text-yellow-500
                    "
                  />
                ))}
              </div>

              {/* Message */}
              <blockquote className="mt-5 flex-1">
                <p className="text-sm leading-7 text-muted-foreground">
                  "{testimonial.message}"
                </p>
              </blockquote>

              {/* User */}
              <div className="mt-7 border-t border-border pt-5">
                <p className="poppins-semibold text-sm text-foreground">
                  {testimonial.name}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}

        </div>

        {/* ================= NOTE ================= */}
        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-5 text-muted-foreground">
          These are representative product feedback examples. Real learner
          reviews can be connected to SkillHub enrollment and rating data.
        </p>

      </div>
    </section>
  );
};

export default Testimonials;
