var MPPOPUP = (function () {
    function showById(popupElement, targetElementId, toward, anchorPointX, anchorPointY, anchorPointType, popupElementId, boxShadowSettings, spacing) {
        var targetElement = document.getElementById(targetElementId);
        show(popupElement, targetElement, toward, anchorPointX, anchorPointY, anchorPointType, popupElementId, boxShadowSettings, spacing, false)
        return null
    }
    function show(popupElement, targetElement, toward, anchorPointX, anchorPointY, anchorPointType, popupElementId, boxShadowSettings, spacing) {
        const targetRect = targetElement.getBoundingClientRect();
        popupElement.style.display = "block";
        popupElement.style.visibility = 'hidden';
        const popupRect = popupElement.getBoundingClientRect();
        const wid = popupRect.width
        const hei = popupRect.height;
        var anchorPoint = GetAnchorPoint(targetElement, anchorPointX, anchorPointY, anchorPointType)
        switch (toward) {
            case 'top-left':
                newTop = anchorPoint.y - hei - spacing;
                newLeft = anchorPoint.x - wid - spacing;
                break;
            case 'top-center':
                newTop = targetRect.top - hei - spacing;
                newLeft = targetRect.left + (targetRect.width - wid) / 2;
                break;
            case 'top-right':
                newTop = anchorPoint.y - hei - spacing;
                newLeft = anchorPoint.x + spacing;
                break;
            case 'bottom-left':
                newTop = anchorPoint.y + spacing;
                newLeft = anchorPoint.x - wid - spacing;
                break;
            case 'bottom-center':
                newTop = targetRect.bottom + spacing;
                newLeft = targetRect.left + (targetRect.width - wid) / 2;
                break;
            case 'bottom-right':
                newTop = anchorPoint.y + spacing;
                newLeft = anchorPoint.x + spacing;
                break;
            case 'left-center':
                newTop = targetRect.top + (targetRect.height - hei) / 2;
                newLeft = targetRect.left - wid - spacing;
                break;
            case 'right-center':
                newTop = targetRect.top + (targetRect.height - hei) / 2;
                newLeft = targetRect.right + spacing;
                break;
            default:
                console.error('Invalid position:', toward);
                return;
        }
        popupElement.style.top = `${newTop}px`;
        popupElement.style.left = `${newLeft}px`;
        popupElement.style.boxShadow = boxShadowSettings
        popupElement.style.visibility = '';

        var hideFuntion = async function (e) {
            await window.getDotNetRef(popupElementId).invokeMethodAsync('OnVisiableChanged', false);
            popupElement.style.display = "none";
            popupElement.style.visibility = 'hidden';
            if (clickFunc[popupElementId]) {
                document.removeEventListener('click', clickFunc[popupElementId]);
                clickFunc[popupElementId] = null;
            }
            if (hideFunc[popupElementId]) {
                window.removeEventListener('resize', hideFunc[popupElementId]);
                hideFunc[popupElementId] = null;
            }
            if (wheelFunc[popupElementId]) {
                document.removeEventListener('wheel', wheelFunc[popupElementId]);
                wheelFunc[popupElementId] = null;
            }
            if (isVisible[popupElementId])
                isVisible[popupElementId] = false;
        }
        var listener = async function (event) {
            if (event.target == targetElement || targetElement.contains(event.target)) {
                if (isVisible[popupElementId]) {
                    await hideFuntion(event);
                } else {
                    return;
                }
            }
            else if (event.target == popupElement || popupElement.contains(event.target)) {
                return;
            } else {
                await hideFuntion(event);
            }
        }
        document.addEventListener('click', listener);
        clickFunc[popupElementId] = listener
        const wheelFunction = async function (event) {
            event.stopPropagation();
            if (event.target != popupElement && (popupElement && !popupElement.contains(event.target))) {
                await hideFuntion(event);
            }
        };
        document.addEventListener('wheel', wheelFunction);

        hideFunc[popupElementId] = hideFuntion;
        wheelFunc[popupElementId] = wheelFunction
        window.addEventListener('resize', hideFuntion);
        isVisible[popupElementId] = true;
    }
    function hide(popupElementId, popupEle) {
        popupEle.style.display = "none";
        popupEle.style.visibility = 'hidden';
        //$(popupEle).removeClass("popup-active");
        if (clickFunc[popupElementId]) {
            document.removeEventListener('click', clickFunc[popupElementId]);
            clickFunc[popupElementId] = null;
        }
        if (wheelFunc[popupElementId]) {
            document.removeEventListener('wheel', wheelFunc[popupElementId]);
            wheelFunc[popupElementId] = null;
        }
        if (hideFunc[popupElementId]) {
            window.removeEventListener('resize', hideFunc[popupElementId]);
            hideFunc[popupElementId] = null;
        }
        if (isVisible[popupElementId])
            isVisible[popupElementId] = false;
    }
    var hideFunc = [];
    var clickFunc = [];
    var wheelFunc = [];
    let isVisible = [];
    function initialTriggerEventById(triggerElementId, popupElementId) {
        var triggerElement = document.getElementById(triggerElementId);
        document.addEventListener('click', async function (event) {
            if (event.target == triggerElement || (triggerElement && triggerElement.contains(event.target))) {
                try {
                    await window.getDotNetRef(popupElementId).invokeMethodAsync('OnVisiableChanged', true);
                    //event.stopPropagation();
                } catch (e) {
                    console.error(e);
                }
            }
        })
    }
    function GetAnchorPoint(triggerElement, anchorPointX, anchorPointY, anchorPointType) {
        var triggerRect = triggerElement.getBoundingClientRect();
        var anchorPoint = {};
        if (anchorPointX > -1 && anchorPointY > -1) {
            anchorPoint.x = anchorPointX;
            anchorPoint.y = anchorPointY;
        } else {
            switch (anchorPointType) {
                case "left-top": anchorPoint.x = triggerRect.x; anchorPoint.y = triggerRect.y; break;
                case "left-bottom": anchorPoint.x = triggerRect.x; anchorPoint.y = triggerRect.y + triggerRect.height; break;
                case "right-top": anchorPoint.x = triggerRect.x + triggerRect.width; anchorPoint.y = triggerRect.y; break;
                case "right-bottom": anchorPoint.x = triggerRect.x + triggerRect.width; anchorPoint.y = triggerRect.y + triggerRect.height; break;
                case "center": anchorPoint.x = triggerRect.x + (triggerRect.width / 2); anchorPoint.y = triggerRect.y + (triggerRect.height / 2); break;
                default: anchorPoint.x = triggerRect.x + triggerRect.width; anchorPoint.y = triggerRect.y; break;
            }
        }
        return anchorPoint;
    }
    return {
        showById: showById,
        hide: hide,
        initialTriggerEventById: initialTriggerEventById
    };
})();