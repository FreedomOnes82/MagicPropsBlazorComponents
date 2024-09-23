using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.ViewModels.DataGrid
{
    public class OperationSettings
    {
        public bool AllowAdding { get; set; } = false;
        public bool AllowDeleting { get; set; } = false;
        public bool AllowEditing { get; set; } = false;
        public bool AllowGlobalSearch { get; set; } = false;
        public bool ShowColumnChooser { get; set; } = false;
        public EditingTrigger EditingTrigger { get; set; }
    }


    public enum EditMode
    {
        Default,
        Dialog
    }

    public enum EditingTrigger
    {
        RowClick = 0,
        RowDblClick = 1
    }


    //for gridcolumn-------------------
    public enum EditorType
    {
        Textbox,
        Dropdown,
        Datepicker,
        NumericInput,
        Checkbox
    }

    public class EditorSettings
    {
        public DatepickerSettings? DatepickerSetting { get; set; }//for Datepicker
        public NumberInputSettings? NumberInputSetting { get; set; }//for numberinput
        public DropDownListSettings? DropDownListSettings { get; set; }//for droplist 
    }

    public class DropDownListSettings
    {
        public List<string> OptionSource { get; set; } = new List<string>();
        public bool Multiple { get; set; }
    }

    public class DatepickerSettings
    {
        public DateTime? MaxLimit { get; set; }
        public DateTime? MinLimit { get; set; }
    }

    public class NumberInputSettings
    {
        public decimal? Increment { get; set; } = 1;

        public string Format { get; set; } = string.Empty;
        public string CultureString { get; set; } = "en-US";
    }
}
