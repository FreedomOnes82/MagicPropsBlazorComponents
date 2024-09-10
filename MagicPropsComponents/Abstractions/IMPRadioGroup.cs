﻿using MagicPropsComponents.ViewModels.SelectionGroup;
using Microsoft.AspNetCore.Components;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.Abstractions
{
    public interface IMPRadioGroup
    {
        [Parameter]
        string Name { get; set; }

        [Parameter]
        string Value { get; set; }

        [Parameter]
        bool DisplayInline { get; set; }
        void SetValue(string value);

        public DisplayModes DisplayMode { get; set; }
        bool CheckIsValid();
    }
}
