using MagicPropsComponents.Utilities;
using MagicPropsComponents.ViewModels.Shared;
using System.Reflection;
using System.Text.RegularExpressions;

namespace MagicPropsComponents.Components.PivotTable
{
    public class EnumerableDataFilter
    {

        public IEnumerable<object> Filter(IEnumerable<object> source, Dictionary<string, FilterOption> filterParams, PropertyByLambda[] properties, bool ignoreCase = true)
        {
            var filterProperties = properties.Where(x => filterParams.Keys.Contains(x.Name));
            foreach (var item in source)
            {
                bool shouldInclude = false;

                foreach (var kvp in filterParams)
                {
                    string propertyName = kvp.Key;
                    FilterOption filterOption = kvp.Value;

                    if (filterProperties == null)
                    {
                        continue;
                    }

                    PropertyInfo propertyInfo = item.GetType().GetProperty(propertyName);
                    if (propertyInfo == null)
                    {
                        continue;
                    }

                    object propertyValue = propertyInfo.GetValue(item);

                    switch (filterOption.FilterType)
                    {
                        case FilterType.DefaultFilter:
                            if (string.IsNullOrEmpty(filterOption.Keywords)) { shouldInclude = true; break; }
                            if (propertyValue is string strValue)
                            {
                                if (ignoreCase && strValue.ToLower().IndexOf(filterOption.Keywords.ToLower()) > -1)
                                {
                                    shouldInclude = true; break;
                                }
                                if (!ignoreCase && strValue.IndexOf(filterOption.Keywords) > -1)
                                {
                                    shouldInclude = true; break;
                                }
                                shouldInclude = false;
                            }
                            break;
                        case FilterType.MenuListFilter:
                            if (filterOption.MenuList == null || propertyValue == null) break;
                            switch (filterOption.ColumnType)
                            {
                                case ColumnType.Number:
                                    {
                                        var _numbermenuList = new List<object>();
                                        foreach (var menuobj in filterOption.MenuList)
                                        {
                                            _numbermenuList.Add(Convert.ToDecimal(menuobj?.ToString()));
                                        }
                                        shouldInclude = _numbermenuList.Contains(propertyValue);
                                    }
                                    break;
                                case ColumnType.Date:
                                    {
                                        var _datemenuList = new List<object>();
                                        foreach (var menuobj in filterOption.MenuList)
                                        {
                                            _datemenuList.Add(Convert.ToDateTime(menuobj?.ToString()));
                                        }
                                        shouldInclude = _datemenuList.Contains(propertyValue);
                                    }
                                    break;
                                case ColumnType.Boolean:
                                    {
                                        var _boolmenuList = new List<object>();
                                        foreach (var menuobj in filterOption.MenuList)
                                        {
                                            _boolmenuList.Add(Convert.ToBoolean(menuobj?.ToString()));
                                        }
                                        shouldInclude = _boolmenuList.Contains(propertyValue);
                                    }
                                    break;
                                case ColumnType.Default:
                                default:
                                    {
                                        var _stringmenuList = new List<object>();
                                        foreach (var menuobj in filterOption.MenuList)
                                        {
                                            _stringmenuList.Add(menuobj?.ToString());
                                        }
                                        shouldInclude = _stringmenuList.Contains(propertyValue);
                                    }; break;
                            }
                          
                            break;
                        case FilterType.ConditionFilter:
                            if (filterOption.ConditionFilterSettings == null)
                            {
                                shouldInclude = true; continue;
                            }
                            shouldInclude = CheckIsPassCondtion(propertyValue, filterOption.ColumnType, filterOption.ConditionFilterSettings, ignoreCase);
                            break;
                    }
                    if (!shouldInclude)
                    {
                        break;
                    }
                }

                if (shouldInclude)
                {
                    yield return item;
                }
            }
        }

        private bool CheckIsPassCondtion(object? value, ColumnType columnType, ConditionFilterSettings condition, bool ignoreCase = true)
        {
            switch (columnType)
            {
                case ColumnType.Default:
                    if (condition.StingFilterBy == null) return true;
                    switch (condition.StingFilterBy)
                    {
                        case StringColumnTypeFilterBy.Empty: return value == null;
                        case StringColumnTypeFilterBy.NotEmpty: return value != null;
                    }
                    if (value is string _stringValue)
                    {
                        var _keyValue = condition.Keywords ?? string.Empty;
                        if (!ignoreCase)
                        {
                            _stringValue = _stringValue.ToLower();
                            _keyValue = _keyValue.ToLower();
                        }
                        switch (condition.StingFilterBy)
                        {
                            case StringColumnTypeFilterBy.StartsWith: return !string.IsNullOrEmpty(_keyValue) && _stringValue.StartsWith(_keyValue);
                            case StringColumnTypeFilterBy.DoesNotStartWith: return !string.IsNullOrEmpty(_keyValue) && !_stringValue.StartsWith(_keyValue);
                            case StringColumnTypeFilterBy.EndsWith: return !string.IsNullOrEmpty(_keyValue) && _stringValue.EndsWith(_keyValue);
                            case StringColumnTypeFilterBy.DoesNotEndWith: return !string.IsNullOrEmpty(_keyValue) && !_stringValue.EndsWith(_keyValue);
                            case StringColumnTypeFilterBy.Contains: return !string.IsNullOrEmpty(_keyValue) && _stringValue.Contains(_keyValue);
                            case StringColumnTypeFilterBy.DoesNotContain: return !string.IsNullOrEmpty(_keyValue) && !_stringValue.Contains(_keyValue);
                            case StringColumnTypeFilterBy.Equal: return _stringValue.Equals(_keyValue);
                            case StringColumnTypeFilterBy.NotEqual: return !_stringValue.Equals(_keyValue);
                            case StringColumnTypeFilterBy.RegularMatching: return !string.IsNullOrEmpty(_keyValue) && Regex.IsMatch(_stringValue, _keyValue);
                        }
                    }
                    return false;
                case ColumnType.Number:
                    if (condition.OtherFilterBy == null) return false;
                    switch (condition.OtherFilterBy)
                    {
                        case OtherColumnTypeFilterBy.Null: return value == null;
                        case OtherColumnTypeFilterBy.NotNull: return value != null;
                    }
                    //Console.WriteLine(value?.GetType());
                    var _numValue = Convert.ToDecimal(value);
                    if (condition.KeyValue is decimal _numKeyValue)
                    {
                        switch (condition.OtherFilterBy)
                        {
                            case OtherColumnTypeFilterBy.Equal: return _numKeyValue == _numValue;
                            case OtherColumnTypeFilterBy.NotEqual: return _numKeyValue != _numValue;
                            case OtherColumnTypeFilterBy.GreaterThan: return _numValue > _numKeyValue;
                            case OtherColumnTypeFilterBy.GreaterThanOrEqual: return _numValue >= _numKeyValue;
                            case OtherColumnTypeFilterBy.LessThan: return _numValue < _numKeyValue;
                            case OtherColumnTypeFilterBy.LessThanOrEqual: return _numValue <= _numKeyValue;
                        }
                    }
                    else
                    {
                        try
                        {
                            decimal numKeyValue = Convert.ToDecimal(condition.KeyValue?.ToString());
                            switch (condition.OtherFilterBy)
                            {
                                case OtherColumnTypeFilterBy.Equal: return numKeyValue == _numValue;
                                case OtherColumnTypeFilterBy.NotEqual: return numKeyValue != _numValue;
                                case OtherColumnTypeFilterBy.GreaterThan: return _numValue > numKeyValue;
                                case OtherColumnTypeFilterBy.GreaterThanOrEqual: return _numValue >= numKeyValue;
                                case OtherColumnTypeFilterBy.LessThan: return _numValue < numKeyValue;
                                case OtherColumnTypeFilterBy.LessThanOrEqual: return _numValue <= numKeyValue;
                            }
                        }
                        catch
                        {
                            return false;
                        }

                    }
                    return false;
                case ColumnType.Date:
                    if (condition.OtherFilterBy == null) return false;
                    switch (condition.OtherFilterBy)
                    {
                        case OtherColumnTypeFilterBy.Null: return value == null;
                        case OtherColumnTypeFilterBy.NotNull: return value != null;
                    }
                    var _dateKeyValue = Convert.ToDateTime(condition.KeyValue?.ToString());
                    if (value is DateTime _dateValue)
                    {
                        switch (condition.OtherFilterBy)
                        {
                            case OtherColumnTypeFilterBy.Equal: return _dateKeyValue == _dateValue;
                            case OtherColumnTypeFilterBy.NotEqual: return _dateKeyValue != _dateValue;
                            case OtherColumnTypeFilterBy.GreaterThan: return _dateValue > _dateKeyValue;
                            case OtherColumnTypeFilterBy.GreaterThanOrEqual: return _dateValue >= _dateKeyValue;
                            case OtherColumnTypeFilterBy.LessThan: return _dateValue < _dateKeyValue;
                            case OtherColumnTypeFilterBy.LessThanOrEqual: return _dateValue <= _dateKeyValue;
                        }
                    }
                    else
                    {
                        try
                        {
                            DateTime dateValue = Convert.ToDateTime(condition.KeyValue?.ToString());
                            switch (condition.OtherFilterBy)
                            {
                                case OtherColumnTypeFilterBy.Equal: return _dateKeyValue == dateValue;
                                case OtherColumnTypeFilterBy.NotEqual: return _dateKeyValue != dateValue;
                                case OtherColumnTypeFilterBy.GreaterThan: return dateValue > _dateKeyValue;
                                case OtherColumnTypeFilterBy.GreaterThanOrEqual: return dateValue >= _dateKeyValue;
                                case OtherColumnTypeFilterBy.LessThan: return dateValue < _dateKeyValue;
                                case OtherColumnTypeFilterBy.LessThanOrEqual: return dateValue <= _dateKeyValue;
                            }
                        }
                        catch
                        {
                            return false;
                        }
                    }
                    return false;
                case ColumnType.Boolean:
                    var _boolKeyValue = Convert.ToBoolean(condition.KeyValue?.ToString());
                    {
                        if (value is bool _boolValue)
                        {
                            return _boolKeyValue == _boolValue;
                        }
                        else
                        {
                            try
                            {
                                bool boolValue = Convert.ToBoolean(value?.ToString());
                                return _boolKeyValue == boolValue;
                            }
                            catch
                            {
                                return false;
                            }
                        }
                    }
                default:
                    return false;
            }
        }

    }
    public class ValueObj
    {
        public int Value { get; set; } 
    }

}
