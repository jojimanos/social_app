import React from "react";
import Link from "next/link";

function Navbar() {
    return (
        <div className="grid grid-cols">
            <button>
                <Link href={'/'}>
                    <p>Home</p>
                </Link>
            </button>
            <button>Notifications</button>
            <button>Messages</button>
        </div>
    )
}

export default Navbar