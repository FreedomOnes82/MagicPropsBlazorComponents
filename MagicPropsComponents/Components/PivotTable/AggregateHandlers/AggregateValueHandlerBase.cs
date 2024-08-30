using MagicPropsComponents.ViewModels.PivotTable;

namespace MagicPropsComponents.Components.PivotTable.AggregateHandlers
{
    public class AggregateValueHandlerBase
    {
        public AggregateValueHandlerBase() { }

        public virtual void Handle(object? value, object?[]? keyValues, Dictionary<object[], object[]> groupedData, int idx)
        {
        }


        public virtual void Handle(object? value, object?[]? columnKeyValues, object?[]? rowKeyValues, PivotTableAggregatedData aggregatedData, int idx, bool addRowGrantTotals = false, bool addColumnGrantTotals = false)
        {

            if (columnKeyValues.Length > 0)
            {

                List<object?> aggregatedColKeys = new List<object?>();
                for (var i = 0; i < columnKeyValues.Length; i++)
                {
                    aggregatedColKeys.Add(columnKeyValues[i]);

                    List<object?> aggregatedRowKeys = new List<object?>();
                    if (rowKeyValues.Length > 0)
                    {
                        for (var j = 0; j < rowKeyValues.Length; j++)
                        {
                            var aggregatedKeys = new List<object?>();
                            aggregatedKeys.AddRange(aggregatedColKeys);
                            aggregatedRowKeys.Add(rowKeyValues[j]);
                            aggregatedKeys.AddRange(aggregatedRowKeys);
                            Handle(value, aggregatedKeys.ToArray(), aggregatedData.GroupedData, idx);
                        }

                        if (addColumnGrantTotals)
                        {
                            var aggregatedKeys = new List<object?>();
                            aggregatedKeys.AddRange(aggregatedColKeys);
                            Handle(value, aggregatedKeys.ToArray(), aggregatedData.GroupedData, idx);
                        }
                    }
                    else
                    {
                        var aggregatedKeys = new List<object?>();
                        aggregatedKeys.AddRange(aggregatedColKeys);
                        Handle(value, aggregatedKeys.ToArray(), aggregatedData.GroupedData, idx);
                    }

                }
            }
            else
            {
                List<object?> aggregatedRowKeys = new List<object?>();
                if (rowKeyValues.Length > 0)
                {
                    for (var j = 0; j < rowKeyValues.Length; j++)
                    {
                        var aggregatedKeys = new List<object?>();
                        aggregatedRowKeys.Add(rowKeyValues[j]);
                        aggregatedKeys.AddRange(aggregatedRowKeys);
                        Handle(value, aggregatedKeys.ToArray(), aggregatedData.GroupedData, idx);
                    }
                }

            }

            if (columnKeyValues.Length > 0 && rowKeyValues.Length > 0)
            {
                //*******add grant total keys*********
                //***add grant total column keys ***
                var grantTotalKeys = new List<object?>();
                for (var i = 0; i < columnKeyValues.Length; i++)
                {
                    grantTotalKeys.Add(columnKeyValues[i]);
                    Handle(value, grantTotalKeys.ToArray(), aggregatedData.GroupedData, idx);
                }

                //*** add grant total row keys ***
                grantTotalKeys.Clear();
                for (var i = 0; i < rowKeyValues.Length; i++)
                {
                    grantTotalKeys.Add(rowKeyValues[i]);
                    Handle(value, grantTotalKeys.ToArray(), aggregatedData.GroupedData, idx);
                }
            }

            //Grant total with no keys...
            if (columnKeyValues.Length > 0 || rowKeyValues.Length > 0)
            {
                Handle(value, new string[] { }, aggregatedData.GroupedData, idx);
            }

        }
    }

}
