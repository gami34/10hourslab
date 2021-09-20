import React, { useEffect, useState } from "react";

import Datepicker from "../partials/actions/Datepicker";

import { useQuery } from "@apollo/client";
import { ALL_SESSIONS } from "../graphql/queries";
import SVectorMap from "../partials/dashboard/SessionVectorMap";
import { generateSessionsChartData } from "../utils/generateSessionsChartData.util";

// Import utilities
// import { tailwindConfig } from "../utils/Utils";

function Sessions() {
    const [startDate, setStartDate] = useState("2021-07-09T00:00:00.000Z"); // most recent date from the dataset
    const [endDate, setEndDate] = useState("2021-09-16T08:49:43.991Z");

    const [sessionsChartData, setSessionsChartData] = useState([]);

    // fetch all acounts data from the graphql server for the first 7days
    const { data, loading } = useQuery(ALL_SESSIONS, {
        variables: {
            // fetch the first 7 days data
            filter: { created_at_gte: startDate, created_at_lte: endDate },
            sortField: "created_at",
        },
    });

    // handles all data selection
    const dateFilterHandler = (selectedDates) => {
        // selectedDates param  is [startDate, endDate]
        if (selectedDates[0] && selectedDates[1]) {
            setStartDate(selectedDates[0]);
            setEndDate(selectedDates[1]);
        }
    };

    useEffect(() => {
        if (data?.allSessions) {
            setSessionsChartData(generateSessionsChartData(data.allSessions));
            // setAllAccounts(data.allAccounts);
        }
    }, [data]);

    return (
        <>
            {loading && !sessionsChartData.length ? (
                <div>Fetching Data ...</div>
            ) : (
                <div>
                    {/* Dashboard actions */}
                    <div className=" mb-8">
                        {/* Datepicker built with ant design flatpickr */}
                        <Datepicker dateFilterHandler={dateFilterHandler} />
                    </div>
                    {/* Session lat and Long map chart */}
                    <SVectorMap markers={sessionsChartData} fullWidth={true} label="Lat and Long Map Chart" />
                </div>
            )}
        </>
    );
}

export default Sessions;
