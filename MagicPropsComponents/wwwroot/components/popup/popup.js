var MPPOPUP = (function () {
    function showById(popupElement, targetElementId, toward, anchorPointX, anchorPointY, anchorPointType, popupElementId, boxShadowSettings, spacing, onlyControlByVisible) {
        var targetElement = document.getElementById(targetElementId);
        show(popupElement, targetElement, toward, anchorPointX, anchorPointY, anchorPointType, popupElementId, boxShadowSettings, spacing, onlyControlByVisible)
        return null
    }
    function show(popupElement, targetElement, toward, anchorPointX, anchorPointY, anchorPointType, popupElementId, boxShadowSettings, spacing, onlyControlByVisible) {
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

        var newDiv = document.createElement("div");
        newDiv.className = "mp-backdrop";
        document.body.appendChild(newDiv);

        var hideFuntion = async function (e) {
            e.stopPropagation();
            await window.getDotNetRef(popupElementId).invokeMethodAsync('SetPopupInvisible');
            popupElement.style.display = "none";
            backDropEleList[popupElementId] = null;
            if (document.body.contains(newDiv))
                document.body.removeChild(newDiv);
        }
        if (!onlyControlByVisible) { newDiv.addEventListener('click', hideFuntion); }
        newDiv.addEventListener('wheel', hideFuntion, { passive: true });
        //popupElement.addEventListener('wheel', hideFuntion, { passive: true });
        window.addEventListener('resize', hideFuntion);
        backDropEleList[popupElementId] = newDiv;
    }
    function hide(popupElementId, popupEle) {
        popupEle.style.display = "none";
        $(popupEle).removeClass("popup-active");
        if (backDropEleList[popupElementId] && document.body.contains(backDropEleList[popupElementId])) {
            document.body.removeChild(backDropEleList[popupElementId]);
            backDropEleList[popupElementId] = null;
        }
    }
    var backDropEleList = [];
    function initialTriggerEventById(triggerElementId, popupElementId, onlyControlByVisible) {
        var triggerElement = document.getElementById(triggerElementId);

        if (!onlyControlByVisible) {
            document.addEventListener('click', async function (event) {
                if (event.target == triggerElement || (triggerElement && triggerElement.contains(event.target))) {
                    try {
                        await window.getDotNetRef(popupElementId).invokeMethodAsync('SetPopupVisible');
                    } catch (e) {
                        console.error(e);
                    }
                }
            })
        }

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