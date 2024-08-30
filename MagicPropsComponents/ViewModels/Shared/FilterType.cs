using MagicPropsComponents.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.ViewModels.Shared
{
    public enum FilterType
    {
        DefaultFilter,
        MenuListFilter,
        ConditionFilter
    }
    public class FilterOption
    {
        public ColumnType ColumnType { get; set; }
        public FilterType FilterType { get; set; }
        public string? Keywords { get; set; }
        public List<object>? MenuList { get; set; }
        public ConditionFilterSettings? ConditionFilterSettings { get; set; }
    }

    public class ConditionFilterSettings
    {
        public StringColumnTypeFilterBy? StingFilterBy { get; set; }
        public OtherColumnTypeFilterBy? OtherFilterBy { get; set; }
        public string? Keywords { get; set; }
        public object? KeyValue { get; set; }
    }

    public enum OtherColumnTypeFilterBy
    {
        [EnumDescription("Equal")] Equal,
        [EnumDescription("Not Equal")] NotEqual,
        [EnumDescription("Greater Than")] GreaterThan,
        [EnumDescription("Greater Than Or Equal")] GreaterThanOrEqual,
        [EnumDescription("Less Than")] LessThan,
        [EnumDescription("Less Than Or Equal")] LessThanOrEqual,
        [EnumDescription("Null")] Null,
        [EnumDescription("Not Null")] NotNull,
    }

    public enum StringColumnTypeFilterBy
    {
        [EnumDescription("Starts With")] StartsWith,
        [EnumDescription("Does Not Start With")] DoesNotStartWith,
        [EnumDescription("Ends With")] EndsWith,
        [EnumDescription("Does Not End With")] DoesNotEndWith,
        [EnumDescription("Contains")] Contains,
        [EnumDescription("Does Not Contain")] DoesNotContain,
        [EnumDescription("Equal")] Equal,
        [EnumDescription("Not Equal")] NotEqual,
        [EnumDescription("Empty")] Empty,
        [EnumDescription("Not Empty")] NotEmpty,
        [EnumDescription("Regular Matching")] RegularMatching,
    }
}
