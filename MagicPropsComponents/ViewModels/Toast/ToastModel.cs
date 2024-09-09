using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.ViewModels.Toast
{
    public class ToastModel
    {
        public string ID { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public ToastTheme Theme { get; set; } = ToastTheme.Primary;
    }
}
