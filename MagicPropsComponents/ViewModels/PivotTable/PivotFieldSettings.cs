using MagicPropsComponents.ViewModels.Shared;

namespace MagicPropsComponents.ViewModels.PivotTable
{
    public class PivotFieldSettings
    {
        public string Name { get; set; }
        public string Caption { get; set; }
        public bool Expand { get; set; }
        public ColumnType ColumnType { get; set; }
        public string? Format { get; set; }
        public SortType SortType { get; set; }
        public FilterType FilterType { get; set; }
        public string CultureString { get; set; } = "en-US";
    }
}
