function formatDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate() + 1;

    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}-${formattedMonth}-${formattedDay}`;
}

function getCurrentDate() {
    const currentDate = new Date();
    return formatDate(currentDate);
}

function getDate30DaysAgo() {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return formatDate(date);
}

module.exports = {
    getCurrentDate,
    getDate30DaysAgo
};