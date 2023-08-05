
const getCurrentDate = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    return currentDate;
};

export {getCurrentDate};