import React from "react";
import Icon from "../../images/icon-01.svg";

function DisplayDashCard(props) {
    return (
        <>
            {
                <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200 align-center">
                    <div className="px-5 pt-5 p-5">
                        <header className="flex justify-between items-start mb-2">
                            {/* Icon */}
                            <img src={Icon} width="32" height="32" alt="Icon 01" />
                        </header>
                        <h2 className="text-lg uppercase font-semibold text-gray-800 mt-4">{props.displayHeader}</h2>
                        <h4 className="text-sm  font-semibold text-gray-800 mb-3">{props.displayLowerHeader}</h4>
                        <div className="text-sm font-semibold text-gray-400 uppercase mb-3">{props.subDisplayText}</div>
                        <div className="flex items-start mt-3">
                            <div className="text-3xl font-bold text-gray-800 mr-2">{props.displayTotal}</div>
                            <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default DisplayDashCard;
