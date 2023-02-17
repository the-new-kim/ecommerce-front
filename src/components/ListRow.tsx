import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

interface IListRow {
  title: string;
  text: string;
  link?: {
    to: string;
    text: string;
  };
  className?: string;
}

export default function ListRow({
  title,
  text,
  link,
  className = "",
}: IListRow) {
  return (
    <div className={className}>
      <small className="flex justify-start items-center">
        {/* {fields && fields.map((text) => <div key={uuidv4()}>{text}</div>)} */}
        <div className="mr-3 min-w-fit text-gray-700">{title}</div>
        <div>{text}</div>
      </small>
      {link && (
        <Link to={link.to}>
          <small>{link.text}</small>
        </Link>
      )}
    </div>
  );
}
