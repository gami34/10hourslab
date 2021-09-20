import React, { useState } from "react";
import { Select, Input, Divider, Row, Col, DatePicker } from "antd";
import { CreditCardFilled, SecurityScanOutlined, DashboardFilled, TeamOutlined, CalendarOutlined, EditOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useHistory } from "react-router";
import moment from "moment";

function Datepicker({ dateFilterHandler }) {
    // => datepickerHandler

    // hooks
    let history = useHistory();
    const { RangePicker } = DatePicker;
    const [displayRangepicker, setDisplayRangePicker] = useState(false);

    // Handle customer date selection
    const customDateFilterHandler = (date) => {
        if (date[0] && date[1]) {
            dateFilterHandler([date[0].format(), date[1].format()]);
        }
    };

    // handle display of each dashboard info on screen
    const handleDateClick = (date) => {
        // route to the page containing data info
        if (["customDateRange", "last7Days"].includes(date)) {
            // check if date options were selected inst
            switch (date) {
                case "last7Days":
                    setDisplayRangePicker(false);
                    dateFilterHandler([moment().subtract(7, "days").set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).format(), moment().format()]); // [startDate, endDate]
                    break;
                case "customDateRange":
                    // display a pop up window to enter date range
                    setDisplayRangePicker(true);
                    break;
                default:
                    break;
            }
        }
    };

    // handle display  each dashboard info on screen based on menu selection
    const handleMenuClick = (data) => {
        // route to the page containing data info
        if (["/", "accounts", "transactions", "sessions"].includes(data)) {
            // make a route to the specified selection
            history.push(`${data}`);
        }
    };

    return (
        <div className="">
            <Divider orientation="right">Filter Data based on Date Range</Divider>
            <Row justify="end" align="middle" gutter={{ xs: 4, sm: 4, md: 4, lg: 4 }}>
                {displayRangepicker && (
                    <Col className="gutter-row" xs={{ span: 12, puah: 16 }} sm={{ span: 12, push: 0 }} md={12} lg={16} xl={18}>
                        <RangePicker showTime onChange={customDateFilterHandler} className="form-input text-gray-500 hover:text-gray-600 font-medium focus:border-gray-300 float-right" />
                    </Col>
                )}
                <Col className="gutter-row" xs={{ span: 12, push: 0 }} sm={{ span: 12, push: 0 }} md={13} lg={10} xl={5}>
                    <Input.Group className="float-right">
                        <Select defaultValue="Select Date Range" onChange={handleDateClick}>
                            <Select.Option value="last7Days">
                                <CalendarOutlined /> Last 7 Days
                            </Select.Option>
                            <Select.Option value="customDateRange">
                                <EditOutlined /> Custom Range
                            </Select.Option>
                        </Select>
                    </Input.Group>
                </Col>
                <Col className="gutter-row" justify="end" xs={{ span: 24, push: 16 }} sm={{ span: 24, push: 0 }} md={24} lg={1} xl={1}>
                    <Input.Group className="float-right">
                        <Select
                            defaultValue={
                                <span>
                                    <DashboardFilled /> Dashboard
                                </span>
                            }
                            onChange={handleMenuClick}
                        >
                            <Select.Option value="/">
                                <DashboardFilled /> Dashboard
                            </Select.Option>
                            <Select.Option value="accounts">
                                <CreditCardFilled /> Accounts
                            </Select.Option>
                            <Select.Option value="transactions">
                                <SecurityScanOutlined /> Transactions
                            </Select.Option>
                            <Select.Option value="sessions">
                                <TeamOutlined /> Sessions
                            </Select.Option>
                        </Select>
                    </Input.Group>
                </Col>
            </Row>
        </div>
    );
}

export default Datepicker;
