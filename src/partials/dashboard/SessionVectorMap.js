import React, { useRef } from "react";
import { VectorMap } from "react-jvectormap";
import $ from "jquery";
window.$ - $;

const SVectorMap = ({ fullWidth, label, markers }) => {
    const refMap = useRef();

    console.log(markers, "with th ese vector method ");

    return (
        <>
            {markers?.length > 0 ? (
                <div
                    className={
                        fullWidth
                            ? "flex flex-col col-span-full bg-white shadow-lg rounded-sm border border-gray-200 mb-3"
                            : "flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200 mb-3"
                    }
                >
                    <div className="px-5 pt-5 p-5">
                        <VectorMap
                            map={"world_mill"}
                            backgroundColor="#3b96ce"
                            zoomOnScroll={true}
                            ref={refMap}
                            containerStyle={{ width: "100%", height: "350px" }}
                            containerClassName={refMap}
                            markerStyle={{
                                initial: {
                                    fill: "#5c5c5c",
                                    stroke: "#efefef",
                                },
                            }}
                            markers={markers} // generated based on selected date range
                        />
                        <div className="text-center">{label}</div>
                    </div>
                </div>
            ) : (
                <div>Loading ...</div>
            )}
        </>
    );
};

export default SVectorMap;
