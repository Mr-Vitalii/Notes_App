const toggleTagVisibility = (htmlTag) => {
    if (!(htmlTag instanceof HTMLElement)) {
        throw new Error('Invalid input. Expected an HTMLElement.');
    }

    const computedStyle = window.getComputedStyle(htmlTag);
    const visibilityValue = computedStyle.visibility;

    if (visibilityValue === 'hidden') {
        htmlTag.style.visibility = 'visible';
    } else {
        htmlTag.style.visibility = 'hidden';
    }
};

export {toggleTagVisibility};