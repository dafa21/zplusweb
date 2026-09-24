import { BASE_URL } from "@/lib/axios";
import React from "react";
import SocialFooter from "./SocialFooter";

const getIdentity = async () => {
  const response = await fetch(`${BASE_URL}/api/web/about-us/identity`, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data.data;
};

const getSocials = async () => {
  const response = await fetch(`${BASE_URL}/api/web/about-us/socials`, {
    cache: "no-cache",
  });
  const data = await response.json();
  return data.data;
};

export default async function Footer() {
  const [identity, socials] = await Promise.all([getIdentity(), getSocials()]);

  return (
    <footer>
      <div className="max-w-5xl mx-auto border-t grid md:grid-cols-[3fr_2fr] gap-8 lg:px-0 p-4 border-slate-300  text-gray-900">
        <div className="space-y-4">
          <img
            src={identity.logo}
            alt={identity.name}
            className="w-28 h-auto"
          />
          <p className="text-slate-800 text-sm max-w-sm">
            {identity.description}
          </p>
          <SocialFooter socials={socials} />
        </div>
        <div className="space-y-3">
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Alamat Kantor</h5>
            <p className="text-slate-800 text-sm mr-12">{identity.address}</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Telepon</h5>
            <p className="text-slate-800 text-sm">{identity.phone_number}</p>
          </div>
          <div className="space-y-2">
            <h5 className="text-sm font-medium">Email</h5>
            <p className="text-slate-800 text-sm">{identity.email}</p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto border-t lg:px-0 p-4 border-slate-300 text-gray-900">
        <p className="text-center lg:text-left text-sm">
          &copy; {new Date().getFullYear()} {identity.name} | All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
