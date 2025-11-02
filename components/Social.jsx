import Link from "next/link";

import { FaGithub, FaLinkedinIn, FaYoutube, FaTwitter } from "react-icons/fa";

const socials = [
  {icon: <FaGithub />, path: "https://github.com/OmarElati"},
  {icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/omar-elati/"},
  {icon: <FaYoutube />, path: "https://www.youtube.com/@ElatiOmar"},
  {icon: <FaTwitter />, path: "https://x.com/Elati_Omar"},
]
const Social = ({containerStyles, iconStyles}) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        )
      })}
    </div>
  )
}

export default Social;
