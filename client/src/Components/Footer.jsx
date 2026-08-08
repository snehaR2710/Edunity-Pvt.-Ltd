import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";

function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  return (
    <footer
      className="
        flex
        min-h-[120px]
        w-full
        flex-col
        items-center
        justify-center
        gap-4
        bg-gray-800
        px-5
        py-6
        text-white
        sm:min-h-[100px]
        sm:flex-row
        sm:justify-between
        sm:px-8
        md:px-16
        lg:px-20
      "
    >
      <section className="text-center text-sm sm:text-base md:text-lg">
        Copyright {year} | All rights reserved
      </section>

      <section
        className="
          flex
          items-center
          justify-center
          gap-5
          text-xl
          sm:text-2xl
        "
      >
        <a
          href="#"
          aria-label="Facebook"
          className="transition-all duration-300 hover:text-yellow-500"
        >
          <BsFacebook />
        </a>

        <a
          href="#"
          aria-label="Instagram"
          className="transition-all duration-300 hover:text-yellow-500"
        >
          <BsInstagram />
        </a>

        <a
          href="#"
          aria-label="LinkedIn"
          className="transition-all duration-300 hover:text-yellow-500"
        >
          <BsLinkedin />
        </a>

        <a
          href="#"
          aria-label="Twitter"
          className="transition-all duration-300 hover:text-yellow-500"
        >
          <BsTwitter />
        </a>
      </section>
    </footer>
  );
}

export default Footer;