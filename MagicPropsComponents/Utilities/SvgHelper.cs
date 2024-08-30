using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.Utilities
{
    public class SvgHelper
    {
        private string currentSvgFolder = string.Empty;
        public SvgHelper(Theme Theme = Theme.Default)
        {
            switch (Theme)
            {
                case Theme.Default:
                    currentSvgFolder = "default"; break;
                case Theme.Primary:
                    currentSvgFolder = "primary"; break;
                default: currentSvgFolder = "default"; break;
            }
        }
        public string GetSvgPath()
        {
            return "./_content/MagicPropsComponents/svgs/" + currentSvgFolder + "/";
        }
    }
    public enum Theme
    {
        Default,
        Primary
    }
}
