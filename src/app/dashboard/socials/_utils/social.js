export const socialsType = [
  {
    value: "whatsapp",
    label: "Whats App",
  },
  {
    value: "youtube",
    label: "Youtube",
  },
  {
    value: "instagram",
    label: "Instagram",
  },
  {
    value: "twitter",
    label: "Twitter",
  },
  {
    value: "facebook",
    label: "Facebook",
  },
];

export const getSocialType = (type) => {
  return socialsType.find((social) => social.value === type);
};
