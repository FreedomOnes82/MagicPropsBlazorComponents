var MPDATEPICKER = (function () {
    function show(triggerId, calendarEle) {
        const triggerEle = document.getElementById(triggerId);
        const triggerRect = triggerEle.getBoundingClientRect();

        calendarEle.style.display = "block";
        calendarEle.style.visibility = 'hidden';

        var anchorPoint = {};

        var getCalendarPopupOverViewStatus = function (triggerId) {
            var result = {}
            result.isOverView = false;
            result.overType = [];
            var trigger = document.getElementById(triggerId);
            var triggerRect = trigger.getBoundingClientRect();
            var defaultAnchorPointX = triggerRect.x;
            var defaultAnchorPointY = triggerRect.y + triggerRect.height;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            //current popup width default is 330, max-height is 365
            if ((defaultAnchorPointX + 330) > viewportWidth) {
                result.isOverView = true;
                result.overType.push("right");
            }
            if ((defaultAnchorPointY + 370) > viewportHeight) {
                result.isOverView = true;
                result.overType.push("bottom");
            }
            return result;
        }

        const calendarPopupOverViewStatus = getCalendarPopupOverViewStatus(triggerId)
        if (calendarPopupOverViewStatus.isOverView) {
            if (calendarPopupOverViewStatus.overType.length == 2) {
                //anchorPoint in trigger's right-top
                anchorPoint.x = triggerRect.x + triggerRect.width;
                anchorPoint.y = triggerRect.y;

                calendarEle.style.bottom = `${window.innerHeight - anchorPoint.y}px`;
                calendarEle.style.right = `${window.innerWidth - anchorPoint.x}px`;
            } else if (calendarPopupOverViewStatus.overType.indexOf('right') > -1) {
                //anchorPoint in trigger's right-bottom
                anchorPoint.x = triggerRect.x + triggerRect.width;
                anchorPoint.y = triggerRect.y + triggerRect.height;

                calendarEle.style.top = `${anchorPoint.y}px`;
                calendarEle.style.right = `${window.innerWidth - anchorPoint.x}px`;
            } else {
                //anchorPoint in trigger's left-top
                anchorPoint.x = triggerRect.x;
                anchorPoint.y = triggerRect.y;

                calendarEle.style.bottom = `${window.innerHeight - anchorPoint.y}px`;
                calendarEle.style.left = `${anchorPoint.x}px`;
            }
        } else {
            //anchorPoint in trigger's left-bottom
            anchorPoint.x = triggerRect.x;
            anchorPoint.y = triggerRect.y + triggerRect.height;

            calendarEle.style.top = `${anchorPoint.y}px`;
            calendarEle.style.left = `${anchorPoint.x}px`;
        }

        calendarEle.style.visibility = '';

        const clickFunction = async function (event) {
            event.stopPropagation();//triggerEle only two childNodes(title and input)
            if (triggerEle.childNodes[0].contains(event.target) || (triggerEle.childNodes[1] && triggerEle.childNodes[1].contains(event.target)) || event.target == calendarEle || calendarEle.contains(event.target)) {
                return;
            } else {
                await hideFuntion(event);
            }
        }

        const keydownFunction = async function (event) {
            if (event.code == "Tab" || event.code == "Enter" || event.code == "Space") {
                await hideFuntion(event);
                return;
            }
            const inputEle = triggerEle.querySelector("input");
            if (inputEle) {
                if (document.activeElement != inputEle) {
                    event.preventDefault();
                    if (event.key == "ArrowDown") {
                        await window.getDotNetRef(triggerId).invokeMethodAsync('OnJumpSelectedDay', 7);
                    } else if (event.key == "ArrowUp") {
                        await window.getDotNetRef(triggerId).invokeMethodAsync('OnJumpSelectedDay', -7);
                    } else if (event.key == "ArrowLeft") {
                        await window.getDotNetRef(triggerId).invokeMethodAsync('OnJumpSelectedDay', -1);
                    } else if (event.key == "ArrowRight") {
                        await window.getDotNetRef(triggerId).invokeMethodAsync('OnJumpSelectedDay', 1);
                    }
                }
            }
        }

        document.addEventListener('keydown', keydownFunction)
        document.addEventListener('click', clickFunction)
        blurFunc[triggerId] = clickFunction;
        keydownFunc[triggerId] = keydownFunction;

        var hideFuntion = async function (e) {
            if (isVisible[triggerId]) {
                await window.getDotNetRef(triggerId).invokeMethodAsync('HideCalendar');
                calendarEle.style.visibility = 'hidden';
                isVisible[triggerId] = false;
                if (blurFunc[triggerId]) {
                    window.removeEventListener('wheel', blurFunc[triggerId]);
                    document.removeEventListener('click', blurFunc[triggerId])
                }
                if (keydownFunc[triggerId]) {
                    document.removeEventListener('keydown', keydownFunc[triggerId])
                }
            }
        }

        window.addEventListener('wheel', clickFunction);

        window.addEventListener('resize', hideFuntion);

        isVisible[triggerId] = true;
    }
    function hide(triggerId, calendarEle) {
        if (isVisible[triggerId]) {
            calendarEle.style.visibility = 'hidden';
            if (isVisible[triggerId]) isVisible[triggerId] = false;
            if (blurFunc[triggerId]) {
                window.removeEventListener('wheel', blurFunc[triggerId]);
                document.removeEventListener('click', blurFunc[triggerId])
            }
            if (keydownFunc[triggerId]) {
                document.removeEventListener('keydown', keydownFunc[triggerId])
            }
        }
    }

    var blurFunc = [];
    var isVisible = [];
    var keydownFunc = [];
    return {
        show: show,
        hide: hide
    };

})();