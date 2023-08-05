
const extractDates = (content) => {
    if (typeof content !== 'string') {
        throw new Error('Invalid input. Expected a string.');
    }

    if (!content) {
        return [];
    }

    const datePattern = /(?:\d{2}[./]\d{2}[./]\d{4})/g;
    const datesFound = content.match(datePattern);
    return datesFound || [];
};

export {extractDates};