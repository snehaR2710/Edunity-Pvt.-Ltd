import aboutus from "../Assets/images/aboutMainImage.png";
import { CarouselSlid } from "../Components/CarouselSlid";
import { celebrities } from "../Constants/CelebirityData";
import HomeLayout from "../Layouts/HomeLayout";

export function AboutUs() {
  return (
    <HomeLayout>
      <div className="min-h-[90vh] w-full px-4 py-12 text-white sm:px-8 md:px-12 lg:px-20">

        {/* ================= ABOUT SECTION ================= */}

        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 lg:flex-row lg:gap-16">

          {/* LEFT CONTENT */}

          <section className="w-full space-y-6 text-center lg:w-1/2 lg:text-left">

            <h1 className="text-3xl font-semibold text-yellow-500 sm:text-4xl md:text-5xl">
              Affordable and Quality Education
            </h1>

            <p className="text-base leading-7 text-gray-200 sm:text-lg md:text-xl">
              Our goal is to provide affordable and quality education to the
              world. We are providing a platform for aspiring teachers and
              students to share their creativity, skills and knowledge with
              each other to empower and contribute to the growth and wellness
              of mankind.
            </p>

          </section>

          {/* RIGHT IMAGE */}

          <div className="flex w-full justify-center lg:w-1/2">

            <img
              src={aboutus}
              alt="About us"
              className="
                h-auto
                w-full
                max-w-md
                object-contain
                drop-shadow-2xl
                md:max-w-lg
              "
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))",
              }}
            />

          </div>

        </div>

        {/* ================= CAROUSEL ================= */}

        <div className="mx-auto my-12 w-full max-w-4xl px-2 sm:my-16 sm:px-6">

          <div className="carousel w-full">

            {celebrities?.map((celebrity) => (
              <CarouselSlid
                {...celebrity}
                key={celebrity.slidNumber}
                totalSlids={celebrities.length}
              />
            ))}

          </div>

        </div>

      </div>
    </HomeLayout>
  );
}