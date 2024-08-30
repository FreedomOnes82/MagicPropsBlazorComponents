using MagicPropsComponents.ViewModels.Shared;

namespace MagicPropsComponents.ViewModels.PivotTable
{
    public class FieldDefinition
    {
        public string ID { get; set; } = string.Empty;
        public string DisplayText { get; set; } = string.Empty;
        public string FieldName { get; set; } = string.Empty;
        public PivotTableFieldTypes Type { get; set; }
        public bool Applied { get; set; }
        public AggregateFuncs? AggregateFunc { get; set; }
        public SortType SortType { get; set; }
        public ColumnType ColumnType { get; set; }
        public FilterType FilterType { get; set; }
        public string? Format { get; set; }
        public string CultureString { get; set; } = "en-US";
    }
}
