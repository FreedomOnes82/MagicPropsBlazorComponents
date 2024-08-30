using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.ViewModels.Shared
{
    public enum TitlePosition
    {
        Top,
        Left
    }
    public enum Size
    {
        Small,
        Medium,
        Large
    }

    public enum ColumnType
    {
        Default,
        Date,
        Number,
        Boolean
    }

    public enum SortType
    {
        None,
        Ascending,
        Descending,
    }

    public enum TextAlign
    {
        Left,
        Center,
        Right
    }
}
