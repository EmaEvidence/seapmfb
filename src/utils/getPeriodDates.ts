function getPeriodDates(period: 'Current week' | 'Current month' | 'Last month' | 'Current year' | 'Last year') {
    const today = new Date();
    let startDate, endDate;

    switch (period.toLowerCase()) {
        case 'current week':
            // Get the first day of the current week (Sunday) and the last day (Saturday)
            const currentDayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
            const diffToSunday = currentDayOfWeek; // Days to subtract to get to Sunday
            const diffToSaturday = 6 - currentDayOfWeek; // Days to add to get to Saturday
            startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - diffToSunday);
            endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + diffToSaturday);
            break;

        case 'current month':
            // Get the first day and last day of the current month
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the month
            break;

        case 'last month':
            // Get the first and last day of the previous month
            startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            endDate = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of the last month
            break;

        case 'current year':
            // Get the first day and last day of the current year
            startDate = new Date(today.getFullYear(), 0, 1);
            endDate = new Date(today.getFullYear(), 11, 31);
            break;

        case 'last year':
            // Get the first and last day of the previous year
            startDate = new Date(today.getFullYear() - 1, 0, 1);
            endDate = new Date(today.getFullYear() - 1, 11, 31);
            break;

        default:
            throw new Error('Invalid period specified.');
    }

    return {
        startDate: startDate.toISOString().split('T')[0], // Format to YYYY-MM-DD
        endDate: endDate.toISOString().split('T')[0]      // Format to YYYY-MM-DD
    };
}

export default getPeriodDates;
