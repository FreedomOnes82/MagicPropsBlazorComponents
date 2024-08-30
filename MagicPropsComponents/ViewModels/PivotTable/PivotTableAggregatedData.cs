using System.Globalization;
using System.Text.Json;
using MagicPropsComponents.Utilities;
using MagicPropsComponents.ViewModels.Shared;


namespace MagicPropsComponents.ViewModels.PivotTable
{

    public class PivotTableAggregatedData
    {
        private bool _ignoreCase = false;
        public PivotTableAggregatedData(bool ignoreCase)
        {
            _ignoreCase = ignoreCase;
            GroupedData = new Dictionary<object[], object[]>(new ArrayEqualityComparer<object>(_ignoreCase));
        }

        public Dictionary<object[], object[]> GroupedData { get; set; }

    }

    public class AggregatedData
    {
        public object[] Keys { get; set; }

        public object[] Values { get; set; }
    }


    public class SerializableAggregatedData
    {
        public SerializableAggregatedData(PivotTableAggregatedData aggreatedData, PivotValueFieldSettings[] valueFields)
        {
            GroupedData = aggreatedData.GroupedData.Select(x => new AggregatedData() { Keys = x.Key, Values = FormatValues(x.Value, valueFields) }).ToList();
        }

        public object[] FormatValues(object[] value, PivotValueFieldSettings[] valueFields)
        {

            for (var i = 0; i < value.Length; i++)
            {
                if (valueFields[i] != null)
                {
                    var cultureInfo = new CultureInfo(valueFields[i].CultureString);
                    var formatString = valueFields[i].Format ?? string.Empty;
                    if (string.IsNullOrEmpty(formatString) || string.IsNullOrEmpty(value[i].ToString())) { value[i] = value[i]; continue; }
                    switch (valueFields[i].ColumnType)
                    {
                        case ColumnType.Number:
                            value[i] = Convert.ToDecimal(value[i]).ToString(formatString, cultureInfo); continue;
                        case ColumnType.Date:
                            value[i] = Convert.ToDateTime(value[i]).ToString(formatString, cultureInfo); continue;
                        default: value[i] = value[i]; continue;
                    }
                }
            }
            return value;
        }

        public List<AggregatedData> GroupedData { get; set; }

        public string ToJson()
        {
            return JsonSerializer.Serialize(this);
        }
    }
}
