using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MagicPropsComponents.ViewModels.Shared;


namespace MagicPropsComponents.Abstractions
{
    public interface IMPTimeline
    {
        bool Vertical { get; set; }
        int ItemCount { get; set; }
        Size Size { get; set; }
        string Color { get; set; }
        string ItemBgColor { get; set; }
    }
}
