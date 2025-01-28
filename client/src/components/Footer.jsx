import { HomeIcon, MailIcon, PhoneIcon, MapPin } from "./icons/icons";
import InstagramLogo from "./icons/instagram.png";
import FacebookLogo from "./icons/facebook.png";
import TwitterLogo from "./icons/twitter.png";
import YoutubeLogo from "./icons/youtube.png";
import WhatsappLogo from "./icons/whatsapp.png";

export default function Footer() {
  return (
    <div className="bg-gray-200 max-w-full">
      <div className="p-8 space-y-8 md:space-y-10 lg:py-32 lg:px-40 lg:grid lg:grid-cols-4 lg:justify-center lg:space-y-0">
        <div className="md:text-xl lg:text-2xl space-y-1 md:space-y-3 lg:space-y-4 max-w-fit">
          <span className="text-2xl md:text-2xl lg:text-3xl font-semibold">
            Contact Us
          </span>
          <div className="flex gap-3 items-center">
            <HomeIcon />
            <div>HB Realty</div>
          </div>
          <div className="flex gap-3 items-center">
            <PhoneIcon />
            <div>+1(555) 555-555 </div>
          </div>
          <div className="flex gap-3 items-center">
            <MailIcon />
            <div>info@hbrealty.com</div>
          </div>
          <div className="flex gap-3 items-center">
            <MapPin />
            <div>123 Main St, San Francisco, CA 94105</div>
          </div>
        </div>
        <div className="md:text-xl lg:text-2xl space-y-1 md:space-y-3 lg:space-y-4">
          <span className="text-2xl md:text-2xl lg:text-3xl font-semibold">
            Listings
          </span>
          <div>Browse Listings</div>
          <div>Buy a property</div>
          <div>Rent a property</div>
        </div>
        <div className="md:text-xl lg:text-2xl space-y-1 md:space-y-3 lg:space-y-4">
          <div className="text-2xl md:text-2xl lg:text-3xl font-semibold">
            Community
          </div>
          <div>Customer Reviews</div>
          <div>Events</div>
          <div>FAQs</div>
        </div>
        <div className="md:text-xl lg:text-2xl space-y-1 md:space-y-3 lg:space-y-4">
          <div className="text-2xl md:text-2xl lg:text-3xl font-semibold">
            About
          </div>
          <div>Careers</div>
          <div>Help & Support</div>
          <div>Privacy Policy</div>
          <div>Cookie Policy</div>
          <div>Terms of Service</div>
        </div>
      </div>
      <div className="border-t border-slate-600 mx-6 lg:mx-32 py-4 lg:py-10 max-w-full ">
        <div className="px-1 md:px-3 lg:px-6">
          <div className="flex justify-between">
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
              HB Realty
            </div>
            <div className="flex py-1 space-x-1 md:space-x-2 lg:space-x-4">
              <img src={InstagramLogo} className="size-9 lg:size-12" />
              <img src={FacebookLogo} className="size-8 lg:size-10" />
              <img src={YoutubeLogo} className="size-8 lg:size-10" />
              <img src={TwitterLogo} className="size-8 lg:size-10" />
              <img src={WhatsappLogo} className="size-8 lg:size-10" />
            </div>
          </div>
          <div className="text-sm md:text-base">
            © Copyright HB Reality. All rights reserved. 2025
          </div>
        </div>
      </div>
    </div>
  );
}
