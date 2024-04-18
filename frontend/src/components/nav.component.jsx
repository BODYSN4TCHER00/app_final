import { Link } from "react-router-dom";

export default function NavBar({ api_name, api_uri, children }) {
  return (
    <div className="bg-blue-800 w-full flex items-center flex-row justify-between h-10">
      <h4 className="ml-5 font-bold tracking-widest">MENU API</h4>
      <div className="mr-5">
        <Link
          to={api_uri}
          className="mr-5 border p-1 rounded-lg hover:bg-red-500"
        >
          IR A {api_name.toUpperCase()}
        </Link>
        {children}
      </div>
    </div>
  );
}
