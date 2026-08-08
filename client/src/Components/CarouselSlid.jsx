export function CarouselSlid({
  image,
  title,
  description,
  slidNumber,
  totalSlids,
}) {
  const previousSlide =
    slidNumber === 1 ? totalSlids : slidNumber - 1;

  const nextSlide =
    slidNumber === totalSlids ? 1 : slidNumber + 1;

  return (
    <div
      id={`slide${slidNumber}`}
      className="
        carousel-item
        relative
        w-full
      "
    >
      <div
        className="
          flex
          w-full
          flex-col
          items-center
          justify-center
          gap-3
          px-12
          py-6
          sm:gap-4
          sm:px-[15%]
        "
      >

        <img
          src={image}
          alt={title}
          className="
            h-24
            w-24
            rounded-full
            border-2
            border-gray-400
            object-cover
            sm:h-32
            sm:w-32
          "
        />

        <p
          className="
            max-w-2xl
            text-center
            text-sm
            leading-relaxed
            text-gray-200
            sm:text-base
            md:text-xl
          "
        >
          {description}
        </p>

        <h3
          className="
            text-center
            text-lg
            font-semibold
            font-serif
            sm:text-xl
            md:text-2xl
          "
        >
          {title}
        </h3>

        {/* Navigation buttons */}

        <div
          className="
            absolute
            left-2
            right-2
            top-1/2
            flex
            -translate-y-1/2
            justify-between
            sm:left-5
            sm:right-5
          "
        >
          <a
            href={`#slide${previousSlide}`}
            className="
              btn
              btn-circle
              btn-sm
              sm:btn-md
            "
            aria-label="Previous slide"
          >
            ❮
          </a>

          <a
            href={`#slide${nextSlide}`}
            className="
              btn
              btn-circle
              btn-sm
              sm:btn-md
            "
            aria-label="Next slide"
          >
            ❯
          </a>
        </div>

      </div>
    </div>
  );
}