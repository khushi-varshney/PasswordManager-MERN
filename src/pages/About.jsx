import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="flex items-center justify-center my-20">
        <div className="flex flex-col items-center justify-center gap-3 px-10 py-3">
          <h1 className="md:text-3xl text-2xl font-extrabold decoration-dotted underline p-3">&#128274; Password Pro &#128273;</h1>
          <p className="md:text-[2vw] text-[4vw] p-1 text-pink-500 font-bold">
            Secured and Easy Password Management
          </p>
          <p className="text-lg py-3 font-semibold">
            Hello, I Khushi Varshney, is very pleased to introduce the
            "Password Pro", a meticulously designed online platform
            dedicated to providing a secured password storage system with end-to-end description. This Application is specially for all of those
            people who always forget their Login Credentials. So, revolutionize your password management experience and enjoy peace of mind knowing your passwords are secured and organized. 
          </p>
          <p className="text-lg font-semibold px-20">
            Imagine a world where passwords are no long a hassale . "Password Pro " makes that a reality allows you to even edit your passwords and delete them. Take control of your digital security and safeguard your personal information.
          </p>
          <p className="md:text-[1.4vw] text-[4vw] font-extrabold py-12 text-pink-800">
            Safeguard your digital identity with 'Password Pro', A robust password manager designed to protect your sensitive information.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
