import React, { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import "./css/style.scss";

import { focusHandling } from "cruip-js-toolkit";

// Import pages
import Accounts from "./pages/Accounts";
import WelcomeBanner from "./partials/dashboard/WelcomeBanner";
import Header from "./partials/Header";
import Sidebar from "./partials/Sidebar";
import Transactions from "./pages/Transactions";
import Sessions from "./pages/Sessions";
import Dashboard from "./pages/Dashboard";

function App() {
    const location = useLocation();
    // const {UserOutlined, DownOutlined} = Icon;

    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        document.querySelector("html").style.scrollBehavior = "auto";
        window.scroll({ top: 0 });
        document.querySelector("html").style.scrollBehavior = "";
        focusHandling("outline");
    }, [location.pathname]); // triggered on route change

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                        {/* Welcome banner */}
                        <WelcomeBanner />

                        <Switch>
                            <Route exact path="/" component={Dashboard} />
                            <Route exact path="/accounts" component={Accounts} />
                            <Route exact path="/transactions" component={Transactions} />
                            <Route exact path="/sessions" component={Sessions} />
                        </Switch>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default App;
