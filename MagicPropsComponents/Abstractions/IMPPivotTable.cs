using System;
using MagicPropsComponents.ViewModels.PivotTable;
using static MagicPropsComponents.Components.PivotTable.PivotTableGroupingTreeGenerator;

namespace MagicPropsComponents.Abstractions
{
    public interface IMPPivotTable
    {
        public int Width { get; set; }
        public string ClientID { get; set; }
        Task RenderPivotTable(PivotTableAggregatedData aggregatedDataSource, PivotFieldSettings[] colFields, PivotFieldSettings[] rowFields, PivotValueFieldSettings[] valueFields,
            PivotFieldSettings[] filterFields, GroupTreeNode colTreeNode, GroupTreeNode rowTreeNode, List<string> filteredFieldNames, string donetRefId);

    }
}
