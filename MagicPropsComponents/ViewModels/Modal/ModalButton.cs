using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.ViewModels.Modal
{
    public class ModalButton
    {

        public string CssClass { get; set; }

        public string Text { get; set; }

        public bool DismissModal { get; set; } = false;
    }
}
