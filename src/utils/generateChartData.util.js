import moment from "moment";

export function generateChartData(rawData) {
    console.log(rawData);
    // indicators
    let yField = "yfield";
    let xField = "xField";

    const chartMap = {};

    // this is counter generator
    rawData.forEach((obj) => {
        const chartMapKey = moment(obj.created_at).format("DD/MM/YYYY");

        if (chartMap[chartMapKey]) {
            // push
            chartMap[chartMapKey] += 1;
        } else {
            // create and push
            chartMap[chartMapKey] = 1;
        }
    });

    const chartData = [];
    // pupulate the data for antD format of data [{ylabel: value, xLabel: value}] : { year: "1991", value: 3 },
    // for each key for it key
    for (const key in chartMap) {
        if (chartMap.hasOwnProperty.call(chartMap, key)) {
            chartData.push({
                [xField]: moment(key, "DD/MM/YYYY").format("DD/MMM"),
                [yField]: chartMap[key],
            });
        }
    }

    const config = {
        data: chartData,
        width: 800,
        height: 400,
        autoFit: false,
        xField,
        yField,
        point: {
            size: 5,
            shape: "diamond",
        },
        label: {
            style: {
                fill: "#aaa",
            },
        },
    };
    return config;
}
