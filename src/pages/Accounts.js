import React, { useEffect, useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import Datepicker from '../partials/actions/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import { useQuery } from '@apollo/client';
import _ from "lodash"
import { ALL_ACCOUNTS } from '../graphql/queries';


// Import utilities
import { tailwindConfig } from '../utils/Utils';

function Accounts() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [startDate, setStartDate] = useState("2021-09-09T00:00:00.000Z");
    const [endDate, setEndDate] = useState("2021-09-16T08:49:43.991Z");

    const [allAccounts, setAllAccounts] = useState([])
    const [noAccounts, setNoAccounts] = useState(0)
    const [noCheques, setNoCheques] = useState(0)
    const [noSavings, setNoSavings] = useState(0)


    // fetch all acounts data from the graphql server for the first 7days
    const { loading, error, data } = useQuery(ALL_ACCOUNTS, {
        variables: {
            // fetch the first 7 days data
            filter: { created_at_gte: startDate, created_at_lt: endDate }
        }
    })

    // handles all data selection
    const dateFilterHandler = (instance, selectedDates) => {
        if (selectedDates[0] && selectedDates[1]) {
            setStartDate(selectedDates[0])
            setEndDate(selectedDates[1])
        }
    }

    // generate bar chart parameters
    const generateBarParams = async (data) => {

        let chartLabels = [];
        let chartData = [];
        let chartMap = {}
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        data.forEach((obj, index) => {

            let chartMapKey = new Date(obj.created_at).toDateString()
            if (chartMap[chartMapKey]) {
                // push 
                chartMap[chartMapKey] += 1

            } else {
                // create and push
                chartMap[chartMapKey] = 1
            }
        })

        // pupulate the
        for (const key in chartMap) {
            if (chartMap.hasOwnProperty.call(chartMap, key)) {
                let dateKey = new Date(key);
                chartLabels.push(`${dateKey.getDay()}-${months[dateKey.getMonth()]}`); // 08-Mar
                chartData.push(chartMap[key])
            }
        }

        return {
            labels: chartLabels,
            datasets: [
                // Light blue bars
                {
                    label: "",
                    data: chartData,
                    backgroundColor: tailwindConfig().theme.colors.blue[400],
                    hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
                }
            ],
        };

    }




    useEffect(() => {
        if (data) {
            setAllAccounts(data.allAccounts)
            setNoAccounts(data.allAccounts.length)
            setNoCheques(_.filter(data.allAccounts, { type: "cheque" }).length)
            setNoSavings(_.filter(data.allAccounts, { type: "savings" }).length)
        };
    }, [data])

    return (<>{loading ? <div className="jumbotron text-center align-center justify-center"><h1>Loading...</h1></div> : <div className="flex h-screen overflow-hidden">

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

                    {/* Dashboard actions */}
                    <div className="sm:flex sm:justify-between sm:items-center mb-8">

                        {/* Left: Avatars */}
                        {/* <DashboardAvatars /> */}

                        {/* Right: Actions */}
                        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">

                            {/* Datepicker built with ant design flatpickr */}
                            <Datepicker className="flow-right" dateFilter={dateFilterHandler} startDate={startDate} endDate={endDate} />
                            {/* Add view button */}
                            {/* < button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
                                <svg className="w-4 h-4 fill-current opacity-50 flex-shrink-0" viewBox="0 0 16 16">
                                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                </svg>
                                <span className="hidden xs:block ml-2">Add view</span>
                            </button> */}
                        </div>

                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-12 gap-6">

                        {/* No of Accounts, Savings and Cheques */}
                        <DashboardCard01 displayHeader={`All Accounts`} displayLowerHeader={`${new Date(startDate).toDateString()} to ${new Date(endDate).toDateString()}`} displayTotal={noAccounts} subDisplayText={`${noCheques} cheque  & ${noSavings} Savings Accounts`} />
                        {/* Bar chart (Direct vs Indirect) */}
                        <DashboardCard04 data={allAccounts} chartData={generateBarParams(allAccounts)} displyHeader="No of Account / Day-Month" />
                        {/* Table (Top Channels) */}
                        <DashboardCard07 data={allAccounts} />
                    </div>
                </div>
            </main>
        </div>
    </div>}</>);
}

export default Accounts;