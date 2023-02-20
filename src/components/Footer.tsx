import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
} from "phosphor-react";

export default function Footer() {
  return (
    <footer className="p-5 bg-black text-white flex flex-col">
      <div className="flex justify-center items-center text-2xl [&>*]:mx-1 [&>*]:cursor-pointer mb-5">
        <FacebookLogo />
        <InstagramLogo />
        <TwitterLogo />
        <YoutubeLogo />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center [&>*]:mx-2 mb-5 md:mb-2 [&>*]:cursor-pointer">
        <span>Newsletter signup</span>
        <span>About</span>
        <span>Custom care</span>
        <span>Retailer</span>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center [&>*]:mx-3 text-sm [&>*]:cursor-pointer font-thin">
        <span>Terms</span>
        <span>Cookies</span>
        <span>Cookie Preferences</span>
        <span>Privacy policy</span>
        <span>&copy; {new Date().getFullYear()} Toy shop</span>
        <span>Made by KIM 😎</span>
      </div>
    </footer>
  );
}
