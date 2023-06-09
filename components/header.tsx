import NavLink from "@/components/nav-link";

export default function Header() {
  const noActiveClassName = "opacity-50 hover:opacity-100";
  return (
    <header className="text-center mb-3">
      <h1 className="text-[2.25rem] font-bold pb-2">vincenteof.eth</h1>
      <nav className="max-w-2xl mx-auto">
        <ul className="w-full flex justify-center">
          <li className="px-2 py-1">
            <NavLink
              href="/"
              noActiveClassName={noActiveClassName}
              exact
            >
              Home
            </NavLink>
          </li>
          <li className="px-2 py-1">
            <NavLink
              href="/about"
              noActiveClassName={noActiveClassName}
            >
              About
            </NavLink>
          </li>
          <li className="px-2 py-1">
            <NavLink
              href="/posts"
              noActiveClassName={noActiveClassName}
            >
              Posts
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
