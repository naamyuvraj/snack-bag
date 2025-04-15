import React from "react";
import Footer from "../pages/footer";
import { FaInstagram, FaLinkedin } from "react-icons/fa";

export default function AboutUs() {
  const team = [
    {
      name: "Yuvraj",
      role: "Co-Founder & Full-Stack Developer",
      img: "/team/yuvraj.jpg",
      instagram: "https://www.instagram.com/naam.yuvraj/",
      linkedin: "https://www.linkedin.com/in/yuvraj-mandal-b4ab85325/",
    },
    {
      name: "Sumit Nayak",
      role: "Co-Founder & Full-Stack Developer",
      img: "/team/sumit.jpg",
      instagram: "https://www.instagram.com/sum_it.2006/",
      linkedin: "https://www.linkedin.com/in/sumitnayak2006/",
    },
    {
      name: "Dev Kumar Singh",
      role: "Marketing",
      img: "/team/dev.jpg",
      instagram: "https://www.instagram.com/dev_singh.invincible/",
      linkedin: "https://www.linkedin.com/in/dev-kumar-singh-1451aa270/",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-[#050505] to-[#3c3c3c] pt-7 w-full min-h-screen"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h1 className="text-center text-2xl text-[#238b45] font-semibold mt-10">
        About Us
      </h1>
      <hr className="border-1 border-[#238b45] mx-auto mt-3 w-1/2" />

      <div className="text-[#ECD9BA] text-lg mt-6 mx-10 space-y-4 max-w-4xl mx-4">
        <p>
          Welcome to <span className="text-[#238b45]">SnackBag</span>, your
          go-to destination for delicious snacks and beverages!
        </p>
        <p>
          We are dedicated to providing you with the best quality products and
          an exceptional shopping experience.
        </p>
      </div>

      <h2 className="text-center text-xl text-[#238b45] font-semibold mt-12">
        Our Team
      </h2>
      <p className="text-center text-[#ECD9BA] mt-2 mb-6">
        Meet the passionate individuals behind SnackBag
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 mb-10">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-[#1e1e1e] rounded-2xl shadow-lg p-4 text-center text-[#ECD9BA]"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-40 h-40 mx-auto rounded-full object-cover mb-4 border-4 border-[#238b45]"
            />
            <h3 className="text-xl text-[#238b45] font-semibold">
              {member.name}
            </h3>
            <p className="text-sm mt-1">{member.role}</p>
            <div className="flex justify-center gap-4 mt-3">
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-[#ECD9BA] hover:text-[#238b45] text-xl" />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-[#ECD9BA] hover:text-[#238b45] text-xl" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
