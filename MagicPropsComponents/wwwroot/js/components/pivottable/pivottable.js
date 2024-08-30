var MPPivotTable = (function () {
    var dataSourceSettings = [];

    function findNode(node, keys) {
        if (node.ParentKeys === keys) {
            return node;
        } else {
            if (node.Children && node.Children.length > 0) {
                for (var i = 0; i < node.Children.length; i++) {
                    var rs = findNode(node.Children[i], keys);
                    if (rs) return rs;
                }
            }
        }
        return null;
    }

    function calculateOpenedLeafCount(node) {
        var isLeaf =
            !node.Children || node.Children.length == 0 || node.IsExpand == false;
        var leafCount = 0;
        if (isLeaf) return 1;
        else
            node.Children.forEach((x) => (leafCount += calculateOpenedLeafCount(x)));
        return leafCount;
    }

    function getMaxOpenedLevel(node, maxOpenedLevel) {
        if (node.Level > maxOpenedLevel) maxOpenedLevel = node.Level;

        if (node.IsExpand && node.Children != null && node.Children.length > 0) {
            for (var i = 0; i < node.Children.length; i++) {
                var child = node.Children[i];
                this.get;
                var level = getMaxOpenedLevel(child, maxOpenedLevel);
                if (level > maxOpenedLevel) maxOpenedLevel = level;
            }
        }

        return maxOpenedLevel;
    }

    function findParent(pNode, node) {
        if (pNode.Children && pNode.Children.length > 0) {
            var isParent = false;
            //pNode.Children.forEach(x => {
            //    if (x.ParentKeys === node.ParentKeys) isParent = true;
            //});
            for (var i = 0; i < pNode.Children.length; i++) {
                if (pNode.Children[i].ParentKeys === node.ParentKeys) return pNode;
            }
            for (var i = 0; i < pNode.Children.length; i++) {
                var n1 = findParent(pNode.Children[i], node);
                if (n1) return n1;
            }
        } else return null;
    }

    function findClickedColNode(rootNode, ele) {
        var colKeys = $(ele).parents("td").attr("colkeys");

        var clickedNode = findNode(rootNode, colKeys);
        return clickedNode;
    }

    function getSettingsByEle(ele) {
        var id = $(ele).parents(".pivot-grid-wrapper").attr("id");
        console.log(id);
        var result = dataSourceSettings[id];
        return result;
    }

    function collapseColNode(ele) {
        console.log("collapse item");
        var datasourceSettings = getSettingsByEle(ele);
        var rootNode = datasourceSettings.rootColNode;
        var clickedNode = findClickedColNode(rootNode, ele);
        var originalExpandedLeaf = clickedNode.ExpandedLeafCount;
        clickedNode.IsExpand = false;
        clickedNode.ExpandedLeafCount = 1;
        var parentNode = findParent(rootNode, clickedNode);
        while (parentNode) {
            parentNode.ExpandedLeafCount =
                parentNode.ExpandedLeafCount - (originalExpandedLeaf - 1);
            parentNode = findParent(rootNode, parentNode);
        }

        renderPivotTableBySettings(datasourceSettings);
        loadDraggedItems(datasourceSettings.rootEle, datasourceSettings.donetRefId);
        console.log(rootNode);
    }

    function expandColNode(ele) {
        console.log("expand item");
        var datasourceSettings = getSettingsByEle(ele);
        var rootNode = datasourceSettings.rootColNode;
        var clickedNode = findClickedColNode(rootNode, ele);
        var originalExpandedLeaf = clickedNode.ExpandedLeafCount;
        clickedNode.IsExpand = true;

        var newExpandedLeaf = calculateOpenedLeafCount(clickedNode);
        clickedNode.ExpandedLeafCount = newExpandedLeaf;
        increasedCount = newExpandedLeaf - originalExpandedLeaf;
        var parentNode = findParent(rootNode, clickedNode);
        while (parentNode) {
            parentNode.ExpandedLeafCount =
                parentNode.ExpandedLeafCount + increasedCount;
            parentNode = findParent(rootNode, parentNode);
        }

        renderPivotTableBySettings(datasourceSettings);
        console.log(clickedNode);
    }

    function expandOrCollapseRowNode(ele) {
        console.log(ele);
        var id = $(ele).parents(".pivot-grid-wrapper").attr("id");
        var rowKeys = $(ele).parents("tr").attr("rowkeys");
        var datasourceSettings = dataSourceSettings[id];
        var clickedNode = findNode(
            datasourceSettings.rootRowNode,
            rowKeys
        );
        clickedNode.IsExpand = !clickedNode.IsExpand;
        renderPivotTableBySettings(datasourceSettings);
    }

    function renderPivotTableBySettings(datasourceSettings) {
        var pivotTbContainerEle = datasourceSettings.rootEle;
        var rowNode = datasourceSettings.rootRowNode;
        var colNode = datasourceSettings.rootColNode;
        var colFields = datasourceSettings.colFields;
        var rowFields = datasourceSettings.rowFields;
        var filters = datasourceSettings.filterFields;
        var arrGroupedData = datasourceSettings.aggregatedRecords;
        var valueFields = datasourceSettings.valueFields;
        var pivotTbContainerEle = datasourceSettings.rootEle;
        var showGrantTotalColumn = datasourceSettings.showGrantTotalColumn;
        var leafColKeys = [];

        $(pivotTbContainerEle).find(".values-captions-container").empty();
        $(pivotTbContainerEle).find(".col-fields-captions-cotnainer").empty();
        $(pivotTbContainerEle).find(".filter-fields-captions-cotnainer").empty();
        var colHeadersTb = $(pivotTbContainerEle).find(".mp-datagrid-header")[0];
        var dataAndRowHeadersTb =
            $(pivotTbContainerEle).find(".mp-pivot-datagrid")[0];
        $(colHeadersTb).empty();
        $(dataAndRowHeadersTb).empty();

        var maxColSpan = 0;
        var maxRowSpan = 0;
        maxRowSpan = getMaxOpenedLevel(colNode, 0);

        //maxOpenedLevel = 0;
        maxColSpan = getMaxOpenedLevel(rowNode, 0);

        var colGroupStr = "<colgroup>";
        colGroupStr += "<col style='width:200px'>";
        //colGroup.append($("<col style='width:200px'>"))
        var colCount =
            colNode.ExpandedLeafCount === 1
                ? 1
                : showGrantTotalColumn
                    ? colNode.ExpandedLeafCount + 1
                    : colNode.ExpandedLeafCount;
        //expanded leaf count == 1 means no column fieds defined
        for (var i = 0; i < colCount * valueFields.length; i++) {
            colGroupStr += "<col style='width:100px'>";
        }
        colGroupStr += "</colgroup>";
        $(colHeadersTb).append($(colGroupStr));
        $(dataAndRowHeadersTb).append($(colGroupStr));

        var htmlValuesCaptions = "";
        valueFields.forEach((x) => {
            //console.log(x);
            var prefix = "";
            switch (x.AggregateFunc) {
                case 0:
                    prefix = "Count of ";
                    break;
                case 1:
                    prefix = "Distinct Count of ";
                    break;
                case 2:
                    prefix = "Sum of ";
                    break;
                case 3:
                    prefix = "Min of ";
                    break;
                case 4:
                    prefix = "Max of ";
                    break;
                case 5:
                    prefix = "Average of ";
                    break;
                default:
                    prefix = "Sum of ";
            }
            htmlValuesCaptions +=
                "<div class='mp-pivot-table-button' title='" +
                prefix +
                x.Caption +
                "' ><span class='item-text'>" +
                prefix +
                x.Caption +
                "</span><span class='d-flex justify-content-center' style='width:30px' id='expand_" +
                x.Name +
                "' onclick=\"MPPivotTable.showAggregrateFunc(event,'" +
                x.Name +
                "', '" +
                pivotTbContainerEle.id +
                "')\" ><i class='fa fa-ellipsis-v'></i></span><img " +
                "src='./_content/MagicPropsComponents/svgs/close.svg' " +
                "width='15' height='15' " +
                "onclick=\"MPPivotTable.removeCaption('" +
                x.Name +
                "', 'Value', '" +
                pivotTbContainerEle.id +
                "')\" />" +
                "</div>";
        });
        var hasValuesCols = valueFields.length > 1;

        $(pivotTbContainerEle)
            .find(".values-captions-container")
            .append($(htmlValuesCaptions));
        var htmlColCaptions = "";

        var rowFieldLevel = 1;
        colFields.forEach((x) => {
            htmlColCaptions +=
                "<div class='mp-pivot-table-button  col-field-bar' title='" +
                x.Caption +
                "' ><span class='item-text'>" +
                x.Caption +
                "</span><img " +
                "src='" +
                getSortImgUrl(x) +
                "' " +
                "width='15' height='15' " +
                "onclick=\"MPPivotTable.switchSortType('" +
                x.Name +
                "', 'Column', '" +
                pivotTbContainerEle.id +
                "')\" />" +
                "<img id='filterPopup_" +
                x.Name +
                "' class='mx-1' " +
                "src='" +
                getFilterIcon(x.Name, pivotTbContainerEle.id) +
                "' " +
                "width='15' height='15' " +
                "onclick=\"MPPivotTable.showFilter(event,'" +
                x.Name +
                "', '" +
                pivotTbContainerEle.id +
                "')\" />" +
                "<img " +
                "src='./_content/MagicPropsComponents/svgs/close.svg' " +
                "width='15' height='15' " +
                "onclick=\"MPPivotTable.removeCaption('" +
                x.Name +
                "', 'Column', '" +
                pivotTbContainerEle.id +
                "')\" />" +
                "</div>";
            rowFieldLevel++;
        });
        var headerRowSpan = hasValuesCols ? maxRowSpan + 1 : maxRowSpan;
        var tdColCapations = $(
            "<td class='stiky-rowHeader col-freeze-header' " +
            (headerRowSpan > 0
                ? "rowspan='" + headerRowSpan.toString() + "'"
                : "") +
            ">"
        );
        $(tdColCapations).append(htmlColCaptions);

        if (colFields.length > 0) {
            $(htmlColCaptions).appendTo(
                $(pivotTbContainerEle).find(".col-fields-captions-cotnainer")
            );
        } else {
            $(
                "<span class='mp-text-left-center-conatiner'>Drop column here.</span>"
            ).appendTo($(pivotTbContainerEle).find(".col-fields-captions-cotnainer"));
        }

        var htmlFilterCaptions = "";
        filters.forEach((x) => {
            htmlFilterCaptions +=
                "<div class='mp-pivot-table-button  col-field-bar' title='" +
                x.Caption +
                "' ><span class='item-text'>" +
                x.Caption +
                "</span><img id='filterPopup_" +
                x.Name +
                "' " +
                "src='" +
                getFilterIcon(x.Name, pivotTbContainerEle.id) +
                "' " +
                "width='15' height='15' " +
                "onclick=\"MPPivotTable.showFilter(event,'" +
                x.Name +
                "', '" +
                pivotTbContainerEle.id +
                "')\" />" +
                "<img class='ms-1' " +
                "src='./_content/MagicPropsComponents/svgs/close.svg' " +
                "width='15' height='15' " +
                "onclick=\"MPPivotTable.removeCaption('" +
                x.Name +
                "', 'Filter', '" +
                pivotTbContainerEle.id +
                "')\" />" +
                "</div>";
            rowFieldLevel++;
        });
        if (filters.length > 0) {
            $(htmlFilterCaptions).appendTo(
                $(pivotTbContainerEle).find(".filter-fields-captions-cotnainer")
            );
        } else {
            $(
                "<span class='mp-text-left-center-conatiner'>Drop filter here.</span>"
            ).appendTo(
                $(pivotTbContainerEle).find(".filter-fields-captions-cotnainer")
            );
        }

        var htmlRowCaptions = "";
        rowFields.forEach((x) => {
            htmlRowCaptions +=
                "<div class='mp-pivot-table-button' title='" +
                x.Caption +
                "' ><span class='item-text'>" +
                x.Caption +
                "</span><img " +
                "src='" +
                getSortImgUrl(x) +
                "' " +
                "width='15' height='15' " +
                "onclick=\"MPPivotTable.switchSortType('" +
                x.Name +
                "', 'Row', '" +
                pivotTbContainerEle.id +
                "')\" />" +
                "<img id='filterPopup_" +
                x.Name +
                "' class='mx-1' " +
                "src='" +
                getFilterIcon(x.Name, pivotTbContainerEle.id) +
                "' " +
                "width='15' height='15' " +
                "onclick=\"MPPivotTable.showFilter(event,'" +
                x.Name +
                "', '" +
                pivotTbContainerEle.id +
                "')\" />" +
                "<img " +
                "src='./_content/MagicPropsComponents/svgs/close.svg' " +
                "width='15' height='15' " +
                "onclick=\"MPPivotTable.removeCaption('" +
                x.Name +
                "', 'Row', '" +
                pivotTbContainerEle.id +
                "')\" />" +
                "</div>";
        });
        var createColHeaders = function (colNode, trs) {
            var isLeaf =
                !colNode.Children ||
                colNode.Children.length == 0 ||
                colNode.IsExpand == false;
            if (isLeaf) {
                leafColKeys.push(colNode.ParentKeys);
            }
            if (colNode.Level > 0) {
                var colSpan =
                    colNode.ExpandedLeafCount > 0 ? colNode.ExpandedLeafCount : 1;
                if (hasValuesCols) {
                    colSpan = colSpan * valueFields.length;
                }

                var strRowspan = "";
                var rowSpanRequired = maxRowSpan - colNode.Level + 1;
                if (isLeaf) {
                    strRowspan =
                        rowSpanRequired > 1
                            ? "rowspan='" + rowSpanRequired.toString() + "'"
                            : "";
                }
                var colText = colNode.Name.split("]:")[1];
                colText = colText && colText.length > 0 ? colText : "&nbsp;";
                var hasChildren = colNode.Children && colNode.Children.length > 0;
                var expandIcon = "";
                if (hasChildren) {
                    if (colNode.IsExpand) {
                        expandIcon =
                            "<button class='btn_pivot_tree_node' onclick='MPPivotTable.collapseColNode(this)' style='border:none; background-color:transparent'><i  class='fa fa-angle-down'></i></button>";
                    } else {
                        expandIcon =
                            "<button class='btn_pivot_tree_node'  onclick='MPPivotTable.expandColNode(this)' style='border:none; background-color:transparent'><i class='fa fa-angle-right'></i></button>";
                    }
                }
                var td = $(
                    "<td colKeys='" +
                    colNode.ParentKeys +
                    "' " +
                    strRowspan +
                    " class='col-freeze-header' " +
                    (colSpan > 1 ? "colspan='" + colSpan.toString() + "'" : "") +
                    ">" +
                    expandIcon +
                    colText +
                    "</td>"
                );
                var tr = trs.find((x) => x.level === colNode.Level);
                if (!tr) {
                    tr = { level: colNode.Level, tr: $("<tr></tr>") };
                    trs.push(tr);
                }
                tr.tr.append(td);

                if (isLeaf && hasValuesCols) {
                    // Multiple values, add values caption headers
                    var trValues = trs.find(
                        (x) => x.level === colNode.Level + rowSpanRequired
                    );
                    if (!trValues) {
                        trValues = {
                            level: colNode.Level + rowSpanRequired,
                            tr: $("<tr></tr>"),
                        };
                        trs.push(trValues);
                    }

                    valueFields.forEach((x) => {
                        var tdValue = $(
                            "<td class='col-freeze-header' >" + x.Caption + "</td>"
                        );
                        trValues.tr.append(tdValue);
                    });
                }
            }

            if (colNode.IsExpand && colNode.Children && colNode.Children.length > 0) {
                colNode.Children.forEach((x) => createColHeaders(x, trs));
            }
        };
        var createColHeaderRows = function (maxRowSpan, colNode) {
            var tr = $("<tr></tr>");
            var headerRowSpan = hasValuesCols ? maxRowSpan + 1 : maxRowSpan;

            var td = $(
                "<td class='stiky-rowHeader col-freeze-header' rowspan='" +
                headerRowSpan.toString() +
                "'></td>"
            );

            if (rowFields.length > 0) $(td).append(htmlRowCaptions);
            else {
                $(td).append(
                    "<span class='mp-text-center-container'>Drop row here.</span>"
                );
            }
            tr.append(td);

            var trs = [];
            trs.push({ level: 1, tr: tr });

            createColHeaders(colNode, trs);
            //console.log("Leaf col keys:")
            //console.log(leafColKeys);
            trs = trs.sort((a, b) => a.level - b.level);
            trs.forEach((x) => {
                x.tr.appendTo(colHeadersTb);
            });
        };

        createColHeaderRows(maxRowSpan, colNode);

        var arrayEqual = function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                return false;
            }
            // arr1.forEach(x => console.log(x.toString()))
            return arr1.every(
                (value, index) => (value ? value.toString() : "") === arr2[index]
            );
        };

        var createDataCells = function (tr, rowKeys) {
            //var rowKeys = rNode.ParentKeys.split(',');
            for (var i = 0; i < leafColKeys.length; i++) {
                var isGrantCol = leafColKeys[i] === "**GrantTotal**";
                var colKeys = isGrantCol ? [] : leafColKeys[i].split(","); // leafColKeys[i].split(',');
                var cellClass = isGrantCol ? "class='gc'" : "";
                var keys = colKeys.concat(rowKeys);
                var suitableDatas = arrGroupedData.GroupedData.filter((x) =>
                    arrayEqual(x.Keys, keys)
                );
                if (suitableDatas && suitableDatas.length > 0) {
                    var values = suitableDatas[0].Values;
                    values.forEach((x) => {
                        tr.append($("<td " + cellClass + ">" + x.toString() + "</td>"));
                    });
                } else {
                    for (var j = 0; j < valueFields.length; j++) {
                        tr.append($("<td " + cellClass + ">-</td>"));
                    }
                }
            }
        };

        var createGrantTotalRow = function () {
            var tr = $("<tr  rowKeys='' isLeaf='1' class='gr'></tr>");
            var rowHeaderText = "Grant Total";
            var tdCaption = $(
                "<td class='stiky-rowHeader'><span class='row-header row-level0'> " +
                rowHeaderText +
                "</span></td>"
            );
            tdCaption.appendTo(tr);
            //Create Data Cells
            createDataCells(tr, []);
            //TODO: Create grant total cell.
            tr.appendTo(dataAndRowHeadersTb);
        };

        var createDataRows = function (rNode, colNode) {
            if (rNode.Level > 0) {
                var isLeaf = !rNode.Children || rNode.Children.length == 0;
                var tr = $(
                    "<tr  rowKeys='" +
                    rNode.ParentKeys +
                    "' isLeaf='" +
                    (isLeaf ? "1" : "0") +
                    "'></tr>"
                );
                var iconClass = rNode.IsExpand ? "fa-angle-down" : "fa-angle-right";
                var btnTreeNode =
                    isLeaf == false
                        ? "<button class='btn_pivot_tree_node' onclick='MPPivotTable.expandOrCollapseRowNode(this)' style='border:none; background-color:transparent'><i class='fa " +
                        iconClass +
                        "'></i></button>"
                        : "";
                var rowHeaderText = rNode.Name.split("]:")[1];
                rowHeaderText =
                    rowHeaderText && rowHeaderText.length > 0 ? rowHeaderText : "&nbsp;";
                var tdCaption = $(
                    "<td class='stiky-rowHeader'><span class='row-header row-level" +
                    rNode.Level +
                    "'> " +
                    btnTreeNode +
                    rowHeaderText +
                    "</span></td>"
                );
                if (rNode.Level > 0) {
                    const indentedText = " ".repeat(rNode.Level * 2) + rowHeaderText;
                }
                tdCaption.appendTo(tr);
                //Create Data Cells
                var rowKeys = rNode.ParentKeys.split(",");
                createDataCells(tr, rowKeys);
                //TODO: Create grant total cell.
                tr.appendTo(dataAndRowHeadersTb);
            }

            if (rNode.IsExpand && rNode.Children && rNode.Children.length > 0) {
                rNode.Children.forEach((x) => createDataRows(x, colNode));
            }
        };
        createDataRows(rowNode, colNode);
        createGrantTotalRow();
        //TODO:Create Grant total row...

        var headerDiv = $(pivotTbContainerEle).find(".pivot-headerRoot")[0];
        var bodyDiv = $(pivotTbContainerEle).find(".pivot-body-root")[0];
        const headerWrapperDiv = $(headerDiv).find(".mp-datagrid-header-wrapper");
        const scrollbarWidth = bodyDiv.offsetWidth - bodyDiv.clientWidth;
        if (bodyDiv.scrollHeight != bodyDiv.clientHeight) {
            headerDiv.style.paddingRight = `${scrollbarWidth}px`;
            headerWrapperDiv[0].style.borderRight = "1px solid grey";
            //$(headerDiv).addClass("mp-scroll-mask");
        } else {
            headerDiv.style.paddingRight = "0px";
            headerWrapperDiv[0].style.borderRight = "none";
            //$(headerDiv).removeClass("mp-scroll-mask");
        }

        var addedAdditionalBorder = false;
        bodyDiv.addEventListener("scroll", function () {
            $(headerDiv).find(".mp-datagrid-header-wrapper")[0].scrollLeft =
                bodyDiv.scrollLeft;
            if (bodyDiv.scrollLeft > 0 && addedAdditionalBorder == false) {
                addedAdditionalBorder = true;
                $(".stiky-rowHeader").addClass("sticky-additional-border");
            }

            if (bodyDiv.scrollLeft == 0) {
                addedAdditionalBorder = false;
                $(".stiky-rowHeader").removeClass("sticky-additional-border");
            }
        });
        //set valuefields container to have the same width as  rowfields container.
        var firstColEle = $(pivotTbContainerEle).find(
            ".stiky-rowHeader.col-freeze-header"
        )[0];
        var valuesContainer = $(pivotTbContainerEle).find(
            ".values-captions-container"
        )[0];
        valuesContainer.style.width = `${firstColEle.getBoundingClientRect().width
            }px`;
    }

    function renderPivotTable(
        pivotTbContainerEle,
        strAggregatedRecords,
        strColFields,
        strRowFields,
        strValueFields,
        filterFields,
        strColNode,
        strRowNode,
        filteredFieldNames,
        donetRefId
    ) {
        console.log("groupedDatas:");
        var arrGroupedData = JSON.parse(strAggregatedRecords);
        console.log(arrGroupedData);
        //console.log("Filter fields:")

        var filters = JSON.parse(filterFields);
        //console.log(filters)

        // console.log("col node:")
        var colNode = JSON.parse(strColNode);
        // console.log(colNode)

        //console.log("row node:")
        var rowNode = JSON.parse(strRowNode);
        // console.log(rowNode)

        var valueFields = JSON.parse(strValueFields);

        var rowFields = JSON.parse(strRowFields);
        var colFields = JSON.parse(strColFields);

        var id = $(pivotTbContainerEle).attr("id");
        var showGrantTotalColumn = true;
        if (showGrantTotalColumn) {
            var grantTotalNode = colNode.Children.find(
                (x) => x.Name === "[]:Grant Total"
            );
            if (!grantTotalNode) {
                var grantNode = {
                    Level: 1,
                    ExpandedLeafCount: 1,
                    Name: "[]:Grant Total",
                    Caption: "Grant Total",
                    ParentKeys: "**GrantTotal**",
                };
                colNode.Children.push(grantNode);
            }
        }

        dataSourceSettings[id] = {
            rootEle: pivotTbContainerEle,
            rootRowNode: rowNode,
            rootColNode: colNode,
            colFields: colFields,
            rowFields: rowFields,
            valueFields: valueFields,
            filterFields: filters,
            aggregatedRecords: arrGroupedData,
            showGrantTotalColumn: true,
            filteredFieldNames: filteredFieldNames,
            donetRefId: donetRefId,
        };
        renderPivotTableBySettings(dataSourceSettings[id]);
        loadDraggedItems(pivotTbContainerEle, donetRefId);
    }

    function loadDraggedItems(pivotTbContainerEle, donetRefId) {
        const colCaptionContainer = $(pivotTbContainerEle).find(
            ".col-fields-captions-cotnainer"
        )[0];
        const rowCaptionContianer =
            $(pivotTbContainerEle).find(".stiky-rowHeader")[0];
        const filterCaptionContainer = $(pivotTbContainerEle).find(
            ".filter-fields-captions-cotnainer"
        )[0];
        const valueCaptionContianer = $(pivotTbContainerEle).find(
            ".values-captions-container"
        )[0];

        const newItems = $(
            $(pivotTbContainerEle).find(".mp-pivot-table-button")
        ).find(".item-text");
        const containerConfigs = [
            { container: colCaptionContainer, type: "Column" },
            { container: rowCaptionContianer, type: "Row" },
            { container: filterCaptionContainer, type: "Filter" },
            { container: valueCaptionContianer, type: "Value" },
        ];

        const settingsOpts = {
            droppingCallback: function (draggedElement, droppingElement) {
                var originalContainer = "";
                var targetContainer = "";
                var captionName = "";
                let flag = 0;
                for (const config of containerConfigs) {
                    if (droppingElement === config.container) {
                        targetContainer = config.type;
                        flag += 1;
                        if (flag == 2) break;
                    }
                    if (draggedElement.parentElement.parentElement === config.container) {
                        flag += 1;
                        originalContainer = config.type;
                        captionName = draggedElement.textContent;
                        if (originalContainer == "Value") {
                            captionName = getValueCaption(captionName);
                        }
                        if (flag == 2) break;
                    }
                }
                if (!originalContainer || !targetContainer || !captionName) return; // If the container type is not recognized, exit the function
                window
                    .getDotNetRef(donetRefId)
                    .invokeMethodAsync(
                        "HandelDragedField",
                        originalContainer,
                        targetContainer,
                        captionName
                    );
            },
        };
        initDraggedItems(newItems, containerConfigs, settingsOpts);
    }

    function loadFeildChooserDraggedItems(dialogContainerEle, donetRefId) {
        const allCaptionCaontainer = $(dialogContainerEle).find(
            ".mp-pivot-fchooser-fieldlist-container"
        )[0];
        const otherConatiners = $(dialogContainerEle).find(
            ".mp-pivot-fchooser-fieldtype-container"
        );
        if (otherConatiners.length != 4) {
            alert("Load error...");
            return;
        }
        const filterCaptionContainer = $(otherConatiners[0]).find(
            ".item-container"
        )[0];
        const rowCaptionContianer = $(otherConatiners[1]).find(
            ".item-container"
        )[0];
        const colCaptionContainer = $(otherConatiners[2]).find(
            ".item-container"
        )[0];
        const valueCaptionContianer = $(otherConatiners[3]).find(
            ".item-container"
        )[0];

        const draggedItemContainer = $(dialogContainerEle).find(
            ".mp-pivot-fchooser-flexible-item"
        );
        const draggedItems = $(draggedItemContainer).find(".item-text");
        console.log(draggedItems);
        const containerConfigs = [
            {
                container: $(allCaptionCaontainer).find(".list-container")[0],
                type: "All",
            },
            { container: colCaptionContainer, type: "Column" },
            { container: rowCaptionContianer, type: "Row" },
            { container: filterCaptionContainer, type: "Filter" },
            { container: valueCaptionContianer, type: "Value" },
        ];
        const settingsOpts = {
            droppingCallback: function (draggedElement, droppingElement) {
                var originalContainer = "";
                var targetContainer = "";
                var captionName = "";
                for (const config of containerConfigs) {
                    if (droppingElement === config.container) {
                        targetContainer = config.type;
                    }
                    if (draggedElement.parentElement.parentElement === config.container) {
                        originalContainer = config.type;
                        captionName = draggedElement.textContent;
                        if (originalContainer == "Value") {
                            captionName = getValueCaption(captionName);
                        }
                    }
                }
                if (!originalContainer || !targetContainer || !captionName) return;
                window
                    .getDotNetRef(donetRefId)
                    .invokeMethodAsync(
                        "HandleFieldChooserDialogDragging",
                        originalContainer,
                        targetContainer,
                        captionName
                    );
                if (targetContainer != "All") {
                    var newItems = [];
                    const timer = setTimeout(() => {
                        switch (targetContainer) {
                            case "Column":
                                newItems = $(
                                    $(colCaptionContainer).find(
                                        ".mp-pivot-fchooser-flexible-item"
                                    )
                                ).find(".item-text");
                                break;
                            case "Row":
                                newItems = $(
                                    $(rowCaptionContianer).find(
                                        ".mp-pivot-fchooser-flexible-item"
                                    )
                                ).find(".item-text");
                                break;
                            case "Filter":
                                newItems = $(
                                    $(filterCaptionContainer).find(
                                        ".mp-pivot-fchooser-flexible-item"
                                    )
                                ).find(".item-text");
                                break;
                            case "Value":
                                newItems = $(
                                    $(valueCaptionContianer).find(
                                        ".mp-pivot-fchooser-flexible-item"
                                    )
                                ).find(".item-text");
                                break;
                        }
                        initDraggedItems(
                            newItems,
                            containerConfigs,
                            settingsOpts
                        );
                        clearTimeout(timer);
                    }, 300);
                }
            },
        };
        initDraggedItems(draggedItems, containerConfigs, settingsOpts);
    }

    function initDraggedItems(draggedItems, containerConfigs, settingsOpts) {
        containerConfigs.forEach((config) => {
            const items = Array.from(draggedItems).filter(
                (item) => item.parentElement.parentElement == config.container
            );
            if (items.length > 0) {
                const targetContainers = containerConfigs
                    .filter((c) => c !== config)
                    .map((c) => c.container);
                new ManyToManyDragging(items, targetContainers, settingsOpts);
            }
        });
    }

    function getValueCaption(content) {
        var result = "";
        if (content.startsWith("Count of ")) {
            result = content.substring("Count of ".length, content.length);
        } else if (content.startsWith("Distinct Count of ")) {
            result = content.substring("Distinct Count of ".length, content.length);
        } else if (content.startsWith("Sum of ")) {
            result = content.substring("Sum of ".length, content.length);
        } else if (content.startsWith("Min of ")) {
            result = content.substring("Min of ".length, content.length);
        } else if (content.startsWith("Max of ")) {
            result = content.substring("Max of ".length, content.length);
        } else if (content.startsWith("Average of ")) {
            result = content.substring("Average of ".length, content.length);
        }
        return result;
    }

    function getSortImgUrl(field) {
        switch (field.SortType) {
            case 0:
                return "./_content/MagicPropsComponents/svgs/sort-unsorted.svg";
            case 1:
                return "./_content/MagicPropsComponents/svgs/sort-asc.svg";
            case 2:
                return "./_content/MagicPropsComponents/svgs/sort-desc.svg";
        }
    }

    function removeCaption(fieldName, fieldContainer, pvId) {
        const donetId = dataSourceSettings[pvId].donetRefId;
        window
            .getDotNetRef(donetId)
            .invokeMethodAsync("HandleDeleteField", fieldContainer, fieldName);
        //console.log(fieldName, fieldContainer, donetId);
    }

    function showFilter(event, fieldName, pvId) {
        //event.stopPropagation();
        const donetId = dataSourceSettings[pvId].donetRefId;
        window
            .getDotNetRef(donetId)
            .invokeMethodAsync("HandleShowFilter", fieldName);
    }

    function showAggregrateFunc(event, fieldName, pvId) {
        const donetId = dataSourceSettings[pvId].donetRefId;
        window
            .getDotNetRef(donetId)
            .invokeMethodAsync("HandleShowAggragateFunc", fieldName);
    }

    function getFilterIcon(fieldName, pvId) {
        if (
            dataSourceSettings[pvId].filteredFieldNames.indexOf(fieldName) > -1
        ) {
            return "./_content/MagicPropsComponents/svgs/filtered.svg";
        } else {
            return "./_content/MagicPropsComponents/svgs/filter.svg";
        }
    }

    function switchSortType(fieldName, fieldContainer, pvId) {
        const donetId = dataSourceSettings[pvId].donetRefId;
        window
            .getDotNetRef(donetId)
            .invokeMethodAsync("HandleSwitchSortType", fieldContainer, fieldName);
    }

    function getTableData(tableEle) {
        const data = [];

        let colCount = 0;
        var colgroup = tableEle.querySelector("colgroup");
        if (colgroup) {
            colCount = colgroup.children.length;
        }

        for (let i = 0; i < tableEle.rows.length; i++) {
            let rowData = [];
            for (let j = 0; j < colCount; j++) {
                rowData.push("");
            }
            data.push(rowData);
        }
        const mergeInfo = getMergedCellsInfo(tableEle);

        let oriData = [];
        for (let i = 0; i < tableEle.rows.length; i++) {
            let rowData = [];
            for (let j = 0; j < tableEle.rows[i].cells.length; j++) {
                const cell = tableEle.rows[i].cells[j];
                rowData.push(cell.textContent.trim());
            }
            oriData.push(rowData);
        }
        if (mergeInfo.length == 0) {
            return oriData;
        }

        for (let i = 0; i < tableEle.rows.length; i++) {
            if (oriData[i].length == colCount) {
                data[i] = oriData[i];
                continue;
            }
            const relativeMerge = mergeInfo.filter(
                (x) => (x.s.r < i && x.e.r >= i) || (x.s.r == i && x.e.c - x.s.c > 0)
            );
            const colSpanRelativeMerge = mergeInfo.filter(
                (x) => x.s.r == i && x.e.c - x.s.c > 0
            );
            let row = oriData[i];
            relativeMerge.sort((a, b) => a.s.c - b.s.c);
            relativeMerge.forEach((x) => {
                const index = x.s.c;
                const lesscount = x.e.c - x.s.c;
                let part1 = row.slice(0, index);
                let part2 = row.slice(index);
                let fillData = [];
                if (colSpanRelativeMerge.indexOf(x) > -1) {
                    for (let m = 0; m < lesscount; m++) {
                        fillData.push(row[index]);
                    }
                } else {
                    for (let m = 0; m < lesscount + 1; m++) {
                        fillData.push(data[i - 1][index]);
                    }
                }
                row = part1.concat(fillData).concat(part2);
            });
            data[i] = row;
        }
        return data;
    }

    function getMergedCellsInfo(tableElement) {
        let mergedCells = [];
        for (let rowIndex = 0; rowIndex < tableElement.rows.length; rowIndex++) {
            let row = tableElement.rows[rowIndex];
            for (let colIndex = 0; colIndex < row.cells.length; colIndex++) {
                let cell = row.cells[colIndex];
                if (cell.rowSpan > 1 || cell.colSpan > 1) {
                    let startCell = { r: rowIndex, c: colIndex };
                    let endCell = {
                        r: rowIndex + cell.rowSpan - 1,
                        c: colIndex + cell.colSpan - 1,
                    };
                    mergedCells.push({ startCell, endCell });
                }
            }
        }

        //mergedCells.sort((a, b) => a.fromCol - b.fromCol)
        for (let i = 0; i < mergedCells.length; i++) {
            var firstFilter = mergedCells.filter(
                (x, index) => index < i && x.endCell.r >= mergedCells[i].startCell.r
            );

            let preColSpanCount = 0;
            let impactList = [];
            firstFilter.sort((a, b) => a.startCell.c - b.startCell.c); //must sort by startcell.colIndex, otherwise subsequent indices may be incorrect
            for (let j = 0; j < firstFilter.length; j++) {
                if (firstFilter[j].endCell.r >= mergedCells[i].startCell.r) {
                    if (preColSpanCount >= firstFilter[j].startCell.c) {
                        impactList.push(firstFilter[j]); //all mergeinfo would impact currentcell
                        preColSpanCount +=
                            firstFilter[j].endCell.c - firstFilter[j].startCell.c + 1;
                    }
                }
            }
            const selfColSpan = mergedCells[i].endCell.c - mergedCells[i].startCell.c;
            if (preColSpanCount > 0) {
                mergedCells[i].startCell.c = preColSpanCount;
                mergedCells[i].endCell.c = preColSpanCount + selfColSpan;
            }
        }

        const merges = [];
        for (let i = 0; i < mergedCells.length; i++) {
            const startInfo = {};
            const endInfo = {};
            startInfo.r = mergedCells[i].startCell.r;
            startInfo.c = mergedCells[i].startCell.c;
            endInfo.r = mergedCells[i].endCell.r;
            endInfo.c = mergedCells[i].endCell.c;
            merges.push({ s: startInfo, e: endInfo });
        }
        return merges;
    }

    function exportExcel(id) {
        var container = dataSourceSettings[id].rootEle;
        const tableEle = $(container).find(".mp-pivot-datagrid")[0];
        const headersEle = $(container).find(".mp-datagrid-header")[0];

        const exportData = getTableData(tableEle);
        const exportHeaderData = getTableData(headersEle);
        const exportMerges = getMergedCellsInfo(headersEle);

        exportHeaderData[0][0] = "";
        const data = exportHeaderData.concat(exportData);

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);

        const boldStyle = { fill: { fgColor: { rgb: "80AAF9" } } };

        //first column
        for (let i = 0; i < data.length; i++) {
            if (data[i][0]) {
                let cellRef = XLSX.utils.encode_cell({ c: 0, r: i });
                ws[cellRef].s = boldStyle;
            }
        }
        //end total related column
        for (let i = 0; i < data.length; i++) {
            for (
                let j = exportData[0].length - 1;
                j >
                exportData[0].length -
                1 -
                dataSourceSettings[id].valueFields.length;
                j--
            ) {
                if (data[i][j] !== undefined) {
                    let cellRef = XLSX.utils.encode_cell({ c: j, r: i });
                    ws[cellRef].s = boldStyle;
                }
            }
        }
        //The first three rows
        for (let r = 0; r < exportHeaderData.length; r++) {
            for (let c = 0; c < data[r].length; c++) {
                if (data[r][c] !== undefined) {
                    let cellRef = XLSX.utils.encode_cell({ c: c, r: r });
                    ws[cellRef].s = {
                        fill: { fgColor: { rgb: "80AAF9" } },
                        //alignment: { horizontal: 'center', vertical: 'center' },
                        border: {
                            top: { style: "thin", color: { rgb: "00000000" } },
                            bottom: { style: "thin", color: { rgb: "00000000" } },
                            left: { style: "thin", color: { rgb: "00000000" } },
                            right: { style: "thin", color: { rgb: "00000000" } },
                        },
                    };
                }
            }
        }
        //last row about total
        const lastRowIndex = data.length - 1;
        for (let c = 0; c < exportData[0].length; c++) {
            if (data[lastRowIndex][c] !== undefined) {
                let cellRef = XLSX.utils.encode_cell({ c: c, r: lastRowIndex });
                ws[cellRef].s = boldStyle;
            }
        }

        ws["!merges"] = exportMerges;
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "Export.xlsx");
    }

    function releaseData(componentRootEleId) {
        delete dataSourceSettings[componentRootEleId];
        console.log("Releasing data..");
    }

    return {
        collapseColNode: collapseColNode,
        expandColNode: expandColNode,
        expandOrCollapseRowNode: expandOrCollapseRowNode,
        renderPivotTable: renderPivotTable,
        loadFeildChooserDraggedItems: loadFeildChooserDraggedItems,
        initDraggedItems: initDraggedItems,
        removeCaption: removeCaption,
        switchSortType: switchSortType,
        showFilter: showFilter,
        showAggregrateFunc: showAggregrateFunc,
        exportExcel: exportExcel,
        releaseData: releaseData
    };
})();
