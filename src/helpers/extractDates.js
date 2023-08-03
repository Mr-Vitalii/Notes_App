
const extractDates = (content) => {
    if (content) {
        const datePattern = /(?:\d{2}[./]\d{2}[./]\d{4})/g;
        const datesFound = content.match(datePattern);
        return datesFound || [];
    }
    return [];
};

export default extractDates;

