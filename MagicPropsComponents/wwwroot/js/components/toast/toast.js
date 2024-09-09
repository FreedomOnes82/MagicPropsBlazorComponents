var MPTOAST = (function () {
    var displayToasts = [];
    var closeFunc = [];
    async function show(clientID, autohide, delay, toastItem, closable) {
        var container = document.getElementById(clientID);
        if (container) {

        } else {
            console.error("Could not found toast container");
        }
        var clonedToast = toastItem.cloneNode(true);
        var uniqueID = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5); // general id
        clonedToast.id = uniqueID;
        displayToasts.push(clonedToast)
        clonedToast.classList.remove("hide");
        clonedToast.classList.add("show");
        container.appendChild(clonedToast);

        const hideFunc = function () {
            let toastItem = null;
            toastItem = displayToasts.find(x => x.id == uniqueID);
            displayToasts = displayToasts.filter(x => x.id != uniqueID);
            if (toastItem) {
                container.removeChild(toastItem);
            }
            var closableFun = closeFunc.find(x => x.id == uniqueID)
            if (closableFun) {
                closableFun.element.removeEventListener('click', closableFun.listener);
            }
        };

        if (closable) {
            var button = document.createElement('div');
            button.innerHTML = "<button type='button' class='btn-close'></button>";
            var realButton = button.firstChild;
            realButton.addEventListener('click', hideFunc);
            closeFunc.push({ id: uniqueID, listener: hideFunc, element: realButton });
            var header = clonedToast.querySelector('.toast-header');
            header.appendChild(realButton);
        }

        if (autohide) {
            let timer = setTimeout(function () {
                hideFunc();
                clonedToast.removeEventListener('mouseover', mouseoverFunc);
                clonedToast.removeEventListener('mouseout', mouseoutFunc);
            }, delay);
            const mouseoverFunc = function () { clearTimeout(timer); }
            const mouseoutFunc = function () {
                timer = setTimeout(function () {
                    hideFunc();
                    clonedToast.removeEventListener('mouseover', mouseoverFunc);
                    clonedToast.removeEventListener('mouseout', mouseoutFunc);
                }, delay);
            }

            clonedToast.addEventListener('mouseover', mouseoverFunc);
            clonedToast.addEventListener('mouseout', mouseoutFunc);
        }
    }

    return {
        show: show
    };
})();