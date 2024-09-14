using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MagicPropsComponents.ViewModels.RichEditor
{
    public enum DocumentButtons
    {
        Bold,
        Italic,
        Undo,
        Redo,
        justifyLeft,
        justifyRight,
        justifyCenter,
        indent,
        outdent,
        underline,
        strikeThrough,
        H1,
        H2,
        H3,
        insertOrderedList,
        insertUnorderedList,
        removeFormat,
        subscription,
        superscription,
        Createlink,
        Unlink,
        ForeColor,
        BackColor,
        InsertImage,
        ClearFormat,
        SetFontSize
    }

    public enum DocumentCommands
    {
        Bold,
        Italic,
        Undo,
        Redo,
        justifyLeft,
        justifyRight,
        justifyCenter,
        indent,
        outdent,
        underline,
        strikeThrough,
        fontSize,
        insertOrderedList,
        insertUnorderedList,
        removeFormat,
        subscription,
        superscription,
        Createlink,
        Unlink
    }

}
