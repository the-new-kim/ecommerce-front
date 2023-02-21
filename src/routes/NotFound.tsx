import { ArrowRight } from "phosphor-react";
import { Link } from "react-router-dom";
import Heading from "../components/elements/typos/Heading";

export default function NotFound() {
  return (
    <div className="p-5 w-full min-h-screen flex flex-col justify-center items-center">
      <Heading className="mb-3" tagName="h1">
        404
      </Heading>
      <Heading className="mb-5" tagName="h2">
        PAGE NOT FOUND
      </Heading>
      <Link to="/" className="flex justify-center items-center">
        go to home <ArrowRight />
      </Link>
    </div>
  );
}
