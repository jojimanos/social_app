import Link from "next/link";
import React from "react";
import { isAuth, logOut } from "../../helpers/auth"

function Sign_in() {

    return (
        <div>
            {!isAuth() && (
                <div>
                    <button>
                        <Link href={'../register'}>
                            Sign In
                        </Link>
                    </button>
                    or... Already have an account?
                    <button>
                        <Link href={'../login'}>
                            Log In
                        </Link>
                    </button>
                </div>
            )}

            {isAuth() && isAuth().role == 'admin' && (
                <button>
                    <Link href={'../admin'}>
                        <p>
                            {isAuth().firstName}
                        </p>
                    </Link>
                </button>
            )}

            {isAuth() && isAuth().role == 'subscriber' && (
                <button>
                    <Link href={'../user'}>
                        <p>
                        {isAuth().firstName}
                        </p>
                    </Link>
                </button>
            )}

            {isAuth() && (
                <button onClick={logOut}>
                    Log Out
                </button>
            )}
        </div>
    )
}

export default Sign_in