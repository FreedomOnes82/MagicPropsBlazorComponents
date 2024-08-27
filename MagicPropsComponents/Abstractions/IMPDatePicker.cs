using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.Abstractions
{
    public interface IMPDatePicker
    {
        DateTime Value { get; set; }
        string GetMonthString(int month);
        DateTime Minimum { get; set; }
        DateTime Maximum { get; set; }
    }
}
