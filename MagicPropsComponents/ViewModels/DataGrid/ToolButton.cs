using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.ViewModels.DataGrid
{
    public class ToolButton
    {
        public string Text { get; set; } = string.Empty;
        public Func<Task>? ActionAsync { get; set; }
        public Func<bool>? DisabledFun { get; set; }
        public RenderFragment? IconTemplate { get; set; }
    }
}
