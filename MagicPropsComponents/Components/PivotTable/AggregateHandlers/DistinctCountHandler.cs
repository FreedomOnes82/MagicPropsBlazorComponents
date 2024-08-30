using MagicPropsComponents.Utilities;

namespace MagicPropsComponents.Components.PivotTable.AggregateHandlers
{
    public class DistinctCountHandler : AggregateValueHandlerBase
    {
        Dictionary<object[], object[]> _rawValues;
        public DistinctCountHandler(bool ignoreCase)
        {
            _rawValues = new Dictionary<object[], object[]>(new ArrayEqualityComparer<object>(ignoreCase));
        }

        public override void Handle(object? value, object?[]? keyValues, Dictionary<object[], object[]> groupedData, int idx)
        {
            if (_rawValues.ContainsKey(keyValues))
            {
                if (!_rawValues[keyValues].Contains(value))
                {
                    var vls = _rawValues[keyValues].ToList();
                    vls.Add(value);
                    _rawValues[keyValues] = vls.ToArray();
                }
            }
            else
            {
                _rawValues.Add(keyValues, (new List<object>() { 1 }).ToArray());
            }

            if (groupedData.ContainsKey(keyValues) && groupedData[keyValues].Length > idx)
            {
                groupedData[keyValues][idx] = _rawValues[keyValues].Count();
            }
            else
            {
                List<object> values = null;
                if (groupedData.ContainsKey(keyValues))
                {
                    values = groupedData[keyValues].ToList();
                }
                else
                {
                    values = new List<object>();
                    groupedData[keyValues] = values.ToArray();
                }
                values.Add(1);
                groupedData[keyValues] = values.ToArray();
            }
        }

    }
}
