import { HomeIcon, MailIcon, PhoneIcon, MapPin } from "./icons/icons";
import InstagramLogo from "./icons/instagram.png";
import FacebookLogo from "./icons/facebook.png";
import TwitterLogo from "./icons/twitter.png";
import YoutubeLogo from "./icons/youtube.png";
import WhatsappLogo from "./icons/whatsapp.png";

export default function Footer() {
  return (
    <div className="bg-gray-200">
      <div className="py-32 px-40 grid grid-cols-4 justify-center">
        <div className="flex flex-col text-2xl space-y-4">
          <div className="flex gap-3">
            <HomeIcon />
            <div>HB Realty</div>
          </div>
          <div className="flex gap-3">
            <PhoneIcon />
            <div>+1(555) 555-555 </div>
          </div>
          <div className="flex gap-3">
            <MailIcon />
            <div>info@hbrealty.com</div>
          </div>
          <div className="flex gap-3">
            <MapPin />
            <div>123 Main St, San Francisco, CA 94105</div>
          </div>
        </div>
        <div className="text-2xl space-y-4">
          <div className="text-3xl font-semibold">Listings</div>
          <div>Browse Listings</div>
          <div>Buy a property</div>
          <div>Rent a property</div>
        </div>
        <div className="text-2xl space-y-4">
          <div className="text-3xl font-semibold">Community</div>
          <div>Customer Reviews</div>
          <div>Events</div>
          <div>FAQs</div>
        </div>
        <div className="text-2xl space-y-4">
          <div className="text-3xl font-semibold">About</div>
          <div>Careers</div>
          <div>Help & Support</div>
          <div>Privacy Policy</div>
          <div>Cookie Policy</div>
          <div>Terms of Service</div>
        </div>
      </div>
      <div className="border-t border-slate-600 mx-40 py-10 flex justify-between">
        <div className="flex flex-row px-2">
          <div className="text-4xl font-semibold">HB Realty</div>
          <div className="px-4 py-3">
            © Copyright HB Reality. All rights reserved. 2024
          </div>
        </div>
        <div className="flex gap-4 px-2">
          <img src={InstagramLogo} className="size-12" />
          <img src={FacebookLogo} className="size-10" />
          <img src={YoutubeLogo} className="size-10" />
          <img src={TwitterLogo} className="size-10" />
          <img src={WhatsappLogo} className="size-10" />
        </div>
      </div>
    </div>
  );
}
