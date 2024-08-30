var MPModal = (function() {
    var backDrop = {};
    var listenerFunction = {};
    function show(eleId, modalEle,contentEle,isClickOutsideToClose) {
        modalEle.style.display = "block";
        backDrop = document.createElement("div");
        backDrop.className = "mp-backdrop";
        backDrop.style.backgroundColor="rgb(0,0,0)"
        backDrop.style.opacity = "0.5";
        document.body.appendChild(backDrop);
        if (isClickOutsideToClose) {
            var clickOutsideFunction = async function (event) {
                if (event.target != contentEle && !contentEle.contains(event.target)) {
                    await window.getDotNetRef(eleId).invokeMethodAsync('SwitchVisible');
                }
            }
            listenerFunction[eleId] = clickOutsideFunction
            modalEle.addEventListener('click', clickOutsideFunction)
        }        
    }
    function hide(eleId, modalEle) {
        modalEle.style.display = "none";
        if (document.body.contains(backDrop))
            document.body.removeChild(backDrop);
        if (listenerFunction[eleId])
            modalEle.removeEventListener('click', listenerFunction[eleId])
    }
    return {
        show: show,
        hide: hide
    };
})();