using MagicPropsComponents.Components.PivotTable.AggregateHandlers;
using MagicPropsComponents.Utilities;
using MagicPropsComponents.ViewModels.PivotTable;
using MagicPropsComponents.ViewModels.Shared;

namespace MagicPropsComponents.Components.PivotTable
{
    public class DataGroupingHelper
    {


        public static PivotTableAggregatedData Aggregate(IEnumerable<object> data,
            List<PivotFieldSettings> columnFields,
            List<PivotFieldSettings> rowFields,
            Dictionary<string, AggregateFuncs> aggregateProps,
            bool addRowGrantTotals = false, bool addColumnGrantTotals = false, Dictionary<string, string> sortParams = null, Dictionary<string, FilterOption> filterParams = null, bool ignoreCase = true)
        {
            PivotTableAggregatedData result = new PivotTableAggregatedData(ignoreCase);

            var itemType = data.GetType().GenericTypeArguments[0];
            var props = PropertyByLambda.GetProperties(itemType);
            var sorter = new EnumerableDataSorter();
            if (sortParams != null && sortParams.Count() > 0)
            {
                data = sorter.Sort(data, sortParams, props);
            }

            if (filterParams != null && filterParams.Count() > 0)
            {
                var filter = new EnumerableDataFilter();
                data = filter.Filter(data, filterParams, props, ignoreCase);
            }

            var lambdaPropsForColumnFields = columnFields.Select(x => props.First(y => y.Name == x.Name));
            var lambdaPropsForRowFields = rowFields.Select(x => props.First(y => y.Name == x.Name));

            var aggregateProperties = aggregateProps.Select(prop => new KeyValuePair<PropertyByLambda, AggregateValueHandlerBase>(
                props.First(x => x.Name == prop.Key), GetAggregateValueHandler(prop.Value, ignoreCase))).ToDictionary();

            foreach (var item in data)
            {
                try
                {
                    List<string> keyValuesForCols = new List<string>();
                    var fetchIdx = 0;
                    foreach (var colPro in lambdaPropsForColumnFields)
                    {
                        keyValuesForCols.Add($"[c_{fetchIdx++}]:{colPro.GetValue(item)}");
                    }

                    fetchIdx = 0;
                    List<string> keyValuesForRows = new List<string>();
                    foreach (var rowPro in lambdaPropsForRowFields)
                    {
                        keyValuesForRows.Add($"[r_{fetchIdx++}]:{rowPro.GetValue(item)}");
                    }

                    var aggregatePropValues = aggregateProperties.Select(prop => new KeyValuePair<PropertyByLambda, object?>(prop.Key, prop.Key.GetValue(item))).ToArray();

                    for (int i = 0; i < aggregatePropValues.Length; i++)
                    {
                        var aggregateHandler = aggregateProperties[aggregatePropValues[i].Key];
                        aggregateHandler.Handle(aggregatePropValues[i].Value, keyValuesForCols.ToArray(), keyValuesForRows.ToArray(), result, i);
                    }
                }
                catch (Exception ex)
                {

                }
            }

            return result;
        }


        private static AggregateValueHandlerBase GetAggregateValueHandler(AggregateFuncs aggregateFuncs, bool ignoreCase)
        {
            switch (aggregateFuncs)
            {
                case AggregateFuncs.Sum:
                    return new SumHandler();
                case AggregateFuncs.DistinctCount:
                    return new DistinctCountHandler(ignoreCase);
                case AggregateFuncs.Max:
                    return new MaxHandler();
                default:
                    return new CountHandler();
            }
        }
    }
}

