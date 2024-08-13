using MagicPropsComponents.Utilities;

namespace MagicPropsComponents.ViewModels.SelectionGroup
{
    public enum DisplayModes
    {
        DefaultButton = 0,
        ToggoleButton = 1,
        SwitchButton = 2
    }

    public enum ToggoleButtonClasses
    {
        [EnumDescription("btn-outline-danger")]
        OutlineDanger,
        [EnumDescription("btn-outline-success")]
        OutlineSuccess,
        [EnumDescription("btn-outline-primary")]
        Primary,
        [EnumDescription("btn-outline-secondary")]
        Secondary,
        [EnumDescription("btn-outline-warning")]
        Warning,
        [EnumDescription("btn-outline-info")]
        Info,
        [EnumDescription("btn-outline-light")]
        Light,
        [EnumDescription("btn-outline-dark")]
        Dark

    }
}
