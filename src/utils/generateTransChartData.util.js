import moment from "moment";

export function generateTransChartData(rawData, xparam1, valueParam) {
    // credit|debit  amount
    // indicators
    let yField = "yfield";
    let xField = "xField";

    const chartMap = {};

    // this is counter generator
    rawData.forEach((obj) => {
        const chartMapKey = moment(obj.created_at).format("DD/MM/YYYY");
        console.log(obj);
        if (obj[xparam1]) return;

        // check if th ekey exist
        if (chartMap[chartMapKey]) {
            // push
            chartMap[chartMapKey] += parseFloat(obj[valueParam]);
        } else {
            // create and push
            chartMap[chartMapKey] = parseFloat(obj[valueParam]);
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

    console.log(chartMap);

    const config = {
        data: chartData,
        width: 800,
        height: 400,
        autoFit: false,
        xField,
        yField,
        // label: "Credit Amount vs Day/Month",
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
