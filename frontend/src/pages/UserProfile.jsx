import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

import {
    User,
    Mail,
    GraduationCap,
    ShieldCheck,
    BookOpen,
    Library,
    CheckCircle2,
    Clock3,
    ArrowRight,
    Settings,
    UserRound
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


useEffect(() => {
    console.log("✅ UserProfile component mounted");

    const getProfile = async () => {
        console.log("🚀 Starting profile API request");

        try {
            setLoading(true);
            setError("");

            console.log("📡 Calling:", "/users/profile");
            console.log("📡 Axios instance:", axios);

            const response = await axios.get("/users/profile");

            console.log("✅ Profile API response:", response.data);

            setUser(response.data.user);
        } catch (error) {
            console.error("❌ Profile API error:", error);
            console.error("❌ Error response:", error.response);
            console.error("❌ Error request:", error.request);

            setError(
                error.response?.data?.message ||
                "Unable to load your profile."
            );
        } finally {
            setLoading(false);
        }
    };

    getProfile();
}, []);


    const enrolledCourses = user?.enrolledCourses || [];
    const createdCourses = user?.createdCourses || [];

    const stats = useMemo(() => {
        const completedCourses = enrolledCourses.filter(
            (course) =>
                course.status === "completed"
        ).length;

        return {
            enrolled: enrolledCourses.length,
            completed: completedCourses,
            created: createdCourses.length
        };
    }, [enrolledCourses, createdCourses]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="mx-auto max-w-7xl px-4 py-10">
                    <div className="animate-pulse space-y-6">
                        <div className="h-40 rounded-2xl bg-muted" />

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="h-28 rounded-xl bg-muted" />
                            <div className="h-28 rounded-xl bg-muted" />
                            <div className="h-28 rounded-xl bg-muted" />
                        </div>

                        <div className="h-64 rounded-2xl bg-muted" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4">
                    <div className="w-full rounded-2xl border bg-card p-8 text-center shadow-sm">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
                            <UserRound className="h-7 w-7 text-destructive" />
                        </div>

                        <h1 className="text-xl font-semibold">
                            Unable to load profile
                        </h1>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
          <Header/>
            <div className="mx-auto max-w-7xl px-4 py-8 mt-16 sm:px-6 lg:px-8">

                {/* Profile Header */}
                <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-background" />

                    <div className="px-5 pb-6 sm:px-8">
                        <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-card bg-primary text-3xl font-bold text-primary-foreground shadow-md">
                                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>

                                <div className="pb-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h1 className="text-2xl font-bold tracking-tight">
                                            {user?.name}
                                        </h1>

                                        {user?.isVerified && (
                                            <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
                                                <ShieldCheck className="h-3.5 w-3.5" />
                                                Verified
                                            </span>
                                        )}
                                    </div>

                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {user?.role
                                            ? user.role.charAt(0).toUpperCase() +
                                              user.role.slice(1)
                                            : "Student"}
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/settings"
                                className="inline-flex w-fit items-center gap-2 rounded-lg border bg-background px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                            >
                                <Settings className="h-4 w-4" />
                                Edit Profile
                            </Link>
                        </div>

                        {/* User Details */}
                        <div className="mt-7 grid gap-4 border-t pt-6 sm:grid-cols-2 lg:grid-cols-3">

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Mail className="h-5 w-5 text-primary" />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">
                                        Email
                                    </p>
                                    <p className="truncate text-sm font-medium">
                                        {user?.email || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Qualification
                                    </p>
                                    <p className="text-sm font-medium">
                                        {user?.qualification || "Not provided"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <User className="h-5 w-5 text-primary" />
                                </div>

                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Account Type
                                    </p>
                                    <p className="text-sm font-medium capitalize">
                                        {user?.role || "Student"}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Statistics */}
                <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <StatCard
                        icon={<BookOpen className="h-5 w-5" />}
                        title="Enrolled Courses"
                        value={stats.enrolled}
                        description="Courses you're learning"
                    />

                    <StatCard
                        icon={<CheckCircle2 className="h-5 w-5" />}
                        title="Completed"
                        value={stats.completed}
                        description="Courses completed"
                    />

                    <StatCard
                        icon={<Library className="h-5 w-5" />}
                        title="Created Courses"
                        value={stats.created}
                        description="Courses you've created"
                    />

                </section>

                {/* Enrolled Courses */}
                <section className="mt-8">

                    <div className="mb-5 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">
                                My Learning
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Continue learning from your enrolled courses.
                            </p>
                        </div>

                        <Link
                            to="/courses"
                            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
                        >
                            Browse Courses
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {enrolledCourses.length === 0 ? (
                        <EmptyState
                            icon={<BookOpen className="h-6 w-6" />}
                            title="No courses yet"
                            description="You haven't enrolled in any courses. Start learning today."
                            actionText="Explore Courses"
                            actionLink="/courses"
                        />
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {enrolledCourses.map((course) => (
                                <EnrolledCourseCard
                                    key={course._id}
                                    course={course}
                                />
                            ))}
                        </div>
                    )}

                </section>

                {/* Created Courses */}
                {createdCourses.length > 0 && (
                    <section className="mt-10">

                        <div className="mb-5">
                            <h2 className="text-xl font-bold">
                                Courses I Created
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Manage the learning resources you've added to SkillHub.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {createdCourses.map((course) => (
                                <CreatedCourseCard
                                    key={course._id}
                                    course={course}
                                />
                            ))}
                        </div>

                    </section>
                )}

            </div>
            <Footer/>
        </div>
    );
};


/* ---------------------------------------------
   Statistics Card
--------------------------------------------- */

const StatCard = ({
    icon,
    title,
    value,
    description
}) => {
    return (
        <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>

                <span className="text-2xl font-bold">
                    {value}
                </span>
            </div>

            <div className="mt-4">
                <p className="font-medium">
                    {title}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
};


/* ---------------------------------------------
   Enrolled Course Card
--------------------------------------------- */

const EnrolledCourseCard = ({ course }) => {
    const videoCount = course?.videos?.length || 0;

    const status = course?.status || "enrolled";

    return (
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            <div className="relative aspect-video overflow-hidden bg-muted">
                {course?.videos?.[0]?.thumbnails?.medium?.url ? (
                    <img
                        src={course.videos[0].thumbnails.medium.url}
                        alt={course.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <BookOpen className="h-10 w-10 text-muted-foreground" />
                    </div>
                )}
            </div>

            <div className="p-5">

                <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        {course?.category || "Course"}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5" />
                        {videoCount} videos
                    </span>
                </div>

                <h3 className="line-clamp-2 text-base font-semibold">
                    {course?.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    {status === "completed" ? (
                        <>
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            Completed
                        </>
                    ) : (
                        <>
                            <Clock3 className="h-4 w-4" />
                            In Progress
                        </>
                    )}
                </div>

                <Link
                    to={`/courses/${course?._id}`}
                    className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                    Continue Learning
                    <ArrowRight className="h-4 w-4" />
                </Link>

            </div>
        </div>
    );
};


/* ---------------------------------------------
   Created Course Card
--------------------------------------------- */

const CreatedCourseCard = ({ course }) => {
    const videoCount = course?.videos?.length || 0;

    return (
        <div className="rounded-xl border bg-card p-5 shadow-sm">

            <div className="flex items-start justify-between gap-4">

                <div>
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        {course?.category || "Course"}
                    </span>

                    <h3 className="mt-3 line-clamp-2 font-semibold">
                        {course?.name}
                    </h3>
                </div>

                <Library className="h-5 w-5 shrink-0 text-muted-foreground" />

            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-4 text-sm text-muted-foreground">
                <span>{videoCount} videos</span>

                <Link
                    to={`/courses/${course?._id}`}
                    className="flex items-center gap-1 font-medium text-primary hover:underline"
                >
                    View Course
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>

        </div>
    );
};


/* ---------------------------------------------
   Empty State
--------------------------------------------- */

const EmptyState = ({
    icon,
    title,
    description,
    actionText,
    actionLink
}) => {
    return (
        <div className="rounded-2xl border border-dashed bg-card px-6 py-12 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                {icon}
            </div>

            <h3 className="mt-4 text-lg font-semibold">
                {title}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {description}
            </p>

            <Link
                to={actionLink}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
                {actionText}
                <ArrowRight className="h-4 w-4" />
            </Link>

        </div>
    );
};

export default UserProfile;
