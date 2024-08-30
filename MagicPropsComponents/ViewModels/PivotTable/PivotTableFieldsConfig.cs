using MagicPropsComponents.ViewModels.Shared;


namespace MagicPropsComponents.ViewModels.PivotTable
{
    public class PivotTableFieldsConfig
    {
        public List<PivotFieldSettings> RowFields { get; set; }
        public List<PivotFieldSettings> ColumnFields { get; set; }
        public List<PivotFieldSettings> FilterFields { get; set; }
        public List<PivotValueFieldSettings> ValueFields { get; set; }
        public Dictionary<string, FilterOption> FilterPara { get; set; }

    }
}
