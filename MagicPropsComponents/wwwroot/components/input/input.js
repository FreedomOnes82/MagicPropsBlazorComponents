var MPInput = {
    initNumberInput(contianerEle, inputEle, min, max, isPass, errmsgEle, showErrorMsg) {
        if (!isPass) {
            contianerEle.classList.add('mp-input-err');
            if (showErrorMsg)
                errmsgEle.classList.add('mp-input-errmsg-show');
        }
        inputEle.addEventListener('input', function (e) {
            var value = this.value;
            value = value.replace(/[^0-9.-]/g, '');
            value = value.replace(/(\..*?)\./g, "$&");
            if (value.indexOf('-') !== 0 && value.indexOf('-') !== -1) {
                value = value.replace('-', '');
            }
            if (value < min || value > max) {
                contianerEle.classList.add('mp-input-err');
                if (showErrorMsg)
                    errmsgEle.classList.add('mp-input-errmsg-show');
            } else {
                console.log(contianerEle.classList);
                contianerEle.classList.remove('mp-input-err');
                if (showErrorMsg)
                    errmsgEle.classList.remove('mp-input-errmsg-show');
            }
            this.value = value;
        });
    }
}