import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";


const showToast = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top",
        position: "left",
        close: true,
        style: {
            background: "rgb(119, 122, 146)",
        },
        onClick: function () {}
    }).showToast(); 
}

export { showToast };