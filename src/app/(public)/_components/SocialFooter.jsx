import React from "react";

const SocialIcon = ({ social }) => {
  const SOCIAL = {
    facebook: "/web/facebook.svg",
    instagram: "/web/instagram.svg",
    twitter: "/web/twitter.svg",
    youtube: "/web/youtube.svg",
    whatsapp: "/web/whatsapp.svg",
  };

  return (
    <div>
      <a href={social.link} target="_blank" rel="noopener noreferrer">
        <img
          src={SOCIAL[social.type]}
          alt={social.type}
          className="w-6 h-6 text-primary-cyan"
        />
      </a>
    </div>
  );
};

export default function SocialFooter({ socials }) {
  return (
    <div className="flex gap-4 items-center">
      {socials.map((social) => (
        <SocialIcon key={social.id} social={social} />
      ))}
    </div>
  );
}
