using MagicPropsComponents.Utilities;
using MagicPropsComponents.ViewModels.Shared;
using MagicPropsComponents.ViewModels.DataGrid;

namespace MagicPropsComponents.Abstractions.DataGrid
{
    public interface IMPDataGrid
    {
        object SelectedRow { get; set; }
        object EditRowClone { get; set; }
        object NewData { get; set; }
        object SampleData { get; set; }
        EditMode EditMode { get; set; }
        void AddColumn(IMPGridColumn column);
        List<IMPGridColumn> DisplayedColumns { get; set; }
        bool ShowToolbar();
        void AddValidationErrorField(string columnId);
        void RemoveValidationErrorField(string columnId);
        void SortData(string columnName, SortType sortType);
        bool CheckIsFiltered(string columnName);
        List<object> GetDefaultMenuList(string columnName);
        void AddFilter(string columnName, FilterOption filterCondition);
        void RemoveFilter(string columnName);
    }
}
