var MPNumberInput = (function () {
    inputlistener = [];
    function addListener(inputID, increment) {
        var inputEle = document.getElementById(inputID);
        if (inputEle) {
            const inputFunc = function (e) {
                var value = this.value;
                value = value.replace(/[^0-9.-]/g, '');
                value = value.replace(/(\..*?)\./g, "$&");
                if (value.indexOf('-') === 0) {
                    value = "-" + value.replaceAll("-", "");
                } else {
                    value = value.replace('-', '');
                }
                this.value = value;
            }
            inputlistener[inputID] = inputFunc;
            inputEle.addEventListener('input', inputFunc);
        }
    }
    function removeListener(inputID) {
        var inputEle = document.getElementById(inputID);
        if (inputEle) {
            if (inputlistener[inputID])
                inputEle.removeEventListener('input', inputlistener[inputID])
        }
    }
    return {
        addListener: addListener,
        removeListener: removeListener
    }
})();