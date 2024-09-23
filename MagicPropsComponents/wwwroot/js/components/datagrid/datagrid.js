var MPDATAGRID = {
    onEditorClick: function (event) {
        event.stopPropagation();
        return false;
    },
    init: function (headerDiv, bodyDiv) {
        if (bodyDiv.scrollHeight != bodyDiv.clientHeight) {
            $(headerDiv).find(".mp-datagrid-header-wrapper").addClass("mp-scroll-mask");
        }
        bodyDiv.addEventListener('scroll', function () {
            headerDiv.scrollLeft = bodyDiv.scrollLeft;
        });
    }
}
