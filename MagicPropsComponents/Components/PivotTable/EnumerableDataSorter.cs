using MagicPropsComponents.Utilities;

namespace MagicPropsComponents.Components.PivotTable
{
    public class EnumerableDataSorter
    {

        public EnumerableDataSorter()
        {
        }

        public IEnumerable<object> Sort(IEnumerable<object> source, Dictionary<string, string> sortParams, PropertyByLambda[] properties)
        {
            IOrderedEnumerable<object> orderedEnumerable = null;
            var sortProperties = properties.Where(x => sortParams.Keys.Contains(x.Name));
            foreach (var sortParam in sortParams)
            {
                string propertyName = sortParam.Key;
                string sortOrder = sortParam.Value.ToLower();
                var sortProperty = sortProperties.First(x => sortParam.Key == x.Name);
                Func<object, object> keySelector = obj => sortProperty.GetValue(obj);

                if (orderedEnumerable == null)
                {
                    orderedEnumerable = sortOrder == "asc" ?
                        source.OrderBy(keySelector) :
                        source.OrderByDescending(keySelector);
                }
                else
                {
                    orderedEnumerable = sortOrder == "asc" ?
                        orderedEnumerable.ThenBy(keySelector) :
                        orderedEnumerable.ThenByDescending(keySelector);
                }
            }

            return orderedEnumerable ?? source;
        }
    }
}
