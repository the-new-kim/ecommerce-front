import { Link } from "react-router-dom";

interface ICreateButtonProps {
  href: string;
  text: string;
}

export default function CreateButton({ href, text }: ICreateButtonProps) {
  return (
    <Link to={href} className="px-3 py-2 bg-blue-400 rounded-lg shadow-lg">
      {text}
    </Link>
  );
}
