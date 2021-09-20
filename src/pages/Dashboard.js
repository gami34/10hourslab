import React, { useEffect, useState } from "react";

import Datepicker from "../partials/actions/Datepicker";
import DisplayDashCard from "../partials/dashboard/DisplayDashCard";
import TransactionsTable from "../partials/dashboard/TransactionsTable";
import AccountsTable from "../partials/dashboard/AccountsTable";
import ColumnChart from "../partials/dashboard/ColumnChart";

import { useQuery } from "@apollo/client";
import _ from "lodash";
import { ALL_TRANSACTIONS_SESSIONS_ACCOUNTS } from "../graphql/queries";
import moment from "moment";
import { generateSessionsChartData } from "../utils/generateSessionsChartData.util";
import { generateChartData } from "../utils/generateChartData.util";
import SVectorMap from "../partials/dashboard/SessionVectorMap";

function Dashboard() {
    const [startDate, setStartDate] = useState("2021-07-09T00:00:00.000Z"); // most recent date from the dataset
    const [endDate, setEndDate] = useState("2021-09-16T08:49:43.991Z");

    // ACCOUNT
    const [allAccounts, setAllAccounts] = useState([]);
    const [noAccounts, setNoAccounts] = useState(0);
    const [noCheques, setNoCheques] = useState(0);
    const [noSavings, setNoSavings] = useState(0);
    const [accountChartData, setACCOUNTChartData] = useState([]);

    //SESSIONS
    const [sessionsChartData, setSessionsChartData] = useState([]);

    // TRANSACTIONN
    const [allTransactions, setAllTransactions] = useState([]);
    const [noTransactions, setNoTransactions] = useState(0);
    const [noDebits, setNoDebits] = useState(0);
    const [noCredits, setNoCredits] = useState(0);

    // fetch all acounts data from the graphql server for the first 7days
    const { data, loading } = useQuery(ALL_TRANSACTIONS_SESSIONS_ACCOUNTS, {
        variables: {
            // fetch the first 7 days data
            filter1: { created_at_gte: startDate, created_at_lte: endDate },
            filter2: { created_at_gte: startDate, created_at_lte: endDate },
            filter3: { created_at_gte: startDate, created_at_lte: endDate },
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

    // check if there is data available
    useEffect(() => {
        if (data) {
            // Trnsactions
            // generate credit vs day/Month
            // generate transaction vs Branch data
            setAllTransactions(data.allTransactions);
            setNoTransactions(data.allTransactions.length);
            setNoDebits(_.filter(data.allTransactions, { type: "debit" }).length);
            setNoCredits(_.filter(data.allTransactions, { type: "credit" }).length);

            // Sessions
            setSessionsChartData(generateSessionsChartData(data.allSessions));
            // setAllAccounts(data.allAccounts);

            // Accounts
            setACCOUNTChartData(generateChartData(data.allAccounts));
            setAllAccounts(data.allAccounts);
            setNoAccounts(data.allAccounts.length);
            setNoCheques(_.filter(data.allAccounts, { type: "cheque" }).length);
            setNoSavings(_.filter(data.allAccounts, { type: "savings" }).length);
        }
    }, [data]);

    console.log(data, "within dashbard");

    return (
        <>
            {loading ? (
                <div>Fetching Data ...</div>
            ) : (
                <>
                    {/* Dashboard actions */}
                    <div className=" mb-8">
                        {/* Datepicker built with ant design flatpickr */}
                        <Datepicker dateFilterHandler={dateFilterHandler} />
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-12 gap-6">
                        {/* No of Accounts, Savings and Cheques */}
                        <DisplayDashCard
                            displayHeader={"Accounts"}
                            displayLowerHeader={`${moment(startDate).format("MMM Do YY")} to ${moment(endDate).format("MMM Do YY")}`}
                            displayTotal={`${noAccounts} Total Accounts`}
                            subDisplayText={`${noCheques} cheque  & ${noSavings} Savings Accounts`}
                        />
                        {/* No of Accounts, Savings and Cheques */}
                        <DisplayDashCard
                            displayHeader={"Total Transactions"}
                            displayLowerHeader={`${moment(startDate).format("MMM Do YY")} to ${moment(endDate).format("MMM Do YY")}`}
                            displayTotal={`${noTransactions} Transactions Fetched`}
                            subDisplayText={`${noDebits} Debits  & ${noCredits} Credits Transactions`}
                        />
                        {/* Session lat and Long map chart */}
                        <SVectorMap markers={sessionsChartData} label="Lat and Long Map Chart" />
                        {/* Bar chart (Direct vs Indirect) */}
                        <ColumnChart config={accountChartData} fullWidth={true} label="No.Accounts Fetched Vs Day/Month" />
                        {/* Table (Top Channels) */}
                        <AccountsTable data={allAccounts} />
                        {/* Table (Top Channels) */}
                        <TransactionsTable data={allTransactions} />
                    </div>
                </>
            )}
        </>
    );
}

export default Dashboard;
