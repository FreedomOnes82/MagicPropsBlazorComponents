namespace MagicPropsComponents.Components.PivotTable.AggregateHandlers
{
    public class MinHandler : AggregateValueHandlerBase
    {

        public override void Handle(object? value, object?[]? keyValues, Dictionary<object[], object[]> groupedData, int idx)
        {
            if (groupedData.ContainsKey(keyValues) && groupedData[keyValues].Length > idx)
            {
                var currentValue = groupedData[keyValues][idx];
                if ((dynamic)value < (dynamic)currentValue)
                    groupedData[keyValues][idx] = value;
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
                values.Add(value);
                groupedData[keyValues] = values.ToArray();
            }
        }
    }
}
