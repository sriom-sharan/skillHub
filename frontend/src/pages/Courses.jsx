import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  X,
} from "lucide-react";

import Header from "../components/header";
import Footer from "../components/footer";
import Card from "@/components/card";
import LectureCard from "@/components/cardShimmer";
import axios from "../utils/axios";

const CATEGORIES = [
  "All",
  "Web Development",
  "Designing",
  "Mobile App Development",
  "Data Structures and Algorithms",
  "Data Analytics",
  "Data Science",
  "Artificial Intelligence",
  "Machine Learning",
  "Cloud Computing",
  "Cybersecurity",
  "Blockchain",
  "Internet of Things",
  "Game Development",
  "DevOps",
  "Software Testing",
  "Database Management",
  "Networking",
  "Programming Languages",
  "IT & Software",
  "Digital Marketing",
  "Project Management",
  "Business",
  "Finance",
  "Personal Development",
  "Health & Fitness",
];

const COURSES_PER_PAGE = 12;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  // Pagination
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: COURSES_PER_PAGE,
    totalCourses: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  /*
   * ---------------------------------------------------------
   * Fetch courses
   * ---------------------------------------------------------
   */

  const getCourses = async (currentPage = page) => {
    try {
      setLoading(true);
      setError("");

      const { data } = await axios.get(
        `/courses?page=${currentPage}&limit=${COURSES_PER_PAGE}`
      );

      console.log(data);
      

      setCourses(data.courses || []);

      setPagination(
        data.pagination || {
          page: currentPage,
          limit: COURSES_PER_PAGE,
          totalCourses: data.courses?.length || 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: currentPage > 1,
        }
      );
    } catch (error) {
      console.error("Failed to fetch courses:", error);

      setError(
        "Unable to load courses right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * Fetch when page changes
   * ---------------------------------------------------------
   */

  useEffect(() => {
    getCourses(page);
  }, [page]);

  /*
   * ---------------------------------------------------------
   * Search
   * ---------------------------------------------------------
   */

  const searchCourses = useCallback(
    debounce(async (value) => {
      const query = value.trim();

      if (!query) {
        setSearchResults([]);
        setSearching(false);
        return;
      }

      try {
        setSearching(true);

        const { data } = await axios.post("/courses/search", {
          searchString: query,
        });

        setSearchResults(data.courses || []);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 400),
    []
  );

  useEffect(() => {
    return () => {
      searchCourses.cancel();
    };
  }, [searchCourses]);

  const handleSearchChange = (event) => {
    const value = event.target.value;

    setSearchTerm(value);
    searchCourses(value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  /*
   * ---------------------------------------------------------
   * Category
   * ---------------------------------------------------------
   */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);

    // Start from first page when category changes
    setPage(1);
  };

  /*
   * ---------------------------------------------------------
   * Sorting
   * ---------------------------------------------------------
   */

  const filteredCourses = useMemo(() => {
    let result = [...courses];

    /*
     * NOTE:
     * Category and sorting are still client-side for now.
     *
     * Later we will move them to the backend:
     *
     * /courses?page=1&limit=12&category=Web Development&sort=name
     */

    if (activeCategory !== "All") {
      result = result.filter(
        (course) => course.category === activeCategory
      );
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortBy === "videos") {
      result.sort(
        (a, b) =>
          (b.videos?.length || 0) -
          (a.videos?.length || 0)
      );
    }

    return result;
  }, [courses, activeCategory, sortBy]);

  /*
   * ---------------------------------------------------------
   * Pagination handlers
   * ---------------------------------------------------------
   */

  const handlePreviousPage = () => {
    if (pagination.hasPreviousPage) {
      setPage((previousPage) => previousPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.hasNextPage) {
      setPage((previousPage) => previousPage + 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= pagination.totalPages &&
      pageNumber !== page
    ) {
      setPage(pageNumber);
    }
  };

  /*
   * ---------------------------------------------------------
   * Search dropdown
   * ---------------------------------------------------------
   */

  const showSearchResults =
    searchTerm.trim().length > 0 &&
    searchResults.length > 0;

  /*
   * ---------------------------------------------------------
   * Page numbers
   * ---------------------------------------------------------
   */

  const pageNumbers = Array.from(
    { length: pagination.totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* -----------------------------------------------------
          Hero
      ----------------------------------------------------- */}

      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-28 md:pb-20 md:pt-36">

          <div className="mx-auto max-w-3xl text-center">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <BookOpen size={16} />
              Curated learning resources
            </div>

            <h1 className="text-4xl poppins-semibold tracking-tight sm:text-5xl md:text-6xl">
              Learn skills.

              <span className="block  text-purple-600 dark:text-purple-400">
                Build your future.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400 md:text-lg">
              Discover curated courses and learning resources
              designed to help you build practical skills and
              become job-ready.
            </p>

            {/* Search */}
            <div className="relative mx-auto mt-8 max-w-2xl">

              <div className="flex items-center rounded-2xl border border-zinc-200 bg-white p-2 shadow-lg shadow-zinc-200/50 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/20">

                <Search
                  size={20}
                  className="ml-3 shrink-0 text-zinc-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search courses, skills, technologies..."
                  className="w-full bg-transparent px-4 py-3 text-sm outline-none placeholder:text-zinc-400"
                />

                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="mr-2 rounded-lg p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}

                <button
                  type="button"
                  className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-700"
                >
                  Search
                </button>
              </div>

              {/* Search results */}
              {showSearchResults && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-xl dark:border-zinc-800 dark:bg-zinc-900">

                  {searchResults.slice(0, 6).map((course) => (
                    <Link
                      key={course._id}
                      to={`/courses/${course._id}`}
                      onClick={clearSearch}
                      className="block border-b border-zinc-100 px-5 py-4 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800"
                    >
                      <p className="font-medium">
                        {course.name}
                      </p>

                      <p className="mt-1 text-xs text-zinc-500">
                        {course.category}
                      </p>
                    </Link>
                  ))}

                  {searchResults.length > 6 && (
                    <div className="px-5 py-3 text-center text-sm text-purple-600">
                      View all search results
                    </div>
                  )}
                </div>
              )}

              {searching && (
                <p className="mt-2 text-sm text-zinc-400">
                  Searching...
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* -----------------------------------------------------
          Courses
      ----------------------------------------------------- */}

      <main className="mx-auto max-w-7xl px-6 pb-20">

        {/* Section Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold">
              Explore courses
            </h2>

            {!loading && (
              <p className="mt-1 text-sm text-zinc-500">
                Showing{" "}
                {filteredCourses.length} of{" "}
                {pagination.totalCourses} courses
              </p>
            )}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">

            <SlidersHorizontal
              size={18}
              className="text-zinc-500"
            />

            <span className="text-sm text-zinc-500">
              Sort:
            </span>

            <div className="relative">

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-3 pr-9 text-sm outline-none dark:border-zinc-800 dark:bg-zinc-900"
              >
                <option value="popular">
                  Popular
                </option>

                <option value="name">
                  Name
                </option>

                <option value="videos">
                  Most videos
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------
            Categories
        --------------------------------------------------- */}

        <div className="mb-10 overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">

            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() =>
                  handleCategoryChange(category)
                }
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeCategory === category
                    ? "border-purple-600 bg-purple-600 text-white"
                    : "border-zinc-200 bg-background text-zinc-600 hover:border-purple-300 hover:text-purple-600 dark:border-zinc-800 dark:bg-background/80 dark:text-zinc-400"
                }`}
              >
                {category}
              </button>
            ))}

          </div>
        </div>

        {/* ---------------------------------------------------
            Error
        --------------------------------------------------- */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30">

            {error}

            <button
              onClick={() => getCourses(page)}
              className="ml-2 font-medium underline"
            >
              Retry
            </button>

          </div>
        )}

        {/* ---------------------------------------------------
            Loading
        --------------------------------------------------- */}

        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {Array.from({ length: COURSES_PER_PAGE }).map(
              (_, index) => (
                <LectureCard key={index} />
              )
            )}

          </div>
        )}

        {/* ---------------------------------------------------
            Empty
        --------------------------------------------------- */}

        {!loading &&
          !error &&
          filteredCourses.length === 0 && (
            <div className="rounded-2xl border border-dashed border-zinc-300 py-20 text-center dark:border-zinc-800">

              <BookOpen
                size={40}
                className="mx-auto mb-4 text-zinc-400"
              />

              <h3 className="text-lg font-semibold">
                No courses found
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                Try another category or search for a
                different topic.
              </p>

              <button
                onClick={() =>
                  handleCategoryChange("All")
                }
                className="mt-5 rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:bg-purple-700"
              >
                View all courses
              </button>

            </div>
          )}

        {/* ---------------------------------------------------
            Course Grid
        --------------------------------------------------- */}

        {!loading &&
          !error &&
          filteredCourses.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {filteredCourses.map((course) => (
                <Link
                  key={course._id}
                  to={`/courses/${course._id}`}
                  className="group"
                >
                  <Card
                   id ={course._id}
                      course={course}

                  />
                </Link>
              ))}

            </div>
          )}

        {/* ---------------------------------------------------
            Pagination
        --------------------------------------------------- */}

        {!loading &&
          !error &&
          pagination.totalPages > 1 && (
            <div className="mt-12 flex flex-col items-center gap-4">

              <div className="flex items-center gap-2">

                {/* Previous */}
                <button
                  onClick={handlePreviousPage}
                  disabled={!pagination.hasPreviousPage}
                  className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:hover:bg-zinc-900"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="hidden items-center gap-1 sm:flex">

                  {pageNumbers.map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() =>
                        handlePageChange(pageNumber)
                      }
                      className={`h-9 min-w-9 rounded-lg px-3 text-sm transition ${
                        pageNumber === page
                          ? "bg-purple-600 text-white"
                          : "border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                </div>

                {/* Mobile Page Indicator */}
                <span className="text-sm text-zinc-500 sm:hidden">
                  Page {page} of{" "}
                  {pagination.totalPages}
                </span>

                {/* Next */}
                <button
                  onClick={handleNextPage}
                  disabled={!pagination.hasNextPage}
                  className="flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-800 dark:hover:bg-zinc-900"
                >
                  Next
                  <ChevronRight size={16} />
                </button>

              </div>

              <p className="text-xs text-zinc-500">
                Page {page} of{" "}
                {pagination.totalPages}
              </p>

            </div>
          )}

      </main>

      <Footer />
    </div>
  );
};

export default Courses;
