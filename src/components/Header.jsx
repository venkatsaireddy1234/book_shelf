import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      Header
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
            <li>
              <Link to="/showAdmin">ShowAdmin</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
