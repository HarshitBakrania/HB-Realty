import { HomeIcon, MailIcon, PhoneIcon, MapPin } from "./icons/icons";
import InstagramLogo from "./icons/instagram.png";
import FacebookLogo from "./icons/facebook.png";
import TwitterLogo from "./icons/twitter.png";
import YoutubeLogo from "./icons/youtube.png";
import WhatsappLogo from "./icons/whatsapp.png";

export default function Footer() {
  return (
    <div className="bg-gray-200 max-w-full">
      {/* Main grid — 1 col on mobile, 2 col on sm, 4 col on lg */}
      <div className="px-8 py-10 sm:py-14 lg:py-20 xl:py-28 lg:px-32 xl:px-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
        {/* Contact */}
        <div className="space-y-3">
          <span className="text-xl sm:text-2xl font-semibold block">Contact Us</span>
          <div className="flex gap-3 items-center text-sm sm:text-base">
            <HomeIcon />
            <div>HB Realty</div>
          </div>
          <div className="flex gap-3 items-center text-sm sm:text-base">
            <PhoneIcon />
            <div>+1 (555) 555-5555</div>
          </div>
          <div className="flex gap-3 items-center text-sm sm:text-base">
            <MailIcon />
            <div>info@hbrealty.com</div>
          </div>
          <div className="flex gap-3 items-start text-sm sm:text-base">
            <MapPin className="mt-0.5 flex-shrink-0" />
            <div>123 Main St, San Francisco, CA 94105</div>
          </div>
        </div>

        {/* Listings */}
        <div className="space-y-3">
          <span className="text-xl sm:text-2xl font-semibold block">Listings</span>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Browse Listings</div>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Buy a property</div>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Rent a property</div>
        </div>

        {/* Community */}
        <div className="space-y-3">
          <span className="text-xl sm:text-2xl font-semibold block">Community</span>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Customer Reviews</div>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Events</div>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">FAQs</div>
        </div>

        {/* About */}
        <div className="space-y-3">
          <span className="text-xl sm:text-2xl font-semibold block">About</span>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Careers</div>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Help &amp; Support</div>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Privacy Policy</div>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Cookie Policy</div>
          <div className="text-sm sm:text-base text-gray-700 hover:text-gray-900 cursor-pointer transition-colors">Terms of Service</div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-400 mx-6 lg:mx-32 xl:mx-40 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xl sm:text-2xl lg:text-3xl font-semibold">HB Realty</div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <img src={InstagramLogo} className="size-8 sm:size-9 lg:size-10 hover:opacity-70 transition-opacity cursor-pointer" alt="Instagram" />
            <img src={FacebookLogo} className="size-8 sm:size-9 lg:size-10 hover:opacity-70 transition-opacity cursor-pointer" alt="Facebook" />
            <img src={YoutubeLogo} className="size-8 sm:size-9 lg:size-10 hover:opacity-70 transition-opacity cursor-pointer" alt="YouTube" />
            <img src={TwitterLogo} className="size-8 sm:size-9 lg:size-10 hover:opacity-70 transition-opacity cursor-pointer" alt="Twitter" />
            <img src={WhatsappLogo} className="size-8 sm:size-9 lg:size-10 hover:opacity-70 transition-opacity cursor-pointer" alt="WhatsApp" />
          </div>
        </div>
        <div className="text-xs sm:text-sm text-gray-500 mt-2">
          © 2025 HB Realty. All rights reserved.
        </div>
      </div>
    </div>
  );
}
