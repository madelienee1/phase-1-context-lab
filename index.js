/* Your Code Here */

const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: [],
    };
};


const createEmployeeRecords = (employeeDetails) =>
    employeeDetails.map(createEmployeeRecord);


const createTimeInEvent = (employeeRecord = {}, dateTime) => {
    const [date, hour] = dateTime.split(" ");
    this.timeInEvents.push({
        type: "TimeIn",
        hour: Number(hour),
        date,
    });

    return this;
};

const createTimeOutEvent = (employeeRecord = {}, dateTime) => {
    const [date, hour] = dateTime.split(" ");
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: Number(hour),
        date,
    });

    return this;
};

const hoursWorkedOnDate = function (date) {
    const timeInEvent = this.timeInEvents.find(
        (event) => event.date === date
    );

    const timeOutEvent = this.timeOutEvents.find(
        (event) => event.date === date
    );

    if (!timeInEvent) {
        console.error(`No time-in event found for date: ${date}`);
        return;
    }

    if (!timeOutEvent) {
        console.error(`No time-out event found for date: ${date}`);
        return;
    }

    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;

    return hoursWorked;
};

const wagesEarnedOnDate = function (date) {
    const hoursWorked = this.hoursWorkedOnDate(date);
    const wage = this.payPerHour;

    return hoursWorked * wage;
};

//   const allWagesFor = (employeeRecord) => {
//     return employeeRecord.timeInEvents.reduce((totalWage, timeInEvent) => {
//       return totalWage + wagesEarnedOnDate(employeeRecord, timeInEvent.date);
//     }, 0);
//   };



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((totalWages, employee) => {
        return totalWages + allWagesFor(employee);
    }, 0);
};

