namespace MagicPropsComponents.Components.PivotTable.AggregateHandlers
{
    public class SumHandler : AggregateValueHandlerBase
    {
        public SumHandler()
        {
        }

        public override void Handle(object? value, object?[]? keyValues, Dictionary<object[], object[]> groupedData, int idx)
        {

            if (groupedData.ContainsKey(keyValues) && groupedData[keyValues].Length > idx)
            {
                var currentValue = (dynamic)groupedData[keyValues][idx];
                groupedData[keyValues][idx] = currentValue + (dynamic)value;
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
                }
                values.Add(value);
                groupedData[keyValues] = values.ToArray();
            }

        }

    }

}
