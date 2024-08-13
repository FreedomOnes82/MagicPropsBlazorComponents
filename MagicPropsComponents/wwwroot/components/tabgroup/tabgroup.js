var MPTabGroup = (function () {
    var prebtn_listener = null;
    var nextbtn_listener = null;
    var preIcon = null;
    var nexIcon = null;
    LoadHeaderBtnListener = function (id) {
        const ele = document.getElementById(id);
        if (ele == null) return;
        const container = ele.querySelector(".tab-list-ul");
        const preBtnEle = ele.querySelector(".pre-btn")
        const nextBtnEle = ele.querySelector(".nex-btn")
        if (!CheckIsoverflow(ele)) {
            if (preBtnEle) {
                var icon = preBtnEle.querySelector("i");
                if (icon) {
                    preIcon = icon;
                    preBtnEle.removeChild(icon);
                }
            }
            if (nextBtnEle) {
                var icon = nextBtnEle.querySelector("i");
                if (icon) {
                    nexIcon = icon;
                    nextBtnEle.removeChild(nexIcon);
                }
            }
            return;
        }
        //container.scrollLeft = container.scrollWidth - container.offsetWidth;
        preBtnEle.appendChild(preIcon);
        nextBtnEle.appendChild(nexIcon);
        const activeItem = container.querySelector(".nav-item.active");
        if (activeItem) activeItem.scrollIntoView();
        RemoveHeaderBtnListener();
        prebtn_listener = preBtnEle.addEventListener("click", function () {
            var scrollwidth = container.offsetWidth / 4
            container.scrollLeft = Math.max(
                container.scrollLeft - scrollwidth,
                0
            );
        });
        nextbtn_listener = nextBtnEle.addEventListener("click", function () {
            var scrollwidth = container.offsetWidth / 4
            const maxScrollLeft = container.scrollWidth - container.offsetWidth;
            container.scrollLeft = Math.min(
                container.scrollLeft + scrollwidth,
                maxScrollLeft
            );
        });
    }
    CheckIsoverflow = function(ele){
        const container = ele.querySelector(".tab-list-ul");
        const lis = Array.from(ele.querySelectorAll('.tab-list-ul li'));
        const totalLiWidth = lis.reduce((total, li) => total + li.offsetWidth, 0);
        if (totalLiWidth <= container.offsetWidth) {
            return false;
        } else {
            return true;
        }
    }
    RemoveHeaderBtnListener = function () {
        if (prebtn_listener != null)
            document.removeEventListener("click", prebtn_listener)
        if (nextbtn_listener != null)
        document.removeEventListener("click", nextbtn_listener)
    }
    Init= function (containerId) {
        var container = document.getElementById(containerId);
        var tabs = $(container).find(".tab-content .tab-pane");
        var headers = [];
        var tabIds = [];
        for (var i = 0; i < tabs.length; i++) {
            let tabId = "tab_" + i.toString();
            $(tabs[i]).attr("id", tabId);
            tabIds.push(tabId);
            $(tabs[i]).attr("aria-labelledby", "tab_header_" + i.toString());
            let header = $(tabs[i]).attr("data-tab-header");
            headers.push(header)
            $(tabs[i]).attr("tabindex", i.toString());
        }

        for (var i = 0; i < headers.length; i++) {
            var tabHeader = $('<li class="nav-item" role="presentation"><button class= "nav-link" id="btntab' + i.toString() +
                '" data-bs-toggle="tab" data-bs-target="#' + tabIds[i] + '" type = "button" role = "tab" aria-controls="' + tabIds[i] + '" aria-selected="false" >' + headers[i] + '</button></li> ')
            $(container).find(".nav").append(tabHeader)
        }

        var activedTab = $(container).find(".tab-content .active");
        let activeTabId = '';
        if (activedTab.length > 0) {
            activeTabId = activedTab.attr("id");
        }
        else {
            activeTabId = $(container).find(".tab-content .tab-pane")[0].id;
        }

        $(container).find(".nav-tabs .nav-item .nav-link[data-bs-target$='" + activeTabId + "']").addClass("active");//[0].click();
        console.log("Init...");
}
return {
    LoadHeaderBtnListener: LoadHeaderBtnListener,
    RemoveHeaderBtnListener: RemoveHeaderBtnListener,
};
}) ();
