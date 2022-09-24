import Link from "next/link";
import React from "react";

function Sign_in() {
    return (
        <div>
            <button>
                <Link href={'../register'}>
                    Sign In
                </Link>
            </button>
            or... Already have an account?
            <button>
                <Link href={'../log_in_page'}>
                    Log In
                </Link>
            </button>
        </div>
    )
}

export default Sign_in