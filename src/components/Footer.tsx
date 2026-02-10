import Link from "next/link";
import Image from "next/image";

// Social icons
import facebook from "@/assets/social_logo/Facebook_logo.png";
import instagram from "@/assets/social_logo/Instagram_icon.png";
import twitter from "@/assets/social_logo/x_logo.png";

export default function Footer() {
  return (
    <footer className="mt-10 bg-gray-200 text-black">
      {/* ---------- TOP ---------- */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* BRAND */}
        <div className="text-center md:text-left">
          <Image
            src="/vasudhev_tree2.png"
            alt="Vasudhev Hindi News Logo"
            width={180}
            height={80}
            className="mx-auto md:mx-0"
            priority
          />

          <p className="mt-3 text-sm leading-relaxed">
            Vasudhev Hindi News पर पढ़ें देश, दुनिया, राजनीति, बिज़नेस,
            टेक्नोलॉजी, हेल्थ और राशिफल की भरोसेमंद खबरें।
          </p>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold mb-3">श्रेणियाँ</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/category/भारत">देश</Link></li>
            <li><Link href="/category/एजुकेशन">एजुकेशन</Link></li>
            <li><Link href="/category/ऑटोमोबाईल">ऑटोमोबाईल</Link></li>
            <li><Link href="/category/टेक्नोलॉजी">टेक्नोलॉजी</Link></li>
            <li><Link href="/category/हेल्थ">हेल्थ</Link></li>
          </ul>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-3">महत्वपूर्ण लिंक</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
            <li><Link href="/disclaimer">Disclaimer</Link></li>
          </ul>
        </div>

        {/* FOLLOW US */}
        <div>
          <h3 className="font-semibold mb-3">Follow Us</h3>

          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/profile.php?id=61587678968828"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <Image src={facebook} alt="Facebook" width={28} height={28} />
            </a>

            <a
              href="https://www.instagram.com/vasudhevnews24/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Image src={instagram} alt="Instagram" width={28} height={28} />
            </a>

            <a
              href="https://x.com/vasudhevnews24"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <Image src={twitter} alt="X Twitter" width={28} height={28} />
            </a>

            {/*
            <a
              href="https://www.youtube.com/@vasudhevnews"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <Image src={youtube} alt="YouTube" width={28} height={28} />
            </a>
            */}
          </div>
        </div>
      </div>

      {/* ---------- BOTTOM ---------- */}
      <div className="border-t border-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-center">
          © {new Date().getFullYear()} Vasudhev Hindi News. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
