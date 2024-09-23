using Microsoft.AspNetCore.Components;
using MagicPropsComponents.ViewModels.Shared;
using MagicPropsComponents.ViewModels.DataGrid;


namespace MagicPropsComponents.Abstractions.DataGrid
{
    public interface IMPGridColumn
    {
        string ColumnName { get; set; }

        string DisplayName { get; }

        bool Visible { get; set; }

        ColumnType ColumnType { get; set; }

        EditorType EditorType { get; set; }

        string? Format { get; set; }
        bool PrimaryColumn { get; set; }

        EditorSettings? EditorSetting { get; set; }

        RenderFragment<object>? EditTemplate { get; set; }

    }
}
