
export function CarouselSlid({image, title, description, slidNumber, totalSlids}) {
    return(
        <div id={`slide${slidNumber}`} className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img src={image} className=" w-40 rounded-full border-2 border-gray-400"/>
              <p className="text-xl text-gray-200">{description}</p>
              <h3 className="text-2xl font-semibold font-serif">{title}</h3>
              <div className=" absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${(slidNumber === 1 ? totalSlids : (slidNumber - 1))}`} className="btn btn-circle">❮</a>
                <a href={`#slide${(slidNumber) % totalSlids + 1}`} className="btn btn-circle">❯</a>
              </div>
            </div>
          </div>
    )
}
{/* {"“Determination is the power that sees us through all our frustrations and obstacles. It helps us in building our willpower which is the very basis of success.”"} */}