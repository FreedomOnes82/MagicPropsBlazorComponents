namespace MagicPropsComponents.Components.PivotTable.AggregateHandlers
{

    public class CountHandler : AggregateValueHandlerBase
    {

        public CountHandler()
        {
        }
        public override void Handle(object? value, object?[]? keyValues, Dictionary<object[], object[]> groupedData, int idx)
        {
            if (groupedData.ContainsKey(keyValues) && groupedData[keyValues].Length > idx)
            {
                groupedData[keyValues][idx] = (int)groupedData[keyValues][idx] + 1;
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
