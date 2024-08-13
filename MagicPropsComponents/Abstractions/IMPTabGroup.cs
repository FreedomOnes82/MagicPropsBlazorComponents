using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.Abstractions
{
    public interface IMPTabGroup
    {

        public string SelectedTabHeadText { get; set; }
        public EventCallback<string> SelectedTabHeadTextChanged { get; set; }
    }
}
