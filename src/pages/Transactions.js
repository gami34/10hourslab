import React, { useEffect, useState } from "react";

import Datepicker from "../partials/actions/Datepicker";
import DisplayDashCard from "../partials/dashboard/DisplayDashCard";
import TransactionsTable from "../partials/dashboard/TransactionsTable";
import ColumnChart from "../partials/dashboard/ColumnChart";

import { useQuery } from "@apollo/client";
import _ from "lodash";
import { ALL_TRANSACTIONS } from "../graphql/queries";
import moment from "moment";
import { generateTransChartData } from "../utils/generateTransChartData.util";
import { generateNumTransChartData } from "../utils/generateNumTransChartData.util";

function Transactions() {
    const [startDate, setStartDate] = useState("2021-07-09T00:00:00.000Z"); // most recent date from the dataset
    const [endDate, setEndDate] = useState("2021-09-16T08:49:43.991Z");

    const [allTransactions, setAllTransactions] = useState([]);
    const [noTransactions, setNoTransactions] = useState(0);
    const [noDebits, setNoDebits] = useState(0);
    const [noCredits, setNoCredits] = useState(0);
    const [noTransactionChartData, setNoTransactionChartData] = useState({});
    const [chartData, setChartData] = useState([]);

    // fetch all acounts data from the graphql server for the first 7days
    const { data, loading } = useQuery(ALL_TRANSACTIONS, {
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
        if (data?.allTransactions) {
            // generate credit vs day/Month
            setChartData(generateTransChartData(_.filter(data.allTransactions, { type: "credit" }), "credit", "amount"));
            // generate transaction vs Branch data
            setNoTransactionChartData(generateNumTransChartData(data.allTransactions));
            setAllTransactions(data.allTransactions);
            setNoTransactions(data.allTransactions.length);
            setNoDebits(_.filter(data.allTransactions, { type: "debit" }).length);
            setNoCredits(_.filter(data.allTransactions, { type: "credit" }).length);
        }
    }, [data]);

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
                            displayHeader={"Total Transactions"}
                            displayLowerHeader={`${moment(startDate).format("MMM Do YY")} to ${moment(endDate).format("MMM Do YY")}`}
                            displayTotal={`${noTransactions} Transactions Fetched`}
                            subDisplayText={`${noDebits} Debits  & ${noCredits} Credits Transactions`}
                        />
                        {/* Bar chart (credit vs day/Month) */}
                        <ColumnChart config={chartData} label="Credit Amount Fetched Vs Day/Month" />
                        <ColumnChart config={noTransactionChartData} fullWidth={true} label="No.Transaction Fetched Vs Day/Month" />
                        {/* Table (Top Channels) */}
                        <TransactionsTable data={allTransactions} />
                    </div>
                </>
            )}
        </>
    );
}

export default Transactions;
