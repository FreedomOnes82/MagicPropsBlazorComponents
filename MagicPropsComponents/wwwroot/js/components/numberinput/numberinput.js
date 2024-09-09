var MPNumberInput = (function () {
    inputlistener = [];
    keypressListener = [];
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
            const keydownFunc = function (event) {
                if (event.key == "ArrowUp") {
                    event.preventDefault()
                    this.value = Number(this.value) + increment;
                } else if (event.key == "ArrowDown") {
                    event.preventDefault()
                    this.value = Number(this.value) - increment;
                }
            }
            keypressListener[inputID] = keydownFunc;
            inputEle.addEventListener('input', inputFunc);
            inputEle.focus();
            inputEle.addEventListener('keydown', keydownFunc);
        }
    }
    function removeListener(inputID) {
        var inputEle = document.getElementById(inputID);
        if (inputEle) {
            if (inputlistener[inputID])
                inputEle.removeEventListener('input', inputlistener[inputID])
            if (keypressListener[inputID])
                inputEle.removeEventListener('keydown', keypressListener[inputID]);
        }
    }
    return {
        addListener: addListener,
        removeListener: removeListener
    }
})();