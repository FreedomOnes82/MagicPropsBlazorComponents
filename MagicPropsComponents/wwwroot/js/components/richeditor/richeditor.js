class toolBar {
    constructor() {

    }
    testSelectionStatus(clientId) {
        var range = window.getSelection().getRangeAt(0);
        var parentEle = range.commonAncestorContainer;
        var toolbarEle = $("#" + clientId).parent(".richEditorRoot").find(".richeditor-toolbar")
        toolbarEle.find(".action").removeClass("statusActived");
        function getTextAlignInDiv(div) {

            if (div && div.style) {
                var styleText = div.style.cssText || '';
                var textAlign = styleText.match(/text-align:\s*(.*)/i);
                if (textAlign) {
                    return textAlign[1].trim();
                }
            }
            return null;
        }

        while (parentEle.parentElement) {
            if (parentEle.id && parentEle.id == clientId) {
                break;
            }
            var tagName = parentEle.tagName;
            if (tagName === "STRIKE") {
                toolbarEle.find("button[action='strikeThrough']").addClass("statusActived");
            }

            if (tagName === "B") {
                toolbarEle.find("button[action='bold']").addClass("statusActived");
            }

            if (tagName === "FONT") {
                var attributes = parentEle.attributes;
                for (var f = 0; f < attributes.length; f++) {
                    if (attributes[f].name === "size") {
                        if (attributes[f].value == "5") {
                            toolbarEle.find("button[action='h3']").addClass("statusActived");
                        }
                        if (attributes[f].value == "6") {
                            toolbarEle.find("button[action='h2']").addClass("statusActived");
                        }
                        if (attributes[f].value == "7") {
                            toolbarEle.find("button[action='h1']").addClass("statusActived");
                        }
                    }
                }
            }

            if (tagName === "I") {
                toolbarEle.find("button[action='italic']").addClass("statusActived");
            }

            if (tagName === "A") {//Link
                toolbarEle.find("button[action='Createlink']").addClass("statusActived");
            }

            if (tagName === "U") {
                toolbarEle.find("button[action='underline']").addClass("statusActived");
            }

            if (tagName === "OL") {
                toolbarEle.find("button[action='insertOrderedList']").addClass("statusActived");
            }

            if (tagName === "UL") {
                toolbarEle.find("button[action='insertUnorderedList']").addClass("statusActived");
            }
            if (tagName === "LI") {
                var textAlign = getTextAlignInDiv(parentEle)
                if (textAlign) {
                    if (textAlign.indexOf("right") >= 0)
                        toolbarEle.find("button[action='alignright']").addClass("statusActived");
                    if (textAlign.indexOf("left") >= 0)
                        toolbarEle.find("button[action='alignleft']").addClass("statusActived");
                    if (textAlign.indexOf("center") >= 0)
                        toolbarEle.find("button[action='aligncenter']").addClass("statusActived");
                }
            } else if (tagName === "DIV") {
                var textAlign = getTextAlignInDiv(parentEle);
                if (textAlign) {
                    if (textAlign.indexOf("right") >= 0)
                        toolbarEle.find("button[action='alignright']").addClass("statusActived");
                    if (textAlign.indexOf("left") >= 0)
                        toolbarEle.find("button[action='alignleft']").addClass("statusActived");
                    if (textAlign.indexOf("center") >= 0)
                        toolbarEle.find("button[action='aligncenter']").addClass("statusActived");
                }
            } else if (tagName === "SPAN") {
                if (parentEle.style.cssText.indexOf("font-weight: bolder;") > -1)
                    toolbarEle.find("button[action='bold']").addClass("statusActived");
            }

            parentEle = parentEle.parentElement
        }

    }
}


var RICHEDITOR = {
    currentRange: null,
    currentSelection: null,
    firstFocus: true,
    //rootEle:null,
    elementContainsSelection: function (el) {
        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            for (var i = 0; i < sel.rangeCount; ++i) {
                if (!el.contains(sel.getRangeAt(i).commonAncestorContainer)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    elementWithIdContainsSelection: function (elId) {
        var el = document.getElementById(elId);
        return el && RICHEDITOR.elementContainsSelection(el);
    },

    execCommandToSelection: function (eleId, command, optionalParameter) {
        if (RICHEDITOR.elementWithIdContainsSelection(eleId)) {
            //RICHEDITOR.firstFocus = true;
            document.execCommand(command, false, optionalParameter);
        }
        //if (!RICHEDITOR.firstFocus) {
            RICHEDITOR.testSelectionStatus(document.getElementById(eleId))
       // }
    },
    showColorPicker: [],
    ShowColorPicker: function (event, editorEle, action) {
        var colorContainer = $(event.target).closest(".btnAction")[0].nextElementSibling;
        var colorPicker = colorContainer.querySelector(".colorPicker");
        if (this.showColorPicker[action + editorEle.id]) {
            this.showColorPicker[action + editorEle.id] = false;
            colorPicker.blur();
            return;
        }
        colorPicker.click();
        colorPicker.focus();
        this.showColorPicker[action + editorEle.id] = true;
        var color = '#ffffff';
        const updateColor = function () {
            color = this.value;
        };

        colorPicker.addEventListener('input', updateColor);
        const finalizeColor = function () {
            if (RICHEDITOR.showColorPicker[action + editorEle.id]) {
                RICHEDITOR.showColorPicker[action + editorEle.id] = false;
            }
            //removeListener after final input.
            console.log("apply color: " + color + " for " + action);
            RICHEDITOR.execCommandToSelection(editorEle.id, action, color);
            colorPicker.removeEventListener('input', updateColor);
            colorPicker.removeEventListener('change', finalizeColor);
        };

        colorPicker.addEventListener('change', finalizeColor);

        event.stopPropagation();
        return false;
    },

    insertLink: function (eleId, hasSelection, url, title, text, openInBlank) {
        RICHEDITOR.restoreSelection();
        if (RICHEDITOR.elementWithIdContainsSelection(eleId)) {
            document.execCommand("createLink", false, url);
        }
        else {
            document.getElementById(eleId).innerHTML = document.getElementById(eleId).innerHTML
                + "<a href='" + url + "' title='" + title + "' " + (openInBlank ? "target ='_blank'" : "") + ">" + text + "</a>";
        }
        const container = document.querySelector('#' + eleId);
        const insertedLink = container.querySelector("a:not([id])");
        if (insertedLink) {
            var id = guid().replace("-", "");
            insertedLink.id = id;
            insertedLink.title = title;
            if (openInBlank)
                insertedLink.target = "_blank";
            if (!hasSelection) {
                //update text
                insertedLink.innerText = text;
            }
        }

    },

    GetContent: function (eleId) {
        return document.getElementById(eleId).innerHTML;
    },
    SetContent: function (eleId, value) {
        document.getElementById(eleId).innerHTML = value;
    },
    testSelectionStatus: function (eventElement) {
        var editorEle = eventElement;
        var toolbarEle = $(editorEle).parent(".richEditorRoot").find(".richeditor-toolbar");
        var actionEles = toolbarEle.find(".action");
        for (var i = 0; i < actionEles.length; i++) {
            var ele = actionEles[i];
            var action = $(ele).attr("action");
            switch (action) {
                case "bold": {
                    new toolBar().testSelectionStatus(eventElement.id);
                    break;
                }
            }
        }
    },

    getCurrentFontSize: function (editorId) {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);
            var parentNode = range.startContainer.parentNode;
            var computedStyle = window.getComputedStyle(parentNode);
            var fontSize = computedStyle.getPropertyValue('font-size');
            return fontSize;
        }
        return null;
        //RICHEDITOR.testSelectionStatus(document.getElementById("value_"+editorId))
    },

    setFontSize: function (editorId, value) {
        if (RICHEDITOR.elementWithIdContainsSelection(editorId)) {
            var spanString = $('<span/>', {
                'text': document.getSelection(),
                'id': "value_" + editorId
            }).css('font-size', value).prop('outerHTML');
            //spanString.id = "value_" + editorId;
            document.execCommand('insertHTML', false, spanString);
        }
    },

    recordSelection: function () {
        const selection = window.getSelection() || document.getSelection();
        if (selection && selection.rangeCount > 0) {
            const cursorPos = selection.getRangeAt(0);
            RICHEDITOR.currentRange = cursorPos;
            RICHEDITOR.currentSelection = selection;
        } else {
            RICHEDITOR.currentRange = null;
            RICHEDITOR.currentSelection = selection;
        }
        //debugger;
        var hasSelection = false;
        hasSelection = RICHEDITOR.currentRange && (RICHEDITOR.currentRange.endOffset - RICHEDITOR.currentRange.startOffset) > 0;
        return Boolean(hasSelection);
        /*return selection && selection.rangeCount > 0;*/
    },

    restoreSelection: function () {
        const selection = RICHEDITOR.currentSelection || window.getSelection() || document.getSelection();
        const range = RICHEDITOR.currentRange;
        if (selection && range) {
            selection.removeAllRanges();
            selection.addRange(range);
        }
    },

    insertImage: function (eleId, url) {
        RICHEDITOR.restoreSelection();
        if (RICHEDITOR.elementWithIdContainsSelection(eleId)) {
            document.execCommand("insertImage", false, url);
        }
        else {
            document.getElementById(eleId).innerHTML = document.getElementById(eleId).innerHTML + "<img src='" + url + "'>";
        }
    },

    initInsertedImage: function (eleId, description, width, height) {
        const container = document.querySelector('#' + eleId);
        const insertedImageEle = container.querySelector("img:not([id])");
        if (insertedImageEle) {
            var id = guid().replace("-", "");
            insertedImageEle.id = id;
            insertedImageEle.title = description;
            insertedImageEle.width = width;
            insertedImageEle.height = height;
        }
    }
};