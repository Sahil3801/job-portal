import {
  IconAnchor,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTelegram,
  IconBrandX,
  IconBrandYoutube,
  IconBriefcaseFilled,
} from "@tabler/icons-react";
import { footerLinks } from "../../Data/Data";
import { useLocation } from "react-router-dom";
import { Divider } from "@mantine/core";

const Footer = () => {
  const location = useLocation();

  return location.pathname !== "/signup" && location.pathname !== "/login" ? (
    <div className="flex flex-col">
      <div className="pt-20 pb-5 bg-white-50 p-4 flex gap-8 justify-around flex-wrap">
        {footerLinks.map((item, index) => (
          <div key={index}>
            <div className="text-lg font-semibold mb-4 text-white-800">
              {item.title}
            </div>
            {item.links.map((link, index) => (
              <div
                key={index}
                className="text-white-300 text-sm hover:text-white-50 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out"
              >
                {link}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Divider />
      <div className="bg-white-50 font-medium text-center text-white-950 p-5">
        - Designed by Sahil.S.Shinde -
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Footer;
