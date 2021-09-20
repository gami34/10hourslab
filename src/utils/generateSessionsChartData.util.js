import moment from "moment";

export function generateSessionsChartData(rawData) {
    console.log(rawData, "gerated session sata with thesse");

    // rawdata is an array
    const chartMap = rawData.map((obj) => {
        return {
            latLng: [obj["lat"], obj["long"]],
            name: moment(obj["created_at"]).format("MMM Do YYYY"),
        };
    });

    return chartMap;
}
