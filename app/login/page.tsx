import React from "react";
import LoginPage from "@/app/login/pages/LoginPage";
import LoginTopMenuPage from "@/app/topMenu/pages/loginTopMenuPage";

export default async function Page() {

    return (
        <div>
            <LoginTopMenuPage/>
            <LoginPage/>
        </div>
    )
}
