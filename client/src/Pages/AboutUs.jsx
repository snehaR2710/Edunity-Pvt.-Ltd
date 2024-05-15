import aboutus from "../Assets/images/aboutMainImage.png";
import { CarouselSlid } from "../Components/CarouselSlid";
import { celebrities } from "../Constants/CelebirityData";
import HomeLayout from "../Layouts/HomeLayout";

export function AboutUs() {
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        <div className=" flex items-center gap-5 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className="text-5xl font-serif text-yellow-500 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their creativity, skills and knowledge to each
              other to empower and contribute in the growth and wellness of the
              mankind.
            </p>
          </section>

          <div className="w-1/2">
            <img
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0, 0, 0))",
              }}
              className="drop-shadow-2xl"
              src={aboutus}
              alt="About us image"
            />
          </div>
        </div>

        <div className="carousel w-1/2 my-16 m-auto">
          {celebrities &&
            celebrities.map((celebrity) => (
              <CarouselSlid
                {...celebrity}
                key={celebrity.slidNumber}
                totalSlids={celebrities.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
}
