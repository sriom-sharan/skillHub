import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe2,
  GraduationCap,
  PlayCircle,
  UserRound,
} from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import CourseDShimmer from "@/components/courseDShimmer";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { AuthContext } from "@/components/authContext";

import {
  asyncloadcourse,
  removecourse,
} from "../store/courseAction";

import { putData } from "@/utils/postData";
import axios from "../utils/axios";

const LECTURES_PER_PAGE = 6;

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedin } = useContext(AuthContext);

  const course = useSelector((state) => state.course.info);

  const [currentPage, setCurrentPage] = useState(1);

  const [enrolling, setEnrolling] = useState(false);
  const [error, setError] = useState("");

  // Enrollment state
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [checkingEnrollment, setCheckingEnrollment] =
    useState(false);

  /*
   * ---------------------------------------------------------
   * Load course
   * ---------------------------------------------------------
   */

  useEffect(() => {
    dispatch(asyncloadcourse(courseId));

    return () => {
      dispatch(removecourse());
    };
  }, [dispatch, courseId]);

  /*
   * ---------------------------------------------------------
   * Reset lecture page when course changes
   * ---------------------------------------------------------
   */

  useEffect(() => {
    setCurrentPage(1);
  }, [courseId]);

  /*
   * ---------------------------------------------------------
   * Check enrollment
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!isLoggedin || !courseId) {
        setIsEnrolled(false);
        return;
      }

      try {
        setCheckingEnrollment(true);
        setError("");

        const { data } = await axios.get(
          `/enrollment/${courseId}`
        );

        setIsEnrolled(Boolean(data?.enrolled));
      } catch (error) {
        console.error(
          "Failed to check enrollment:",
          error
        );

        setIsEnrolled(false);
      } finally {
        setCheckingEnrollment(false);
      }
    };

    checkEnrollment();
  }, [courseId, isLoggedin]);

  /*
   * ---------------------------------------------------------
   * Derived values
   * ---------------------------------------------------------
   */

  const lectures = Array.isArray(course?.lectures)
    ? course.lectures
    : [];

  const skills = useMemo(() => {
    if (!course?.skills) return [];

    if (Array.isArray(course.skills)) {
      return course.skills;
    }

    return course.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
  }, [course]);

  /*
   * ---------------------------------------------------------
   * Lecture pagination
   * ---------------------------------------------------------
   */

  const totalLecturePages = Math.ceil(
    lectures.length / LECTURES_PER_PAGE
  );

  const startIndex =
    (currentPage - 1) * LECTURES_PER_PAGE;

  const endIndex =
    startIndex + LECTURES_PER_PAGE;

  const visibleLectureList = lectures.slice(
    startIndex,
    endIndex
  );

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalLecturePages
    ) {
      return;
    }

    setCurrentPage(page);

    // Scroll back to curriculum
    document
      .getElementById("curriculum")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /*
   * ---------------------------------------------------------
   * Enrollment
   * ---------------------------------------------------------
   */

  const enrollInCourse = async () => {
    if (!isLoggedin) {
      navigate("/login");
      return;
    }

    if (isEnrolled) {
      return;
    }

    try {
      setEnrolling(true);
      setError("");

      const response = await putData(
        "courses/enroll",
        { courseId }
      );

      if (
        response?.msg ===
        "Enrolled in course successfully"
      ) {
        setIsEnrolled(true);

        navigate("/profile");
        return;
      }

      setError(
        response?.msg ||
          "Unable to enroll in this course."
      );
    } catch (error) {
      console.error(
        "Enrollment failed:",
        error
      );

      if (
        error?.response?.status === 409 ||
        error?.response?.data?.message
          ?.toLowerCase()
          ?.includes("already enrolled")
      ) {
        setIsEnrolled(true);
        return;
      }

      setError(
        error?.response?.data?.message ||
          "Something went wrong while enrolling. Please try again."
      );
    } finally {
      setEnrolling(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * Continue Learning
   * ---------------------------------------------------------
   */

  const continueLearning = () => {
    if (!isLoggedin) {
      navigate("/login");
      return;
    }

    if (!lectures.length) {
      setError("No lessons are available yet.");
      return;
    }

    const firstVideoId =
      lectures[0]?.resourceId?.videoId;

    if (!firstVideoId) {
      setError("Unable to open the first lesson.");
      return;
    }

    navigate(
      `/courses/${courseId}/lectures/${firstVideoId}`
    );
  };

  /*
   * ---------------------------------------------------------
   * Loading
   * ---------------------------------------------------------
   */

  if (!course) {
    return <CourseDShimmer />;
  }

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* =====================================================
          Breadcrumb
      ===================================================== */}

      <div className="mx-auto max-w-7xl px-6 pt-28">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink href="/courses">
                Courses
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>
                {course.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* =====================================================
          Course Hero
      ===================================================== */}

      <section className="mt-8 border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.4fr_0.8fr] lg:py-14">

          {/* Left */}
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {course.category && (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {course.category}
                </span>
              )}

              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                Curated Course
              </span>

              {isEnrolled && (
                <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
                  <CheckCircle2 size={14} />
                  Enrolled
                </span>
              )}
            </div>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {course.name}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground">
              {course.description}
            </p>

            <div className="mt-7 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserRound size={20} />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Course curated by
                </p>

                <p className="font-medium">
                  {course.authorName}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <PlayCircle size={17} />
                {lectures.length} lessons
              </div>

              <div className="flex items-center gap-2">
                <Globe2 size={17} />
                {course.language || "English"}
              </div>

              <div className="flex items-center gap-2">
                <GraduationCap size={17} />
                Self-paced learning
              </div>
            </div>
          </div>

          {/* Right: Enrollment Card */}
          <div className="lg:pl-4">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl">

              <div className="relative aspect-video overflow-hidden">
                <img
                  src={
                    course.thumbnail ||
                    lectures[0]?.thumbnails?.high?.url ||
                    lectures[0]?.thumbnails?.medium?.url ||
                    lectures[0]?.thumbnails?.default?.url
                  }
                  alt={`${course.name} course thumbnail`}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm font-medium text-white">
                  <PlayCircle size={18} />
                  {lectures.length} lessons
                </div>
              </div>

              <div className="p-6">
                {isEnrolled ? (
                  <>
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        size={22}
                        className="text-green-500"
                      />

                      <h2 className="text-xl font-semibold">
                        You're enrolled
                      </h2>
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Continue where you left off and
                      keep building your skills.
                    </p>

                    <button
                      onClick={continueLearning}
                      disabled={checkingEnrollment}
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <PlayCircle size={18} />
                      Continue Learning
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">
                      Start learning today
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Follow the curated curriculum and
                      build practical knowledge at your
                      own pace.
                    </p>

                    <button
                      onClick={enrollInCourse}
                      disabled={
                        enrolling ||
                        checkingEnrollment
                      }
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {checkingEnrollment
                        ? "Checking enrollment..."
                        : enrolling
                          ? "Enrolling..."
                          : isLoggedin
                            ? "Enroll in Course"
                            : "Login to Enroll"}
                    </button>
                  </>
                )}

                {error && (
                  <p className="mt-3 text-center text-sm text-red-500">
                    {error}
                  </p>
                )}

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Learn at your own pace
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          Main Content
      ===================================================== */}

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">

          {/* =================================================
              Curriculum
          ================================================= */}

          <section id="curriculum">
            <div className="mb-6">
              <p className="text-sm font-medium text-primary">
                COURSE CURRICULUM
              </p>

              <h2 className="mt-1 text-2xl font-bold">
                What you&apos;ll learn
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                {lectures.length} lessons organized into
                a structured learning path.
              </p>
            </div>

            {/* Lecture list */}
            <div className="overflow-hidden rounded-2xl border border-border">
              {visibleLectureList.length > 0 ? (
                visibleLectureList.map(
                  (lecture, index) => {
                    const videoId =
                      lecture?.resourceId?.videoId;

                    // Calculate actual lecture number
                    // instead of restarting at 1 on each page.
                    const lectureNumber =
                      startIndex + index + 1;

                    const lectureContent = (
                      <>
                        {/* Number */}
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-medium text-muted-foreground">
                          {lectureNumber}
                        </div>

                        {/* Thumbnail */}
                        {lecture?.thumbnails?.default
                          ?.url && (
                          <div className="hidden h-16 w-28 shrink-0 overflow-hidden rounded-lg sm:block">
                            <img
                              src={
                                lecture.thumbnails
                                  .default.url
                              }
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover transition group-hover:scale-105"
                            />
                          </div>
                        )}

                        {/* Information */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="line-clamp-2 text-sm font-medium leading-6 group-hover:text-primary">
                              {lecture?.title ||
                                `Lesson ${lectureNumber}`}
                            </h3>

                            <PlayCircle
                              size={18}
                              className="mt-1 shrink-0 text-muted-foreground group-hover:text-primary"
                            />
                          </div>

                          {lecture?.description && (
                            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                              {lecture.description}
                            </p>
                          )}
                        </div>
                      </>
                    );

                    /*
                     * Enrolled users can open lessons.
                     */
                    if (
                      isEnrolled &&
                      videoId
                    ) {
                      return (
                        <Link
                          key={
                            videoId ||
                            `${lecture?.title}-${index}`
                          }
                          to={`/courses/${courseId}/lectures/${videoId}`}
                          className="group flex gap-4 border-b border-border p-4 transition last:border-b-0 hover:bg-muted/50"
                        >
                          {lectureContent}
                        </Link>
                      );
                    }

                    /*
                     * Non-enrolled users can see
                     * the curriculum but cannot open lessons.
                     */
                    return (
                      <button
                        key={
                          videoId ||
                          `${lecture?.title}-${index}`
                        }
                        type="button"
                        onClick={() => {
                          if (!isLoggedin) {
                            navigate("/login");
                            return;
                          }

                          setError(
                            "Please enroll in this course to access the lessons."
                          );
                        }}
                        className="group flex w-full gap-4 border-b border-border p-4 text-left transition last:border-b-0 hover:bg-muted/50"
                      >
                        {lectureContent}
                      </button>
                    );
                  }
                )
              ) : (
                <div className="p-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No lessons are available for this course yet.
                  </p>
                </div>
              )}
            </div>

            {/* =================================================
                Pagination
            ================================================= */}

            {totalLecturePages > 1 && (
              <div className="mt-6 flex flex-col items-center gap-4">

                {/* Page information */}
                <p className="text-xs text-muted-foreground">
                  Showing {startIndex + 1}-
                  {Math.min(
                    endIndex,
                    lectures.length
                  )}{" "}
                  of {lectures.length} lessons
                </p>

                <div className="flex items-center gap-2">

                  {/* Previous */}
                  <button
                    type="button"
                    onClick={() =>
                      goToPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="flex h-10 items-center gap-1 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                    <span className="hidden sm:inline">
                      Previous
                    </span>
                  </button>

                  {/* Page numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from(
                      {
                        length: totalLecturePages,
                      },
                      (_, index) => {
                        const page = index + 1;

                        return (
                          <button
                            key={page}
                            type="button"
                            onClick={() =>
                              goToPage(page)
                            }
                            className={`h-10 min-w-10 rounded-lg px-3 text-sm font-medium transition ${
                              currentPage === page
                                ? "bg-primary text-primary-foreground"
                                : "border border-border hover:bg-muted"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}
                  </div>

                  {/* Next */}
                  <button
                    type="button"
                    onClick={() =>
                      goToPage(currentPage + 1)
                    }
                    disabled={
                      currentPage ===
                      totalLecturePages
                    }
                    className="flex h-10 items-center gap-1 rounded-lg border border-border px-3 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <span className="hidden sm:inline">
                      Next
                    </span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* =================================================
              Sidebar
          ================================================= */}

          <aside>
            <div className="sticky top-24">

              {/* Skills */}
              <div className="rounded-2xl border border-border p-6">
                <h2 className="text-lg font-semibold">
                  Skills you'll gain
                </h2>

                <div className="mt-5 space-y-3">
                  {skills.length > 0 ? (
                    skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-start gap-3 text-sm"
                      >
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-green-500"
                        />

                        <span className="text-muted-foreground">
                          {skill}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Course skills will be available soon.
                    </p>
                  )}
                </div>
              </div>

              {/* Course Info */}
              <div className="mt-5 rounded-2xl border border-border p-6">
                <h2 className="text-lg font-semibold">
                  Course information
                </h2>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <BookOpen size={16} />
                      Lessons
                    </span>

                    <span className="font-medium">
                      {lectures.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Globe2 size={16} />
                      Language
                    </span>

                    <span className="font-medium">
                      {course.language || "English"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap size={16} />
                      Format
                    </span>

                    <span className="font-medium">
                      Video
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
