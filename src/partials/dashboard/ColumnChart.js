import React from "react";
import { Column } from "@ant-design/charts";

const ColumnChart = ({ config, fullWidth, label }) => {
    console.log(config, "what we received");
    return (
        <>
            {config?.data?.length > 0 && (
                <div
                    className={
                        fullWidth
                            ? "flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-gray-200"
                            : "flex flex-col col-span-full sm:col-span-6 xl:col-span-8 bg-white shadow-lg rounded-sm border border-gray-200"
                    }
                >
                    <div className="px-5 pt-5 ">
                        <Column {...config} />
                        <div className="text-center">{label}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ColumnChart;
