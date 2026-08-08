import { useNavigate } from "react-router-dom";

export function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate("/course/description", {
          state: { ...data },
        })
      }
      className="
        group
        w-full
        max-w-[22rem]
        cursor-pointer
        overflow-hidden
        rounded-lg
        bg-zinc-700
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-300
            ease-in-out
            group-hover:scale-110
          "
          src={data?.thumbnail?.secure_url}
          alt={data?.title || "Course thumbnail"}
        />
      </div>

      {/* Content */}
      <div className="space-y-2 p-4">

        <h2 className="line-clamp-2 text-xl font-bold text-yellow-500">
          {data?.title}
        </h2>

        <p className="line-clamp-2 text-sm font-medium text-gray-200">
          {data?.description}
        </p>

        <p className="font-semibold">
          <span className="font-bold text-yellow-500">
            Category:
          </span>{" "}
          {data?.category}
        </p>

        <p className="font-semibold">
          <span className="font-bold text-yellow-500">
            Total lectures:
          </span>{" "}
          {data?.numberOfLectures}
        </p>

        <p className="truncate font-semibold">
          <span className="font-bold text-yellow-500">
            Instructor:
          </span>{" "}
          {data?.createdBy}
        </p>

      </div>
    </div>
  );
}