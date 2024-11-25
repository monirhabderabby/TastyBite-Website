import { TStaff } from "@/types";
import { Facebook, Linkedin, Youtube, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ChefCard({ chef: teamMember }: { chef: TStaff }) {
  return (
    <div className="relative m-10  group p-4 group">
      <div className="relative">
        {/* Rotating border */}
        <div
          className={`absolute inset-0 -top-[25px] max-w-[400px] left-[40px] -right-[25px] bottom-[120px] border-2 border-dotted border-[#008148] rounded-lg transition-transform duration-500 ease-in-out group-hover:rotate-[-2deg]`}
        ></div>

        {/* Content container */}
        <div className="relative z-10  rounded-lg overflow-hidden">
          <Image
            src={teamMember.image}
            alt={teamMember.name}
            width={400}
            height={500}
            className="object-cover rounded-2xl h-[450px]"
          />

          {/* Social Media Sidebar */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 transform transition-all duration-300 scale-0 group-hover:scale-125`}
          >
            <div className="relative">
              <div className="bg-[#008148] w-14 py-4 relative">
                {/* Arrow shape */}
                <div className="absolute top-0 -right-4 h-full w-4 overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-4 bg-[#008148] transform rotate-45 origin-left"></div>
                </div>

                {/* Social media icons */}
                <div className="flex flex-col items-center gap-6 relative z-10">
                  {teamMember.facebookLink && (
                    <Link
                      href={teamMember.facebookLink || "#"}
                      className="text-white hover:opacity-80"
                    >
                      <Facebook size={24} />
                    </Link>
                  )}
                  {teamMember.linkedinLink && (
                    <Link
                      href={teamMember.linkedinLink || "#"}
                      className="text-white hover:opacity-80"
                    >
                      <Linkedin size={24} />
                    </Link>
                  )}
                  {teamMember.youtubeLink && (
                    <Link
                      href={teamMember.youtubeLink || "#"}
                      className="text-white hover:opacity-80"
                    >
                      <Youtube size={24} />
                    </Link>
                  )}
                  {teamMember.instagramLink && (
                    <Link
                      href={teamMember.instagramLink || "#"}
                      className="text-white hover:opacity-80"
                    >
                      <Instagram size={24} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Member Info */}
          <div className="text-center p-4">
            <p className="text-[#008148] text-xl font-semibold">
              {teamMember.designation}
            </p>
            <Link href={`/chefs/${teamMember._id}`}>
              <h3 className="text-3xl hover:text-[#008148] text-black font-bold mt-1">
                {teamMember.name}
              </h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
