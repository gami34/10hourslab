import moment from "moment";
import React from "react";

function DashboardCard07(props) {
    console.log(props.data);
    return (
        <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Transactions within specified dates</h2>
            </header>
            <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        {/* Table header */}
                        <thead className="text-xs uppercase text-gray-400 bg-gray-50 rounded-sm">
                            <tr>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Account ID</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Amount</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Type</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Branch</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Created At</div>
                                </th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        <tbody className="text-sm font-medium divide-y divide-gray-100">
                            {/* Row */}
                            {props.data.map((obj, index) => {
                                return (
                                    <tr key={index}>
                                        {obj.account_id && (
                                            <td className="p-2">
                                                <div className="flex items-center">
                                                    <div className="text-gray-800">{obj.account_id}</div>
                                                </div>
                                            </td>
                                        )}
                                        {obj.amount && (
                                            <td className="p-2">
                                                <div className="text-left">{obj.amount}</div>
                                            </td>
                                        )}
                                        {obj.type == "credit" ? (
                                            <td className="p-2">
                                                <div className="text-left text-green-500">{obj.type}</div>
                                            </td>
                                        ) : (
                                            <td className="p-2">
                                                <div className="text-left text-red-500">{obj.type}</div>
                                            </td>
                                        )}
                                        {obj.branch && (
                                            <td className="p-2">
                                                <div className="text-left">{obj.branch}</div>
                                            </td>
                                        )}
                                        {obj.created_at && (
                                            <td className="p-2">
                                                <div className="text-left text-light-blue-500">{moment(obj.created_at).format("MMM Do YYYY")}</div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DashboardCard07;
