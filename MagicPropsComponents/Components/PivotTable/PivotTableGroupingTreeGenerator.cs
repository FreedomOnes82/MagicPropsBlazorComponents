using System.Text.Json.Serialization;

namespace MagicPropsComponents.Components.PivotTable
{
    public class PivotTableGroupingTreeGenerator
    {
        private List<object[]> _keys;
        private readonly int _firstKeysLength;
        private int _lastKeysLength;
        public PivotTableGroupingTreeGenerator()
        {

        }

        private static string JoinArrayWithSkipesItems(object[] arr, int skipped = 0)
        {
            if (skipped > 0)
            {
                return string.Join(",", arr.ToList().Skip(skipped));
            }
            else
            {
                return string.Join(",", arr);
            }
        }

        public static void BuildTree(List<object[]> groupedKeys, GroupTreeNode parentNode, int nextArrIndex, int maxArrIndex, int skippedIndex = 0)
        {

            if (parentNode == null)
                parentNode = new GroupTreeNode(null);
            var parentKey = parentNode.ParentKeys;

            var childrenKeys = groupedKeys.Where(x => JoinArrayWithSkipesItems(x, skippedIndex).StartsWith(parentKey, StringComparison.OrdinalIgnoreCase)).Select(x => x[nextArrIndex]).Distinct().ToList();

            foreach (var childKey in childrenKeys)
            {
                var tn = new GroupTreeNode((childKey == null ? "" : childKey.ToString())) { IsExpand = true, Parent = parentNode, Level = parentNode.Level + 1 };
                parentNode.Children.Add(tn);
            }

            nextArrIndex++;
            if (nextArrIndex <= maxArrIndex)
            {
                foreach (var childNode in parentNode.Children)
                {
                    BuildTree(groupedKeys, childNode, nextArrIndex, maxArrIndex, skippedIndex);
                }
            }

        }

        public class GroupTreeNode
        {
            public string Name { get; set; }
            public int Level { get; set; } = 0;
            public string ParentKeys
            {
                get
                {
                    string parentKey = Name ?? "";
                    var parentNode = Parent;
                    while (parentNode != null && string.IsNullOrEmpty(parentNode.Name) == false)
                    {
                        parentKey = parentNode.Name + "," + parentKey;
                        parentNode = parentNode.Parent;
                    }
                    return parentKey;
                }
            }

            [JsonIgnore]
            internal GroupTreeNode? Parent { get; set; }
            public bool IsExpand { get; set; }
            public List<GroupTreeNode> Children { get; set; }

            public GroupTreeNode(string name)
            {
                Name = name;
                Children = new List<GroupTreeNode>();
            }

            private int? _openedLeafCount = default;
            public int ExpandedLeafCount
            {
                get
                {
                    if (_openedLeafCount == default)
                    {
                        int count = 0;
                        CalculateExpanedLeafCount(this, ref count);
                        _openedLeafCount = count;
                    }

                    return _openedLeafCount!.Value;
                }
            }

            private void CalculateExpanedLeafCount(GroupTreeNode parentNode, ref int count)
            {
                if (parentNode.IsExpand)
                {
                    if (parentNode.Children != null && parentNode.Children.Count > 0)
                    {
                        foreach (var child in parentNode.Children)
                        {
                            CalculateExpanedLeafCount(child, ref count);
                        }
                    }
                }

                if (parentNode.Children == null || parentNode.IsExpand == false || parentNode.Children.Count == 0)
                {
                    count += 1;
                }
            }
        }
    }
}