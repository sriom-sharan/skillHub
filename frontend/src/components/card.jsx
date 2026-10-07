import { Link } from "react-router-dom";
import {
  PlayCircle,
  Users,
  Star,
} from "lucide-react";

const FALLBACK_THUMBNAIL =
  "https://placehold.co/640x360?text=SkillHub";

const Card = ({ course }) => {
  if (!course) return null;

  /*
   * Your backend stores:
   *
   * videos: [
   *   {
   *     title,
   *     description,
   *     thumbnails: {
   *       default: { url },
   *       medium: { url },
   *       high: { url }
   *     },
   *     resourceId: {
   *       videoId
   *     }
   *   }
   * ]
   */

  const firstVideo = course.videos?.[0];

  const thumbnail =
    firstVideo?.thumbnails?.maxres?.url ||
    firstVideo?.thumbnails?.high?.url ||
    firstVideo?.thumbnails?.medium?.url ||
    firstVideo?.thumbnails?.default?.url ||
    FALLBACK_THUMBNAIL;

  return (
    <Link
      to={`/courses/${course._id}`}
      className="
        group flex w-full flex-col
        overflow-hidden rounded-xl
        border border-border
        bg-card
        shadow-sm
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-lg
        md:w-64
      "
    >
      {/* ================= Thumbnail ================= */}
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={thumbnail}
          alt={course.name || "Course thumbnail"}
          className="
            h-full w-full
            object-cover
            transition-transform duration-300
            group-hover:scale-105
          "
          loading="lazy"
        />
      </div>

      {/* ================= Content ================= */}
      <div className="flex flex-1 flex-col p-3">

        {/* Category + Rating */}
        <div className="flex items-center justify-between gap-2">

          <span
            className="
              max-w-[70%]
              truncate
              rounded-md
              bg-primary/10
              px-2 py-1
              text-[10px]
              font-medium
              text-primary
            "
          >
            {course.category || "Web Development"}
          </span>

          {course.rating !== undefined &&
            course.rating !== null && (
              <span
                className="
                  flex items-center gap-1
                  text-[11px]
                  font-medium
                  text-muted-foreground
                "
              >
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />

                {Number(course.rating).toFixed(1)}
              </span>
            )}
        </div>

        {/* Course Title */}
        <h3
          className="
            mt-3
            line-clamp-2
            min-h-[40px]
            poppins-semibold
            text-sm
            leading-5
            text-foreground
            transition-colors
            group-hover:text-primary
          "
        >
          {course.name || "Learn Web Development"}
        </h3>

        {/* Course Stats */}
        <div
          className="
            mt-3
            flex items-center gap-4
            text-[11px]
            text-muted-foreground
          "
        >
          <span className="flex items-center gap-1">
            <PlayCircle className="h-3.5 w-3.5" />

            {course.videos?.length ?? 0} videos
          </span>

          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />

            {course.totalEnrolled ?? 0}
          </span>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-border" />

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2">

          <span className="text-sm font-semibold text-primary">
            {course.isPaid
              ? `₹${course.price ?? 0}`
              : "Free"}
          </span>

          <span
            className="
              max-w-[55%]
              truncate
              text-[11px]
              text-muted-foreground
            "
          >
            {course.authorName || "SkillHub"}
          </span>

        </div>
      </div>
    </Link>
  );
};

export default Card;