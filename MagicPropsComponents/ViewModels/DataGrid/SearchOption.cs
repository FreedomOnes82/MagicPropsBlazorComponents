using MagicPropsComponents.ViewModels.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.ViewModels.DataGrid
{
    public class SearchOption
    {
        public int PageSize { get; set; }
        public int PageIndex { get; set; }
        public string Keyword { get; set; } = string.Empty;
        public Dictionary<string, SortType>? SortFields { get; set; }
        public Dictionary<string, FilterOption>? FilterFields { get; set; }
    }
}
